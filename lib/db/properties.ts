import clientPromise from "../mongodb"
import type { Property } from "../models/Property"
import { ObjectId } from "mongodb"

export async function getProperties(filters?: {
  location?: string
  checkIn?: Date
  checkOut?: Date
  guests?: number
  minPrice?: number
  maxPrice?: number
  propertyType?: string
  amenities?: string[]
}) {
  const client = await clientPromise
  const db = client.db("hostly")

  const query: any = { status: "active" }

  if (filters) {
    if (filters.location) {
      query.$or = [
        { "location.city": { $regex: filters.location, $options: "i" } },
        { "location.state": { $regex: filters.location, $options: "i" } },
        { "location.country": { $regex: filters.location, $options: "i" } },
      ]
    }

    if (filters.guests) {
      query.guests = { $gte: filters.guests }
    }

    if (filters.minPrice || filters.maxPrice) {
      query.price = {}
      if (filters.minPrice) query.price.$gte = filters.minPrice
      if (filters.maxPrice) query.price.$lte = filters.maxPrice
    }

    if (filters.propertyType) {
      query.propertyType = filters.propertyType
    }

    if (filters.amenities && filters.amenities.length > 0) {
      query.amenities = { $in: filters.amenities }
    }
  }

  const properties = await db.collection<Property>("properties").find(query).sort({ createdAt: -1 }).toArray()

  return properties
}

export async function getPropertyById(id: string) {
  const client = await clientPromise
  const db = client.db("hostly")

  const property = await db.collection<Property>("properties").findOne({ _id: new ObjectId(id) })

  return property
}

export async function createProperty(property: Omit<Property, "_id" | "createdAt" | "updatedAt">) {
  const client = await clientPromise
  const db = client.db("hostly")

  const newProperty = {
    ...property,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await db.collection<Property>("properties").insertOne(newProperty)
  return result
}

export async function updateProperty(id: string, updates: Partial<Property>) {
  const client = await clientPromise
  const db = client.db("hostly")

  const result = await db.collection<Property>("properties").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    },
  )

  return result
}

export async function getPropertiesByHost(hostId: string) {
  const client = await clientPromise
  const db = client.db("hostly")

  const properties = await db
    .collection<Property>("properties")
    .find({ "host.id": hostId })
    .sort({ createdAt: -1 })
    .toArray()

  return properties
}
