import { TripsPage } from "@/components/trips-page"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Trips() {
  return (
    <div className="min-h-screen">
      <Header />
      <TripsPage />
      <Footer />
    </div>
  )
}
