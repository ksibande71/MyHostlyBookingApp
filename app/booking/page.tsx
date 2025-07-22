import { BookingFlow } from "@/components/booking-flow"
import { Header } from "@/components/header"

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BookingFlow />
    </div>
  )
}
