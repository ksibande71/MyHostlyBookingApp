import { SearchHero } from "@/components/search-hero"
import { CategoryFilter } from "@/components/category-filter"
import { PropertyGrid } from "@/components/property-grid"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SearchHero />
      <div className="container mx-auto px-4 py-8">
        <CategoryFilter />
        <PropertyGrid />
      </div>
      <Footer />
    </div>
  )
}
