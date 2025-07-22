import { CreateListing } from "@/components/create-listing"
import { Header } from "@/components/header"

export default function CreateListingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CreateListing />
    </div>
  )
}
