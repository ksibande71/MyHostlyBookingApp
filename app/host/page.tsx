import { HostDashboard } from "@/components/host-dashboard"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HostPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <HostDashboard />
      <Footer />
    </div>
  )
}
