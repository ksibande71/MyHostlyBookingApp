import { type NextRequest, NextResponse } from "next/server"
import { getProperties } from "@/lib/db/properties"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      location: searchParams.get("location") || undefined,
      checkIn: searchParams.get("checkin") ? new Date(searchParams.get("checkin")!) : undefined,
      checkOut: searchParams.get("checkout") ? new Date(searchParams.get("checkout")!) : undefined,
      guests: searchParams.get("guests") ? Number.parseInt(searchParams.get("guests")!) : undefined,
      minPrice: searchParams.get("minPrice") ? Number.parseInt(searchParams.get("minPrice")!) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")!) : undefined,
      propertyType: searchParams.get("propertyType") || undefined,
      amenities: searchParams.get("amenities")?.split(",") || undefined,
    }

    const properties = await getProperties(filters)

    return NextResponse.json(properties)
  } catch (error) {
    console.error("Error fetching properties:", error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}
