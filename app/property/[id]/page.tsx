import { PropertyDetails } from "@/components/property-details"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PropertyPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen">
      <Header />
      <PropertyDetails propertyId={params.id} />
      <Footer />
    </div>
  )
}
