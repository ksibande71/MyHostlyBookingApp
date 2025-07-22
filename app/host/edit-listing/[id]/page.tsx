import { EditListing } from "@/components/edit-listing"
import { Header } from "@/components/header"

export default function EditListingPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <EditListing listingId={params.id} />
    </div>
  )
}
