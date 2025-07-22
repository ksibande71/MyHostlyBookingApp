"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

interface EnhancedCalendarProps {
  propertyId?: string
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  mode?: "single" | "range"
  disabled?: (date: Date) => boolean
  className?: string
}

interface BookedDate {
  start: Date
  end: Date
}

export function EnhancedCalendar({
  propertyId,
  selected,
  onSelect,
  mode = "single",
  disabled,
  className,
}: EnhancedCalendarProps) {
  const [bookedDates, setBookedDates] = useState<BookedDate[]>([])

  useEffect(() => {
    if (propertyId) {
      fetchBookedDates()
    }
  }, [propertyId])

  const fetchBookedDates = async () => {
    try {
      const response = await fetch(`/api/properties/${propertyId}/bookings`)
      if (response.ok) {
        const bookings = await response.json()
        const dates = bookings.map((booking: any) => ({
          start: new Date(booking.checkIn),
          end: new Date(booking.checkOut),
        }))
        setBookedDates(dates)
      }
    } catch (error) {
      console.error("Error fetching booked dates:", error)
    }
  }

  const isDateBooked = (date: Date) => {
    return bookedDates.some((booking) => {
      const dateTime = date.getTime()
      const startTime = booking.start.getTime()
      const endTime = booking.end.getTime()
      return dateTime >= startTime && dateTime <= endTime
    })
  }

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Disable past dates
    if (date < today) {
      return true
    }

    // Disable booked dates
    if (isDateBooked(date)) {
      return true
    }

    // Apply custom disabled function
    if (disabled && disabled(date)) {
      return true
    }

    return false
  }

  return (
    <Calendar
      mode={mode}
      selected={selected}
      onSelect={onSelect}
      disabled={isDateDisabled}
      className={cn("rounded-md border", className)}
      modifiers={{
        booked: (date) => isDateBooked(date),
        past: (date) => {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          return date < today
        },
      }}
      modifiersStyles={{
        booked: {
          backgroundColor: "#fee2e2",
          color: "#dc2626",
          textDecoration: "line-through",
        },
        past: {
          backgroundColor: "#f3f4f6",
          color: "#9ca3af",
        },
      }}
    />
  )
}
