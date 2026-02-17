"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { pizzas } from "@/lib/pizza-data"
import { PizzaCard } from "./pizza-card"
import { Button } from "@/components/ui/button"

export function FeaturedSection() {
  const featured = pizzas.filter((p) => p.isPopular).slice(0, 4)

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">
              Most Loved
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
              Our Popular Picks
            </h2>
          </div>
          <Button variant="ghost" className="hidden md:flex text-primary hover:text-primary/80" asChild>
            <Link href="/menu">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link href="/menu">
              View Full Menu
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
