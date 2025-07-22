"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, Calendar, MapPin, Users, Download, MessageCircle, Star, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

export function BookingConfirmation() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")

  const handleDownloadConfirmation = () => {
    const bookingDetails = `
HOSTLY BOOKING CONFIRMATION

Booking Reference: #HT123456789
Property: Stunning Beachfront Villa
Location: Malibu, California
Dates: Dec 15 - 20, 2024 (5 nights)
Guests: 2
Total Paid: $2,675

Thank you for booking with Hostly!
    `

    const blob = new Blob([bookingDetails], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `hostly-confirmation-HT123456789.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Confirmation downloaded",
      description: "Your booking confirmation has been downloaded.",
    })
  }

  const handleMessageHost = () => {
    router.push("/messages/host-michael")
  }

  const handleViewTrips = () => {
    router.push("/trips")
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  const handleViewProperty = () => {
    router.push("/property/674a1234567890abcdef1234")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button variant="outline" onClick={handleDownloadConfirmation}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking confirmed!</h1>
          <p className="text-gray-600">Your reservation has been successfully created</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Card */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=128&width=128&text=Villa"
                      alt="Property"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">Stunning Beachfront Villa</h3>
                        <p className="text-gray-600">Entire villa • Malibu, California</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Confirmed
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">4.9</span>
                      <span className="text-sm text-gray-600">(127 reviews)</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleViewProperty}>
                      View property
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Your booking details</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Dec 15 - 20, 2024</p>
                      <p className="text-sm text-gray-600">5 nights</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">2 guests</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">123 Ocean Drive</p>
                      <p className="text-sm text-gray-600">Malibu, California, United States</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Host Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Your host</h3>
                <div className="flex items-center space-x-4">
                  <img
                    src="/placeholder.svg?height=60&width=60&text=Michael"
                    alt="Host"
                    className="w-15 h-15 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">Michael</h4>
                      <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                        Superhost
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Host since 2018</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">4.9 • 127 reviews</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleMessageHost}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Payment information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>$450.00 x 5 nights</span>
                    <span>$2,250.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>$75.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$150.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>$200.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total (USD)</span>
                    <span>$2,675.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Reference */}
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Booking reference</h3>
                <p className="text-2xl font-mono font-bold text-teal-600 mb-4">#HT123456789</p>
                <p className="text-sm text-gray-600 mb-4">Save this reference number for your records</p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleViewTrips}>
                    <Calendar className="w-4 h-4 mr-2" />
                    View all trips
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleMessageHost}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message host
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={handleDownloadConfirmation}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download receipt
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Important information</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Check-in: 3:00 PM - 11:00 PM</li>
                  <li>• Check-out: 11:00 AM</li>
                  <li>• Self check-in with keypad</li>
                  <li>• No smoking allowed</li>
                  <li>• Maximum 2 guests</li>
                </ul>
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-yellow-900 mb-2">Cancellation policy</h3>
                <p className="text-sm text-yellow-800">
                  Free cancellation until Dec 8. After that, cancel before Dec 13 for a 50% refund.
                </p>
                <Button variant="link" className="p-0 h-auto text-yellow-900 underline mt-2">
                  View full policy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t">
          <Button variant="outline" onClick={handleBackToHome} className="flex-1 bg-transparent">
            Back to Home
          </Button>
          <Button onClick={handleViewTrips} className="flex-1 bg-teal-600 hover:bg-teal-700">
            View My Trips
          </Button>
        </div>
      </div>
    </div>
  )
}
