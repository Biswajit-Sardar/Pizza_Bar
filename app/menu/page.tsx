"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal } from "lucide-react"
import { Star, ChefHat, Leaf, Flame, Fish, Grid3X3 } from "lucide-react"
import { categories, getPizzasByCategory, type Pizza } from "@/lib/pizza-data"
import { PizzaCard } from "@/components/pizza-card"
import { Input } from "@/components/ui/input"

const iconMap: Record<string, React.ReactNode> = {
  grid: <Grid3X3 className="h-4 w-4" />,
  star: <Star className="h-4 w-4" />,
  "chef-hat": <ChefHat className="h-4 w-4" />,
  leaf: <Leaf className="h-4 w-4" />,
  flame: <Flame className="h-4 w-4" />,
  fish: <Fish className="h-4 w-4" />,
}

function MenuContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "all"
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<
    "rating" | "price-low" | "price-high" | "popular"
  >("popular")

  const filteredPizzas = getPizzasByCategory(activeCategory).filter(
    (pizza: Pizza) =>
      pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pizza.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pizza.ingredients.some((ing) =>
        ing.toLowerCase().includes(searchQuery.toLowerCase())
      )
  )

  const sortedPizzas = [...filteredPizzas].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "price-low":
        return a.prices.medium - b.prices.medium
      case "price-high":
        return b.prices.medium - a.prices.medium
      case "popular":
        return b.reviewCount - a.reviewCount
      default:
        return 0
    }
  })

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">
            PizzaBar Menu
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
            Discover Your Perfect Pizza
          </h1>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto leading-relaxed">
            Browse our handcrafted selection of wood-fired pizzas, each made
            with the finest ingredients.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pizzas, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="h-10 pl-10 pr-8 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
              aria-label="Sort pizzas"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Categories - Updated warm colors */}
        <div id="categories" className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-[hsl(12,80%,45%)] text-[hsl(0,0%,100%)] shadow-lg shadow-primary/25"
                  : "bg-[hsl(30,40%,94%)] border border-[hsl(30,30%,85%)] text-[hsl(20,15%,30%)] hover:bg-[hsl(30,50%,88%)] hover:border-primary/40"
              }`}
            >
              {iconMap[cat.icon]}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {sortedPizzas.length}
            </span>{" "}
            pizza{sortedPizzas.length !== 1 ? "s" : ""}
            {activeCategory !== "all" && (
              <>
                {" "}
                in{" "}
                <span className="font-semibold text-foreground">
                  {categories.find((c) => c.id === activeCategory)?.name}
                </span>
              </>
            )}
          </p>
          <p className="text-xs text-muted-foreground hidden sm:block">
            All prices in INR
          </p>
        </div>

        {/* Pizza Grid */}
        {sortedPizzas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedPizzas.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              No pizzas found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("")
                setActiveCategory("all")
              }}
              className="mt-4 text-primary hover:underline text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-24 pb-16 px-6 min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading menu...</p>
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  )
}
