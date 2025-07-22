import { HostMessages } from "@/components/host-messages"
import { Header } from "@/components/header"

export default function HostMessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HostMessages />
    </div>
  )
}
