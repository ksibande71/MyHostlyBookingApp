import clientPromise from "../mongodb"
import type { User } from "../models/Property"
import { ObjectId } from "mongodb"

export async function createUser(user: Omit<User, "_id" | "createdAt" | "updatedAt">) {
  const client = await clientPromise
  const db = client.db("hostly")

  const newUser = {
    ...user,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await db.collection<User>("users").insertOne(newUser)
  return result
}

export async function getUserByEmail(email: string) {
  const client = await clientPromise
  const db = client.db("hostly")

  const user = await db.collection<User>("users").findOne({ email })
  return user
}

export async function getUserById(id: string) {
  const client = await clientPromise
  const db = client.db("hostly")

  const user = await db.collection<User>("users").findOne({ _id: new ObjectId(id) })
  return user
}

export async function updateUser(id: string, updates: Partial<User>) {
  const client = await clientPromise
  const db = client.db("hostly")

  const result = await db.collection<User>("users").updateOne(
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
