"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Property } from "@/lib/models/Property"

export function PropertyGrid() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/properties")
      const data = await response.json()
      setProperties(data)
    } catch (error) {
      console.error("Error fetching properties:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-300 h-64 rounded-xl mb-3"></div>
            <div className="bg-gray-300 h-4 rounded mb-2"></div>
            <div className="bg-gray-300 h-4 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map((property) => (
        <Card key={property._id?.toString()} className="group cursor-pointer border-0 shadow-none">
          <CardContent className="p-0">
            <div className="relative">
              <Link href={`/property/${property._id}`}>
                <Image
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-200"
                />
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white"
                onClick={() => toggleFavorite(property._id?.toString() || "")}
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.includes(property._id?.toString() || "") ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`}
                />
              </Button>
            </div>

            <div className="pt-3">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 truncate">
                  {property.location.city}, {property.location.state}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-black" />
                  <span className="text-sm font-medium">{property.rating}</span>
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
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
