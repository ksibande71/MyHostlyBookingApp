"use client"

import { Star, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    id: 1,
    title: "Sunset Sailing Adventure",
    host: "Captain Sarah",
    duration: "3 hours",
    groupSize: "Up to 8 people",
    price: 89,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=400&text=Sailing",
    category: "Water Sports",
  },
  {
    id: 2,
    title: "Wine Tasting in Napa Valley",
    host: "Sommelier Mike",
    duration: "4 hours",
    groupSize: "Up to 12 people",
    price: 125,
    rating: 4.8,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=400&text=Wine+Tasting",
    category: "Food & Drink",
  },
  {
    id: 3,
    title: "Photography Walk in SF",
    host: "Artist Emma",
    duration: "2 hours",
    groupSize: "Up to 6 people",
    price: 65,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=400&text=Photography",
    category: "Arts & Culture",
  },
]

export function ExperiencesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Hostly Experiences</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover unique activities led by local hosts. From cooking classes to outdoor adventures, find experiences
          that let you explore like a local.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {["All", "Food & Drink", "Arts & Culture", "Sports", "Nature", "Wellness"].map((category) => (
          <Button
            key={category}
            variant={category === "All" ? "default" : "outline"}
            className={category === "All" ? "bg-teal-600 text-white hover:bg-teal-700" : "bg-transparent"}
            onClick={() => alert(`Filtering by ${category}...`)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((experience) => (
          <Card key={experience.id} className="group cursor-pointer border-0 shadow-none">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={experience.image || "/placeholder.svg"}
                  alt={experience.title}
                  className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-200"
                />
                <Badge className="absolute top-3 left-3 bg-white text-black">{experience.category}</Badge>
              </div>

              <div className="pt-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{experience.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-black" />
                    <span className="text-sm font-medium">{experience.rating}</span>
                    <span className="text-sm text-gray-600">({experience.reviews})</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-2">Hosted by {experience.host}</p>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{experience.groupSize}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold">${experience.price}</span>
                    <span className="text-gray-600 text-sm">per person</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-teal-600 hover:bg-teal-700"
                    onClick={() => alert(`Booking ${experience.title}...`)}
                  >
                    Book now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" size="lg" onClick={() => alert("Loading more experiences...")}>
          Show more experiences
        </Button>
      </div>
    </div>
  )
}
