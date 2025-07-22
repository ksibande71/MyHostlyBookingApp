import { type NextRequest, NextResponse } from "next/server"
import { getUserByEmail } from "@/lib/db/users"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    const user = await getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("Error logging in user:", error)
    return NextResponse.json({ error: "Failed to login" }, { status: 500 })
  }
}
