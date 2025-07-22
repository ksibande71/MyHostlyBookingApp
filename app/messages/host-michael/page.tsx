import { MessagesPage } from "@/components/messages-page"
import { Header } from "@/components/header"

export default function HostMessagesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <MessagesPage hostName="Michael" />
    </div>
  )
}
