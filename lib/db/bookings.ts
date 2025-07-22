import clientPromise from "../mongodb"
import type { Booking } from "../models/Property"
import { ObjectId } from "mongodb"

export async function createBooking(booking: Omit<Booking, "_id" | "createdAt" | "updatedAt">) {
  const client = await clientPromise
  const db = client.db("hostly")

  const newBooking = {
    ...booking,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await db.collection<Booking>("bookings").insertOne(newBooking)
  return result
}

export async function getBookingsByUser(userId: string) {
  const client = await clientPromise
  const db = client.db("hostly")

  const bookings = await db
    .collection("bookings")
    .aggregate([
      { $match: { userId } },
      {
        $lookup: {
          from: "properties",
          localField: "propertyId",
          foreignField: "_id",
          as: "property",
        },
      },
      { $unwind: "$property" },
      { $sort: { createdAt: -1 } },
    ])
    .toArray()

  return bookings
}

export async function getBookingsByProperty(propertyId: string) {
  const client = await clientPromise
  const db = client.db("hostly")

  const bookings = await db
    .collection<Booking>("bookings")
    .find({ propertyId: new ObjectId(propertyId) })
    .sort({ checkIn: 1 })
    .toArray()

  return bookings
}

export async function updateBookingStatus(bookingId: string, status: Booking["status"]) {
  const client = await clientPromise
  const db = client.db("hostly")

  const result = await db.collection<Booking>("bookings").updateOne(
    { _id: new ObjectId(bookingId) },
    {
      $set: {
        status,
        updatedAt: new Date(),
      },
    },
  )

  return result
}
