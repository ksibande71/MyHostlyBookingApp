import type { ObjectId } from "mongodb"

export interface Property {
  _id?: ObjectId
  title: string
  description: string
  location: {
    address: string
    city: string
    state: string
    country: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  price: number
  images: string[]
  amenities: string[]
  propertyType: string
  guests: number
  bedrooms: number
  bathrooms: number
  host: {
    id: string
    name: string
    avatar?: string
    isSuperhost: boolean
    joinedYear: number
  }
  rating: number
  reviewCount: number
  availability: {
    startDate: Date
    endDate: Date
  }[]
  createdAt: Date
  updatedAt: Date
  status: "active" | "inactive" | "pending"
}

export interface Booking {
  _id?: ObjectId
  propertyId: ObjectId
  userId: string
  guestInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  checkIn: Date
  checkOut: Date
  guests: number
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  paymentInfo: {
    cardLast4: string
    paymentIntentId?: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface User {
  _id?: ObjectId
  email: string
  firstName: string
  lastName: string
  avatar?: string
  phone?: string
  isHost: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  _id?: ObjectId
  propertyId: ObjectId
  userId: string
  bookingId: ObjectId
  rating: number
  comment: string
  createdAt: Date
}
