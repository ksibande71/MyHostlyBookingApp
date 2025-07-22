"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, CreditCard, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { AuthModal } from "./auth-modal"
import type { Property } from "@/lib/models/Property"

export function BookingFlow() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated } = useAuth()
  const [property, setProperty] = useState<Property | null>(null)
  const [step, setStep] = useState(1)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showPaymentDecline, setShowPaymentDecline] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    zipCode: "",
    country: "South Africa",
    billingAddress: "",
  })

  const propertyId = searchParams.get("propertyId")
  const checkIn = searchParams.get("checkIn")
  const checkOut = searchParams.get("checkOut")
  const guests = Number.parseInt(searchParams.get("guests") || "2")

  useEffect(() => {
    if (propertyId) {
      fetchProperty()
    }

    // Check authentication when component mounts
    if (!isAuthenticated) {
      setShowAuthModal(true)
    }
  }, [propertyId, isAuthenticated])

  const fetchProperty = async () => {
    try {
      const response = await fetch(`/api/properties/${propertyId}`)
      if (response.ok) {
        const data = await response.json()
        setProperty(data)
      }
    } catch (error) {
      console.error("Error fetching property:", error)
    }
  }

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const subtotal = property ? nights * property.price : 0
  const cleaningFee = 75
  const serviceFee = 150
  const total = subtotal + cleaningFee + serviceFee

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, "")
    return cleaned.length >= 13 && cleaned.length <= 19 && /^\d+$/.test(cleaned)
  }

  const validateExpiryDate = (expiryDate: string) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/
    if (!regex.test(expiryDate)) return false

    const [month, year] = expiryDate.split("/")
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100
    const currentMonth = currentDate.getMonth() + 1

    const expYear = Number.parseInt(year)
    const expMonth = Number.parseInt(month)

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return false
    }

    return true
  }

  const validateCVV = (cvv: string) => {
    return /^\d{3,4}$/.test(cvv)
  }

  const handleNextStep = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handlePayment = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    // Validate payment information
    if (!validateCardNumber(formData.cardNumber)) {
      toast({
        title: "Invalid card number",
        description: "Please enter a valid card number.",
        variant: "destructive",
      })
      return
    }

    if (!validateExpiryDate(formData.expiryDate)) {
      toast({
        title: "Invalid expiry date",
        description: "Please enter a valid expiry date (MM/YY).",
        variant: "destructive",
      })
      return
    }

    if (!validateCVV(formData.cvv)) {
      toast({
        title: "Invalid CVV",
        description: "Please enter a valid CVV (3-4 digits).",
        variant: "destructive",
      })
      return
    }

    // Process booking directly (no payment decline simulation)
    await processBooking()
  }

  const processBooking = async () => {
    try {
      const bookingData = {
        propertyId: propertyId,
        checkIn: checkIn,
        checkOut: checkOut,
        guests: guests,
        totalPrice: total,
        guestInfo: {
          firstName: "John", // Would come from auth context
          lastName: "Doe",
          email: "john@example.com",
          phone: "+27734539955",
        },
        paymentInfo: {
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv,
        },
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })

      if (response.ok) {
        const result = await response.json()
        toast({
          title: "Booking Confirmed!",
          description: `Your reservation has been successfully created.`,
        })
        setTimeout(() => {
          router.push(`/booking-confirmation?bookingId=${result.bookingId}`)
        }, 2000)
      } else {
        throw new Error("Booking failed")
      }
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePaymentDeclineAccept = async () => {
    setShowPaymentDecline(false)
    await processBooking() // Process booking without payment
  }

  if (!property) {
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
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <h1 className="text-2xl font-bold mb-8">Confirm and pay</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Form */}
        <div className="space-y-6">
          {/* Step 1: Payment Options */}
          <Card className={step >= 1 ? "border-black" : "border-gray-200"}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 1 ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  1
                </span>
                <span>Choose when to pay</span>
              </CardTitle>
            </CardHeader>
            {step >= 1 && (
              <CardContent className="space-y-4">
                <RadioGroup value="full" className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="full" id="full" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="full" className="font-medium">
                        Pay R{total.toLocaleString()} now
                      </Label>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 border rounded-lg opacity-50">
                    <RadioGroupItem value="partial" id="partial" disabled />
                    <div className="flex-1">
                      <Label htmlFor="partial" className="font-medium">
                        Pay part now, part later
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        R871.76 now, R3,487.01 charged on Mar 28, 2026. No extra fees.
                      </p>
                    </div>
                  </div>
                </RadioGroup>
                {step === 1 && (
                  <Button onClick={handleNextStep} className="w-full bg-teal-600 hover:bg-teal-700">
                    Continue
                  </Button>
                )}
              </CardContent>
            )}
          </Card>

          {/* Step 2: Payment Method */}
          <Card className={step >= 2 ? "border-black" : "border-gray-200"}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 2 ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </span>
                <span>Add a payment method</span>
              </CardTitle>
            </CardHeader>
            {step >= 2 && (
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <CreditCard className="w-5 h-5" />
                    <span className="font-medium">Credit or debit card</span>
                    <div className="ml-auto flex space-x-2">
                      <img src="/placeholder.svg?height=20&width=30&text=VISA" alt="Visa" className="h-5" />
                      <img src="/placeholder.svg?height=20&width=30&text=MC" alt="Mastercard" className="h-5" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-sm font-medium">
                        Card number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\s/g, "")
                            .replace(/(.{4})/g, "$1 ")
                            .trim()
                          handleInputChange("cardNumber", value)
                        }}
                        className="mt-1"
                      />
                      {formData.cardNumber && !validateCardNumber(formData.cardNumber) && (
                        <p className="text-sm text-red-500 mt-1">Check your card number.</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate" className="text-sm">
                          Expiration
                        </Label>
                        <Input
                          id="expiryDate"
                          placeholder="08 / 26"
                          value={formData.expiryDate}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "")
                            if (value.length >= 2) {
                              value = value.substring(0, 2) + " / " + value.substring(2, 4)
                            }
                            handleInputChange("expiryDate", value)
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-sm">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="774"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, "").substring(0, 4))}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="zipCode" className="text-sm">
                        ZIP code
                      </Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm">Country/region</Label>
                      <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="South Africa">South Africa</SelectItem>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                      />
                    </svg>
                    <span>Google Pay</span>
                  </div>
                </div>

                {step === 2 && (
                  <Button onClick={handleNextStep} className="w-full bg-black text-white hover:bg-gray-800">
                    Next
                  </Button>
                )}
              </CardContent>
            )}
          </Card>

          {/* Step 3: Review Reservation */}
          <Card className={step >= 3 ? "border-black" : "border-gray-200"}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 3 ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  3
                </span>
                <span>Review your reservation</span>
              </CardTitle>
            </CardHeader>
            {step >= 3 && (
              <CardContent>
                <Button onClick={handlePayment} className="w-full bg-teal-600 hover:bg-teal-700">
                  Confirm and pay
                </Button>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Booking Summary */}
        <div>
          <Card className="sticky top-8">
            <CardContent className="p-6">
              <div className="flex space-x-4 mb-6">
                <img
                  src={property.images[0] || "/placeholder.svg"}
                  alt="Property"
                  className="w-24 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-sm text-gray-600">
                    {property.location.city}, {property.location.state}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 fill-black" />
                    <span className="text-sm font-medium">{property.rating}</span>
                    <span className="text-sm text-gray-600">({property.reviewCount})</span>
                    <span className="text-sm text-gray-600">• Guest favourite</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold">Free cancellation</h4>
                  <p className="text-sm text-gray-600">
                    Cancel before Apr 5 for a full refund. <button className="underline">Full policy</button>
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Trip details</h4>
                    <button className="text-sm underline">Change</button>
                  </div>
                  <p className="text-sm text-gray-600">
                    {checkIn &&
                      checkOut &&
                      `${new Date(checkIn).toLocaleDateString()} - ${new Date(checkOut).toLocaleDateString()}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {guests} adult{guests !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <Separator className="mb-6" />

              <div className="space-y-4">
                <h4 className="font-semibold">Price details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>
                      R{property.price.toLocaleString()} x {nights} nights
                    </span>
                    <span>R{subtotal.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>R{total.toLocaleString()}</span>
                  </div>
                  <button className="text-sm underline">Price breakdown</button>
                </div>

                <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">💎</span>
                    </div>
                    <div>
                      <p className="font-semibold text-pink-900">This is a rare find.</p>
                      <p className="text-sm text-pink-800">{property.host.name}'s place is usually booked.</p>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-600 space-y-2">
                  <p>Due today: R871.76</p>
                  <p>Charge on Mar 28, 2026: R3,487.01</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false)
          handleNextStep()
        }}
      />
    </div>
  )
}
