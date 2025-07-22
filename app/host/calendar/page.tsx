import { HostCalendar } from "@/components/host-calendar"
import { Header } from "@/components/header"

export default function HostCalendarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HostCalendar />
    </div>
  )
}
