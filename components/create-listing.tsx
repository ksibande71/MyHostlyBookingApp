"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Minus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"

export function CreateListing() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [newImageUrl, setNewImageUrl] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "",
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    address: "",
    city: "",
    state: "",
    zipCode: "",
    price: "",
    amenities: [] as string[],
  })

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const addImageUrl = () => {
    if (newImageUrl.trim() && !imageUrls.includes(newImageUrl.trim())) {
      setImageUrls([...imageUrls, newImageUrl.trim()])
      setNewImageUrl("")
    }
  }

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    try {
      const listingData = {
        title: formData.title,
        description: formData.description,
        propertyType: formData.propertyType,
        guests: formData.guests,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: "United States",
        price: formData.price,
        amenities: formData.amenities,
        images: imageUrls.length > 0 ? imageUrls : ["/placeholder.svg?height=600&width=800"],
        hostId: "current-host", // In a real app, get from auth
        hostName: "Current Host",
      }

      const response = await fetch("/api/host/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listingData),
      })

      if (response.ok) {
        const result = await response.json()
        toast({
          title: "Listing Created!",
          description: "Your property has been successfully listed on Hostly.",
        })
        setTimeout(() => {
          router.push("/host")
        }, 2000)
      } else {
        throw new Error("Failed to create listing")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create listing. Please try again.",
        variant: "destructive",
      })
    }
  }

  const amenitiesList = [
    "WiFi",
    "Kitchen",
    "Washer",
    "Dryer",
    "Air conditioning",
    "Heating",
    "TV",
    "Pool",
    "Hot tub",
    "Free parking",
    "Gym",
    "Breakfast",
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">List your space</h1>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i <= step ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {i}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Tell us about your place</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Property title</Label>
              <Input
                id="title"
                placeholder="Beautiful apartment in downtown"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your space..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Property type</Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="cabin">Cabin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleNext} className="w-full bg-teal-600 hover:bg-teal-700">
              Continue
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Property details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Guests</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ ...formData, guests: Math.max(1, formData.guests - 1) })}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center">{formData.guests}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ ...formData, guests: formData.guests + 1 })}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Bedrooms</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ ...formData, bedrooms: Math.max(1, formData.bedrooms - 1) })}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center">{formData.bedrooms}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ ...formData, bedrooms: formData.bedrooms + 1 })}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Bathrooms</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ ...formData, bathrooms: Math.max(1, formData.bathrooms - 1) })}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center">{formData.bathrooms}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ ...formData, bathrooms: formData.bathrooms + 1 })}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-teal-600 hover:bg-teal-700">
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Location & Amenities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {amenitiesList.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({ ...formData, amenities: [...formData.amenities, amenity] })
                        } else {
                          setFormData({ ...formData, amenities: formData.amenities.filter((a) => a !== amenity) })
                        }
                      }}
                    />
                    <Label htmlFor={amenity} className="text-sm">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-teal-600 hover:bg-teal-700">
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Photos & Pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Add photos via URL</Label>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Paste image URL here..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                  />
                  <Button onClick={addImageUrl} variant="outline">
                    Add
                  </Button>
                </div>

                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Property image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=128&width=200&text=Invalid+URL"
                          }}
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 p-1 h-6 w-6"
                          onClick={() => removeImageUrl(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-sm text-gray-600">
                  Add image URLs from the internet. You can use services like Unsplash, Pexels, or any direct image
                  link.
                </p>
              </div>
            </div>
            <div>
              <Label htmlFor="price">Price per night ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="100"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleSubmit} className="flex-1 bg-teal-600 hover:bg-teal-700">
                Publish listing
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
