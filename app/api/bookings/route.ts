import { type NextRequest, NextResponse } from "next/server"
import { createBooking } from "@/lib/db/bookings"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const booking = {
      propertyId: new ObjectId(body.propertyId),
      userId: body.userId || "guest-user", // In a real app, get from auth
      guestInfo: {
        firstName: body.guestInfo.firstName,
        lastName: body.guestInfo.lastName,
        email: body.guestInfo.email,
        phone: body.guestInfo.phone,
      },
      checkIn: new Date(body.checkIn),
      checkOut: new Date(body.checkOut),
      guests: body.guests,
      totalPrice: body.totalPrice,
      status: "confirmed" as const,
      paymentInfo: {
        cardLast4: body.paymentInfo.cardNumber.slice(-4),
        paymentIntentId: `pi_${Date.now()}`,
      },
    }

    const result = await createBooking(booking)

    return NextResponse.json({
      success: true,
      bookingId: result.insertedId,
      confirmationNumber: `AB${result.insertedId.toString().slice(-8).toUpperCase()}`,
    })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
