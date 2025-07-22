"use client"

import { useState } from "react"
import { Calendar, MapPin, Star, MessageCircle, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const upcomingTrips = [
  {
    id: 1,
    title: "Stunning Beachfront Villa",
    location: "Malibu, California",
    dates: "Dec 15 - 20, 2024",
    guests: 2,
    image: "/placeholder.svg?height=200&width=300",
    host: "Michael",
    status: "confirmed",
  },
]

const pastTrips = [
  {
    id: 2,
    title: "Cozy Mountain Cabin",
    location: "Aspen, Colorado",
    dates: "Oct 10 - 15, 2024",
    guests: 4,
    image: "/placeholder.svg?height=200&width=300",
    host: "Sarah",
    status: "completed",
    canReview: true,
  },
  {
    id: 3,
    title: "Downtown Loft",
    location: "New York, NY",
    dates: "Sep 5 - 8, 2024",
    guests: 2,
    image: "/placeholder.svg?height=200&width=300",
    host: "Emma",
    status: "completed",
    canReview: false,
  },
]

export function TripsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your trips</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="upcoming">Upcoming ({upcomingTrips.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastTrips.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingTrips.length > 0 ? (
            <div className="grid gap-6">
              {upcomingTrips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <img
                        src={trip.image || "/placeholder.svg"}
                        alt={trip.title}
                        className="w-full md:w-64 h-48 object-cover"
                      />
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{trip.title}</h3>
                            <div className="flex items-center space-x-1 text-gray-600 mb-2">
                              <MapPin className="w-4 h-4" />
                              <span>{trip.location}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-600 mb-2">
                              <Calendar className="w-4 h-4" />
                              <span>{trip.dates}</span>
                            </div>
                            <p className="text-gray-600">{trip.guests} guests</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {trip.status}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => alert("Viewing booking details...")}>
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => alert("Downloading receipt...")}>
                                  Download receipt
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => alert("Opening cancellation...")}>
                                  Cancel booking
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <Button variant="outline" size="sm" onClick={() => alert(`Messaging ${trip.host}...`)}>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message {trip.host}
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => alert("Viewing property...")}>
                            View property
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => alert("Getting directions...")}>
                            Get directions
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No upcoming trips</h3>
              <p className="text-gray-600 mb-6">Time to dust off your bags and start planning your next adventure!</p>
              <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => (window.location.href = "/")}>
                Start searching
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastTrips.length > 0 ? (
            <div className="grid gap-6">
              {pastTrips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <img
                        src={trip.image || "/placeholder.svg"}
                        alt={trip.title}
                        className="w-full md:w-64 h-48 object-cover"
                      />
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{trip.title}</h3>
                            <div className="flex items-center space-x-1 text-gray-600 mb-2">
                              <MapPin className="w-4 h-4" />
                              <span>{trip.location}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-600 mb-2">
                              <Calendar className="w-4 h-4" />
                              <span>{trip.dates}</span>
                            </div>
                            <p className="text-gray-600">{trip.guests} guests</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                              {trip.status}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => alert("Viewing booking details...")}>
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => alert("Downloading receipt...")}>
                                  Download receipt
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => alert("Booking again...")}>
                                  Book again
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          {trip.canReview && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => alert(`Writing review for ${trip.title}...`)}
                            >
                              <Star className="w-4 h-4 mr-2" />
                              Write review
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => alert("Viewing property...")}>
                            View property
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => alert("Booking again...")}>
                            Book again
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No past trips</h3>
              <p className="text-gray-600 mb-6">Your completed trips will appear here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
