"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export function EditListing({ listingId }: { listingId: string }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "Cozy Mountain Cabin",
    description: "A perfect retreat in the mountains with stunning views and cozy interiors.",
    price: "250",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
  })

  const handleSave = () => {
    toast({
      title: "Listing updated!",
      description: "Your changes have been saved successfully.",
    })
    setTimeout(() => {
      router.push("/host")
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Listing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Property title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price per night ($)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="guests">Max guests</Label>
              <Input
                id="guests"
                type="number"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: Number.parseInt(e.target.value) })}
              />
            </div>
          </div>

          <Button onClick={handleSave} className="w-full bg-teal-600 hover:bg-teal-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
