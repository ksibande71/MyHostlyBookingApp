import { type NextRequest, NextResponse } from "next/server"
import { createProperty, getPropertiesByHost } from "@/lib/db/properties"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const hostId = searchParams.get("hostId")

    if (!hostId) {
      return NextResponse.json({ error: "Host ID required" }, { status: 400 })
    }

    const properties = await getPropertiesByHost(hostId)
    return NextResponse.json(properties)
  } catch (error) {
    console.error("Error fetching host properties:", error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const property = {
      title: body.title,
      description: body.description,
      location: {
        address: body.address,
        city: body.city,
        state: body.state,
        country: body.country || "United States",
      },
      price: Number.parseFloat(body.price),
      images: body.images || ["/placeholder.svg?height=600&width=800"],
      amenities: body.amenities || [],
      propertyType: body.propertyType,
      guests: body.guests,
      bedrooms: body.bedrooms,
      bathrooms: body.bathrooms,
      host: {
        id: body.hostId || "current-host",
        name: body.hostName || "Host",
        isSuperhost: false,
        joinedYear: new Date().getFullYear(),
      },
      rating: 0,
      reviewCount: 0,
      availability: [],
      status: "active" as const,
    }

    const result = await createProperty(property)

    return NextResponse.json({
      success: true,
      propertyId: result.insertedId,
    })
  } catch (error) {
    console.error("Error creating property:", error)
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 })
  }
}
