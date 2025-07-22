import { type NextRequest, NextResponse } from "next/server"
import { getBookingsByUser } from "@/lib/db/bookings"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const bookings = await getBookingsByUser(params.userId)
    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching user bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
