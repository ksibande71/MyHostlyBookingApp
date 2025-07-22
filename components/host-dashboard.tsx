"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Calendar, DollarSign, Users, Star, Edit, Eye, Settings, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"

const stats = [
  {
    title: "Total Earnings",
    value: "$12,450",
    change: "+12%",
    icon: DollarSign,
    description: "This month",
  },
  {
    title: "Bookings",
    value: "47",
    change: "+8%",
    icon: Calendar,
    description: "This month",
  },
  {
    title: "Guests",
    value: "156",
    change: "+15%",
    icon: Users,
    description: "Total guests",
  },
  {
    title: "Rating",
    value: "4.9",
    change: "+0.1",
    icon: Star,
    description: "Average rating",
  },
]

const mockListings = [
  {
    _id: "674a1234567890abcdef1234",
    title: "Cozy Mountain Cabin",
    location: { city: "Aspen", state: "Colorado" },
    status: "active",
    bookings: 12,
    earnings: "$3,200",
    rating: 4.9,
    images: ["/placeholder.svg?height=200&width=300&text=Mountain+Cabin"],
    price: 250,
  },
  {
    _id: "674a1234567890abcdef1235",
    title: "Downtown Loft",
    location: { city: "New York", state: "NY" },
    status: "active",
    bookings: 18,
    earnings: "$5,400",
    rating: 4.7,
    images: ["/placeholder.svg?height=200&width=300&text=Downtown+Loft"],
    price: 180,
  },
  {
    _id: "674a1234567890abcdef1236",
    title: "Beach House",
    location: { city: "Miami", state: "FL" },
    status: "inactive",
    bookings: 8,
    earnings: "$2,100",
    rating: 4.8,
    images: ["/placeholder.svg?height=200&width=300&text=Beach+House"],
    price: 320,
  },
]

const mockBookings = [
  {
    id: "1",
    propertyTitle: "Cozy Mountain Cabin",
    guestName: "John Smith",
    checkIn: "2024-12-15",
    checkOut: "2024-12-20",
    guests: 2,
    status: "confirmed",
    total: "$1,250",
  },
  {
    id: "2",
    propertyTitle: "Downtown Loft",
    guestName: "Sarah Johnson",
    checkIn: "2024-12-22",
    checkOut: "2024-12-25",
    guests: 4,
    status: "pending",
    total: "$540",
  },
]

export function HostDashboard() {
  const router = useRouter()
  const [listings, setListings] = useState(mockListings)
  const [activeTab, setActiveTab] = useState("listings")

  const handleAddListing = () => {
    router.push("/host/create-listing")
  }

  const handleEditListing = (listingId: string) => {
    router.push(`/host/edit-listing/${listingId}`)
  }

  const handleViewListing = (listingId: string) => {
    router.push(`/property/${listingId}`)
  }

  const handleCalendar = (listingId: string) => {
    router.push(`/host/calendar/${listingId}`)
  }

  const handleSettings = (listingId: string) => {
    router.push(`/host/settings/${listingId}`)
  }

  const handleToggleStatus = (listingId: string) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing._id === listingId
          ? { ...listing, status: listing.status === "active" ? "inactive" : "active" }
          : listing,
      ),
    )
    toast({
      title: "Status updated",
      description: "Listing status has been changed successfully.",
    })
  }

  const handleViewBooking = (bookingId: string) => {
    router.push(`/host/bookings/${bookingId}`)
  }

  const handleViewEarnings = () => {
    router.push("/host/earnings")
  }

  const handleViewAnalytics = () => {
    router.push("/host/analytics")
  }

  const handleManageCalendar = () => {
    router.push("/host/calendar")
  }

  const handleViewMessages = () => {
    router.push("/host/messages")
  }

  const handleAccountSettings = () => {
    router.push("/host/account")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Host Dashboard</h1>
          <p className="text-gray-600">Manage your listings and bookings</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleAccountSettings}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleAddListing}>
            <Plus className="w-4 h-4 mr-2" />
            Add Listing
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => {
                if (stat.title === "Total Earnings") handleViewEarnings()
                else if (stat.title === "Bookings") setActiveTab("bookings")
                else if (stat.title === "Guests") handleViewAnalytics()
                else if (stat.title === "Rating") handleViewAnalytics()
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="listings">My Listings ({listings.length})</TabsTrigger>
          <TabsTrigger value="bookings">Bookings ({mockBookings.length})</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your listings</h2>
            <Button onClick={handleAddListing} className="bg-teal-600 hover:bg-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              Add new listing
            </Button>
          </div>

          <div className="grid gap-6">
            {listings.map((listing) => (
              <Card key={listing._id}>
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <img
                      src={listing.images[0] || "/placeholder.svg"}
                      alt={listing.title}
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{listing.title}</h3>
                          <p className="text-gray-600">
                            {listing.location.city}, {listing.location.state}
                          </p>
                          <p className="text-sm text-gray-500">${listing.price} per night</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={listing.status === "active" ? "default" : "secondary"}>
                            {listing.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleViewListing(listing._id)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View listing
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditListing(listing._id)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit listing
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCalendar(listing._id)}>
                                <Calendar className="w-4 h-4 mr-2" />
                                Manage calendar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSettings(listing._id)}>
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleStatus(listing._id)}>
                                {listing.status === "active" ? "Deactivate" : "Activate"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="text-center">
                          <div className="text-xl font-bold">{listing.bookings}</div>
                          <div className="text-sm text-gray-600">Bookings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold">{listing.earnings}</div>
                          <div className="text-sm text-gray-600">Earnings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold flex items-center justify-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            {listing.rating}
                          </div>
                          <div className="text-sm text-gray-600">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookings">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Bookings</h2>
              <Button variant="outline" onClick={() => router.push("/host/bookings")}>
                View all bookings
              </Button>
            </div>

            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleViewBooking(booking.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{booking.propertyTitle}</h3>
                        <p className="text-gray-600">Guest: {booking.guestName}</p>
                        <p className="text-sm text-gray-500">
                          {booking.checkIn} - {booking.checkOut} • {booking.guests} guests
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                          {booking.status}
                        </Badge>
                        <p className="font-semibold mt-2">{booking.total}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Availability Calendar</CardTitle>
              <CardDescription>Manage your listing availability and pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Calendar Management</h3>
                <p className="text-gray-600 mb-6">Set your availability and manage bookings across all properties</p>
                <div className="space-y-3">
                  <Button onClick={handleManageCalendar} className="bg-teal-600 hover:bg-teal-700">
                    Open Calendar Manager
                  </Button>
                  <Button variant="outline" onClick={() => router.push("/host/pricing")}>
                    Manage Pricing
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>Track your income and payouts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Earnings Dashboard</h3>
                <p className="text-gray-600 mb-6">View detailed earnings reports and payout history</p>
                <div className="space-y-3">
                  <Button onClick={handleViewEarnings} className="bg-teal-600 hover:bg-teal-700">
                    View Detailed Report
                  </Button>
                  <Button variant="outline" onClick={() => router.push("/host/payouts")}>
                    Payout Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Guest Messages</CardTitle>
              <CardDescription>Communicate with your guests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Message Center</h3>
                <p className="text-gray-600 mb-6">
                  Stay connected with your guests before, during, and after their stay
                </p>
                <div className="space-y-3">
                  <Button onClick={handleViewMessages} className="bg-teal-600 hover:bg-teal-700">
                    Open Messages
                  </Button>
                  <Button variant="outline" onClick={() => router.push("/host/templates")}>
                    Message Templates
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
