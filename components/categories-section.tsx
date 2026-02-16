import Link from "next/link"
import { Star, ChefHat, Leaf, Flame, Fish, Grid3X3 } from "lucide-react"
import { categories } from "@/lib/pizza-data"

const iconMap: Record<string, React.ReactNode> = {
  grid: <Grid3X3 className="h-6 w-6" />,
  star: <Star className="h-6 w-6" />,
  "chef-hat": <ChefHat className="h-6 w-6" />,
  leaf: <Leaf className="h-6 w-6" />,
  flame: <Flame className="h-6 w-6" />,
  fish: <Fish className="h-6 w-6" />,
}

export function CategoriesSection() {
  return (
    <section className="py-20 px-6 bg-card">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">
            Explore
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
            Pizza Categories
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto leading-relaxed">
            From timeless classics to bold specialty creations, discover your
            perfect slice.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/menu?category=${cat.id}`}
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background border border-border hover:border-primary hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                {iconMap[cat.icon]}
              </div>
              <span className="text-sm font-medium text-foreground">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
