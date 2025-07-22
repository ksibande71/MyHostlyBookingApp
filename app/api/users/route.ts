import { type NextRequest, NextResponse } from "next/server"
import { createUser, getUserByEmail } from "@/lib/db/users"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Check if user already exists
    const existingUser = await getUserByEmail(body.email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const user = {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      avatar: body.avatar,
      isHost: false,
    }

    const result = await createUser(user)

    return NextResponse.json({
      success: true,
      userId: result.insertedId,
      user: { ...user, _id: result.insertedId },
    })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
