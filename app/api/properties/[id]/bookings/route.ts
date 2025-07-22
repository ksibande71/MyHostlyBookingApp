import { type NextRequest, NextResponse } from "next/server"
import { getBookingsByProperty } from "@/lib/db/bookings"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const bookings = await getBookingsByProperty(params.id)

    // Filter only confirmed bookings for availability
    const confirmedBookings = bookings.filter(
      (booking) => booking.status === "confirmed" || booking.status === "pending",
    )

    return NextResponse.json(confirmedBookings)
  } catch (error) {
    console.error("Error fetching property bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
