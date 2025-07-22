"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Star, Heart, Share, Wifi, Car, Tv, Wind, ChefHat, Waves, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/hooks/use-toast"
import type { Property } from "@/lib/models/Property"
import { EnhancedCalendar } from "./enhanced-calendar"

const amenityIcons: { [key: string]: any } = {
  WiFi: Wifi,
  "Free parking": Car,
  TV: Tv,
  "Air conditioning": Wind,
  Kitchen: ChefHat,
  Pool: Waves,
  Fireplace: ChefHat,
  Heating: Wind,
  "Hot tub": Waves,
  Gym: Wind,
  Elevator: Wind,
  "Outdoor seating": Wind,
  "Private dock": Waves,
  Kayaks: Waves,
}

export function PropertyDetails({ propertyId }: { propertyId: string }) {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState(2)
  const [isSaved, setIsSaved] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchProperty()
  }, [propertyId])

  const fetchProperty = async () => {
    try {
      const response = await fetch(`/api/properties/${propertyId}`)
      if (response.ok) {
        const data = await response.json()
        setProperty(data)
      } else {
        toast({
          title: "Property not found",
          description: "The property you're looking for doesn't exist.",
          variant: "destructive",
        })
        router.push("/")
      }
    } catch (error) {
      console.error("Error fetching property:", error)
      toast({
        title: "Error",
        description: "Failed to load property details.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    if (property) {
      if (navigator.share) {
        try {
          await navigator.share({
            title: property.title,
            text: `Check out this amazing property: ${property.title}`,
            url: window.location.href,
          })
        } catch (error) {
          console.log("Error sharing:", error)
        }
      } else {
        navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link copied!",
          description: "Property link has been copied to clipboard.",
        })
      }
    }
  }

  const handleLocationClick = () => {
    if (property) {
      const address = `${property.location.address}, ${property.location.city}, ${property.location.state}, ${property.location.country}`
      const encodedAddress = encodeURIComponent(address)
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
      window.open(googleMapsUrl, "_blank")
    }
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast({
      title: isSaved ? "Removed from saved" : "Saved!",
      description: isSaved ? "Property removed from your saved list." : "Property added to your saved list.",
    })
  }

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      toast({
        title: "Please select dates",
        description: "You need to select check-in and check-out dates to make a reservation.",
        variant: "destructive",
      })
      return
    }

    const params = new URLSearchParams({
      propertyId: propertyId,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guests: guests.toString(),
    })

    router.push(`/booking?${params.toString()}`)
  }

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-8 rounded mb-4"></div>
          <div className="bg-gray-300 h-96 rounded-xl mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gray-300 h-32 rounded"></div>
              <div className="bg-gray-300 h-24 rounded"></div>
            </div>
            <div className="bg-gray-300 h-96 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Property not found</h1>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    )
  }

  const nights = calculateNights()
  const subtotal = nights * property.price
  const cleaningFee = 75
  const serviceFee = 150
  const total = subtotal + cleaningFee + serviceFee

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{property.title}</h1>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-black" />
              <span className="font-medium">{property.rating}</span>
              <span className="text-gray-600">({property.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <button className="underline hover:no-underline" onClick={handleLocationClick}>
                {property.location.city}, {property.location.state}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center space-x-2" onClick={handleShare}>
              <Share className="w-4 h-4" />
              <span>Share</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2" onClick={handleSave}>
              <Heart className={`w-4 h-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
              <span>Save</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden">
        <div className="md:col-span-2 md:row-span-2">
          <Image
            src={property.images[0] || "/placeholder.svg"}
            alt="Main property image"
            width={800}
            height={600}
            className="w-full h-full object-cover cursor-pointer hover:brightness-90 transition-all"
            onClick={() => alert("Photo gallery coming soon!")}
          />
        </div>
        {property.images.slice(1).map((image, index) => (
          <div key={index}>
            <Image
              src={image || "/placeholder.svg"}
              alt={`Property image ${index + 2}`}
              width={400}
              height={300}
              className="w-full h-full object-cover cursor-pointer hover:brightness-90 transition-all"
              onClick={() => alert("Photo gallery coming soon!")}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Property Info */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">
                  Entire {property.propertyType} hosted by {property.host.name}
                </h2>
                <p className="text-gray-600">
                  {property.guests} guests · {property.bedrooms} bedrooms · {property.bathrooms} bathrooms
                </p>
              </div>
              <button onClick={() => router.push(`/host/${property.host.name.toLowerCase()}`)}>
                <Avatar className="w-12 h-12 hover:opacity-80 transition-opacity">
                  <AvatarImage src={property.host.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{property.host.name[0]}</AvatarFallback>
                </Avatar>
              </button>
            </div>
            <Separator />
          </div>

          {/* Host Info */}
          <div className="space-y-4">
            {property.host.isSuperhost && (
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold">{property.host.name} is a Superhost</h3>
                  <p className="text-gray-600 text-sm">Superhosts are experienced, highly rated hosts.</p>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">Great location</h3>
                <p className="text-gray-600 text-sm">Recent guests loved the location of this property.</p>
              </div>
            </div>
            <Separator />
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-700 leading-relaxed">
              {showFullDescription
                ? `${property.description} This property offers an exceptional experience with carefully curated amenities and thoughtful design. The space is perfect for both relaxation and entertainment, featuring modern conveniences while maintaining its unique character. Guests consistently praise the attention to detail and the host's commitment to providing an outstanding stay.`
                : property.description}
            </p>
            <Button
              variant="link"
              className="p-0 h-auto text-black underline"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Show less" : "Show more"}
            </Button>
            <Separator className="mt-6" />
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(showAllAmenities
                ? [...property.amenities, "High-speed internet", "Hair dryer", "Iron", "Essentials"]
                : property.amenities
              ).map((amenity, index) => {
                const Icon = amenityIcons[amenity] || Wifi // Use Wifi as default
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span>{amenity}</span>
                  </div>
                )
              })}
            </div>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => setShowAllAmenities(!showAllAmenities)}
            >
              {showAllAmenities ? "Show fewer amenities" : "Show all amenities"}
            </Button>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl font-bold">${property.price}</span>
                <span className="text-gray-600 font-normal">night</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="border rounded-lg p-3">
                  <label className="text-xs font-semibold uppercase">Check-in</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                        {checkIn ? checkIn.toLocaleDateString() : "Add date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <EnhancedCalendar
                        propertyId={propertyId}
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="border rounded-lg p-3">
                  <label className="text-xs font-semibold uppercase">Check-out</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                        {checkOut ? checkOut.toLocaleDateString() : "Add date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <EnhancedCalendar
                        propertyId={propertyId}
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(date) => (checkIn ? date <= checkIn : false)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <label className="text-xs font-semibold uppercase">Guests</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                      {guests} guest{guests !== 1 ? "s" : ""}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Adults</div>
                        <div className="text-sm text-gray-500">Ages 13 or above</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setGuests(Math.max(1, guests - 1))}>
                          -
                        </Button>
                        <span className="w-8 text-center">{guests}</span>
                        <Button variant="outline" size="sm" onClick={() => setGuests(guests + 1)}>
                          +
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white" onClick={handleReserve}>
                Reserve
              </Button>

              <p className="text-center text-sm text-gray-600">You won't be charged yet</p>

              {nights > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>
                      ${property.price} x {nights} nights
                    </span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>${cleaningFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>${serviceFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
