"use client"

import { useState, useEffect } from "react"
import { Map, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Property } from "@/lib/models/Property"

export function SearchResults() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [priceRange, setPriceRange] = useState([50, 500])
  const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([])
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [bookingSpeed, setBookingSpeed] = useState<string>("any")
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    fetchProperties()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [properties, priceRange, selectedBedrooms, selectedPropertyTypes, selectedAmenities, bookingSpeed])

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/properties")
      const data = await response.json()
      setProperties(data)
      setFilteredProperties(data)
    } catch (error) {
      console.error("Error fetching properties:", error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...properties]

    // Price filter
    filtered = filtered.filter((property) => property.price >= priceRange[0] && property.price <= priceRange[1])

    // Bedrooms filter
    if (selectedBedrooms.length > 0) {
      filtered = filtered.filter((property) => selectedBedrooms.includes(property.bedrooms.toString()))
    }

    // Property type filter
    if (selectedPropertyTypes.length > 0) {
      filtered = filtered.filter((property) => selectedPropertyTypes.includes(property.propertyType))
    }

    // Amenities filter
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter((property) =>
        selectedAmenities.every((amenity) => property.amenities.includes(amenity)),
      )
    }

    // Booking speed filter (simulated)
    if (bookingSpeed === "instant") {
      // Simulate instant booking by filtering properties with rating > 4.5
      filtered = filtered.filter((property) => property.rating > 4.5)
    } else if (bookingSpeed === "2days") {
      // Simulate 2-day booking by filtering properties with rating > 4.0
      filtered = filtered.filter((property) => property.rating > 4.0)
    }

    setFilteredProperties(filtered)
  }

  const handleBedroomChange = (bedroom: string, checked: boolean) => {
    if (checked) {
      setSelectedBedrooms([...selectedBedrooms, bedroom])
    } else {
      setSelectedBedrooms(selectedBedrooms.filter((b) => b !== bedroom))
    }
  }

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedPropertyTypes([...selectedPropertyTypes, type])
    } else {
      setSelectedPropertyTypes(selectedPropertyTypes.filter((t) => t !== type))
    }
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity])
    } else {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    }
  }

  const clearFilters = () => {
    setPriceRange([50, 500])
    setSelectedBedrooms([])
    setSelectedPropertyTypes([])
    setSelectedAmenities([])
    setBookingSpeed("any")
  }

  const openGoogleMaps = () => {
    // Open Google Maps with a general search for San Francisco
    const mapsUrl = "https://www.google.com/maps/search/vacation+rentals+san+francisco"
    window.open(mapsUrl, "_blank")
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-8 rounded mb-4"></div>
          <div className="bg-gray-300 h-96 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{filteredProperties.length}+ stays in San Francisco</h1>
        <p className="text-gray-600">Dec 15 - 20 · 2 guests</p>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Customize your search to find the perfect stay</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div>
                  <Label className="text-base font-semibold">Booking Speed</Label>
                  <div className="mt-4">
                    <Select value={bookingSpeed} onValueChange={setBookingSpeed}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any time</SelectItem>
                        <SelectItem value="instant">Instant Book</SelectItem>
                        <SelectItem value="2days">Within 2 days</SelectItem>
                        <SelectItem value="week">Within a week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold">Price range</Label>
                  <div className="mt-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1000}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}+</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold">Bedrooms</Label>
                  <div className="mt-4 space-y-3">
                    {["1", "2", "3", "4", "5+"].map((bedroom) => (
                      <div key={bedroom} className="flex items-center space-x-2">
                        <Checkbox
                          id={`bedroom-${bedroom}`}
                          checked={selectedBedrooms.includes(bedroom)}
                          onCheckedChange={(checked) => handleBedroomChange(bedroom, checked as boolean)}
                        />
                        <Label htmlFor={`bedroom-${bedroom}`}>
                          {bedroom} bedroom{bedroom !== "1" ? "s" : ""}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold">Property type</Label>
                  <div className="mt-4 space-y-3">
                    {["house", "apartment", "condo", "villa", "cabin"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedPropertyTypes.includes(type)}
                          onCheckedChange={(checked) => handlePropertyTypeChange(type, checked as boolean)}
                        />
                        <Label htmlFor={type} className="capitalize">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold">Amenities</Label>
                  <div className="mt-4 space-y-3">
                    {["WiFi", "Kitchen", "Pool", "Free parking", "Air conditioning"].map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                        />
                        <Label htmlFor={amenity}>{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
                  Clear all filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center space-x-2">
            {priceRange[0] !== 50 || priceRange[1] !== 500 ? (
              <Badge variant="secondary">
                Price: ${priceRange[0]} - ${priceRange[1]}
              </Badge>
            ) : null}
            {selectedBedrooms.length > 0 && <Badge variant="secondary">{selectedBedrooms.join(", ")} bedrooms</Badge>}
            {bookingSpeed !== "any" && (
              <Badge variant="secondary">
                {bookingSpeed === "instant"
                  ? "Instant Book"
                  : bookingSpeed === "2days"
                    ? "Within 2 days"
                    : "Within a week"}
              </Badge>
            )}
          </div>
        </div>

        <Button variant="outline" onClick={openGoogleMaps} className="flex items-center space-x-2 bg-transparent">
          <Map className="w-4 h-4" />
          <span>Show map</span>
        </Button>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={showMap ? "lg:col-span-1" : "lg:col-span-2"}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <div key={property._id?.toString()} className="group cursor-pointer border-0 shadow-none">
                <div className="relative">
                  <img
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="pt-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {property.location.city}, {property.location.state}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">★ {property.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Hosted by {property.host.name}</p>
                  <p className="text-gray-600 text-sm mb-2">
                    {property.guests} guests · {property.bedrooms} bedrooms
                  </p>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold">${property.price}</span>
                    <span className="text-gray-600 text-sm">night</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
