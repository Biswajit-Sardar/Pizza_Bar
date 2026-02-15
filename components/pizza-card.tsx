"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Flame, ShoppingCart, Zap } from "lucide-react"
import type { Pizza } from "@/lib/pizza-data"
import { formatPrice } from "@/lib/pizza-data"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"

interface PizzaCardProps {
  pizza: Pizza
}

export function PizzaCard({ pizza }: PizzaCardProps) {
  const { addItem } = useCart()
  const { isLoggedIn, setShowAuthModal, setAuthRedirectAction } = useAuth()

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setAuthRedirectAction("add-to-cart")
      setShowAuthModal(true)
      return
    }
    addItem(pizza, "medium")
  }

  const handleQuickOrder = () => {
    if (!isLoggedIn) {
      setAuthRedirectAction("quick-order")
      setShowAuthModal(true)
      return
    }
    addItem(pizza, "medium")
    window.location.href = "/checkout"
  }

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link
        href={`/pizza/${pizza.id}`}
        className="block relative aspect-[4/3] overflow-hidden"
      >
        <Image
          src={pizza.image}
          alt={pizza.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {pizza.isPopular && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
              Popular
            </span>
          )}
          {pizza.isNew && (
            <span className="bg-accent text-accent-foreground text-xs font-medium px-2.5 py-1 rounded-full">
              New
            </span>
          )}
        </div>
        {pizza.spiceLevel && (
          <div className="absolute top-3 right-3 flex gap-0.5">
            {Array.from({ length: pizza.spiceLevel }).map((_, i) => (
              <Flame key={i} className="h-4 w-4 text-[hsl(0,84%,60%)]" />
            ))}
          </div>
        )}
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/pizza/${pizza.id}`}>
            <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {pizza.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-medium text-foreground">
              {pizza.rating}
            </span>
            <span className="text-xs text-muted-foreground">
              ({pizza.reviewCount})
            </span>
          </div>
        </div>

        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {pizza.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {pizza.ingredients.slice(0, 3).map((ing) => (
            <span
              key={ing}
              className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full"
            >
              {ing}
            </span>
          ))}
          {pizza.ingredients.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{pizza.ingredients.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">From </span>
            <span className="text-lg font-bold text-primary">
              {formatPrice(pizza.prices.small)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="outline"
              className="text-primary border-primary/30 hover:bg-primary/5 h-8 px-2"
              onClick={handleQuickOrder}
              title="Quick Order"
            >
              <Zap className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1.5" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
