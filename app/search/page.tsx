import { SearchResults } from "@/components/search-results"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function SearchPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <SearchResults />
      <Footer />
    </div>
  )
}
