"use client"

import { useState } from "react"
import { Home, Mountain, Waves, TreePine, Building, Tent, Castle, Palmtree, Snowflake, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const categories = [
  { id: "all", name: "All", icon: Home },
  { id: "beachfront", name: "Beachfront", icon: Waves },
  { id: "cabins", name: "Cabins", icon: TreePine },
  { id: "trending", name: "Trending", icon: Mountain },
  { id: "city", name: "City", icon: Building },
  { id: "camping", name: "Camping", icon: Tent },
  { id: "castles", name: "Castles", icon: Castle },
  { id: "tropical", name: "Tropical", icon: Palmtree },
  { id: "skiing", name: "Skiing", icon: Snowflake },
  { id: "road-trips", name: "Road trips", icon: Car },
]

export function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <div className="border-b pb-4 mb-8">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                className={`flex flex-col items-center space-y-1 h-auto py-3 px-4 min-w-[80px] ${
                  selectedCategory === category.id ? "bg-black text-white hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{category.name}</span>
              </Button>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
