"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Flame,
  Clock,
  Check,
  Zap,
} from "lucide-react"
import {
  getPizzaById,
  getReviewsByPizzaId,
  formatPrice,
  type PizzaSize,
} from "@/lib/pizza-data"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { StarRating } from "@/components/star-rating"
import { ReviewForm } from "@/components/review-form"
import { Button } from "@/components/ui/button"

const sizeLabels: Record<PizzaSize, string> = {
  small: 'Small (8")',
  medium: 'Medium (12")',
  large: 'Large (16")',
}

export default function PizzaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const pizza = getPizzaById(id)
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("medium")
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const { isLoggedIn, setShowAuthModal, setAuthRedirectAction } = useAuth()

  if (!pizza) {
    notFound()
  }

  const existingReviews = getReviewsByPizzaId(pizza.id)
  const [localReviews, setLocalReviews] = useState(existingReviews)

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setAuthRedirectAction("add-to-cart")
      setShowAuthModal(true)
      return
    }
    addItem(pizza, selectedSize, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleQuickOrder = () => {
    if (!isLoggedIn) {
      setAuthRedirectAction("quick-order")
      setShowAuthModal(true)
      return
    }
    addItem(pizza, selectedSize, quantity)
    window.location.href = "/checkout"
  }

  const handleNewReview = (review: {
    userName: string
    rating: number
    comment: string
    photoUrl?: string
  }) => {
    const newReview = {
      id: `local-${Date.now()}`,
      pizzaId: pizza.id,
      userName: review.userName,
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString().split("T")[0],
      avatar: review.userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      photoUrl: review.photoUrl,
    }
    setLocalReviews((prev) => [newReview, ...prev])
  }

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Menu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src={pizza.image}
              alt={pizza.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {pizza.isPopular && (
                <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                  Popular
                </span>
              )}
              {pizza.isNew && (
                <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                  New
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-medium tracking-widest uppercase text-primary">
                  {pizza.category}
                </span>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-1">
                  {pizza.name}
                </h1>
              </div>
              {pizza.spiceLevel && (
                <div className="flex gap-0.5 flex-shrink-0 mt-2">
                  {Array.from({ length: pizza.spiceLevel }).map((_, i) => (
                    <Flame
                      key={i}
                      className="h-5 w-5 text-[hsl(0,84%,60%)]"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={pizza.rating} size="md" />
              <span className="text-sm font-medium text-foreground">
                {pizza.rating}
              </span>
              <span className="text-sm text-muted-foreground">
                ({pizza.reviewCount} reviews)
              </span>
            </div>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              {pizza.description}
            </p>

            {/* Ingredients */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {pizza.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Choose Size
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {(Object.keys(pizza.prices) as PizzaSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${
                      selectedSize === size
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="text-xs text-muted-foreground">
                      {sizeLabels[size]}
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      {formatPrice(pizza.prices[size])}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-3 bg-card border border-border rounded-lg px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-semibold text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                size="lg"
                className={`flex-1 ${
                  added
                    ? "bg-[hsl(140,60%,40%)] text-[hsl(0,0%,100%)] hover:bg-[hsl(140,60%,35%)]"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                onClick={handleAddToCart}
              >
                {added ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add - {formatPrice(pizza.prices[selectedSize] * quantity)}
                  </>
                )}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
                onClick={handleQuickOrder}
                title="Quick Order"
              >
                <Zap className="h-5 w-5 mr-1" />
                Order
              </Button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Estimated delivery: 25-35 minutes</span>
            </div>

            {!isLoggedIn && (
              <p className="mt-2 text-xs text-muted-foreground">
                Please sign in or create an account to place an order.
              </p>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Customer Reviews
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {localReviews.length} review
                {localReviews.length !== 1 ? "s" : ""} for {pizza.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <StarRating rating={pizza.rating} size="md" />
              <span className="text-lg font-bold text-foreground">
                {pizza.rating}
              </span>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Rating Bars */}
              <div className="flex flex-col gap-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = localReviews.filter(
                    (r) => r.rating === stars
                  ).length
                  const pct =
                    localReviews.length > 0
                      ? (count / localReviews.length) * 100
                      : 0
                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-12">
                        <span className="text-sm text-foreground">
                          {stars}
                        </span>
                        <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                      </div>
                      <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8 text-right">
                        {count}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Write Review */}
              <ReviewForm onSubmit={handleNewReview} />
            </div>
          </div>

          {/* Reviews List */}
          <div className="flex flex-col gap-4">
            {localReviews.map((review) => (
              <div
                key={review.id}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {review.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {review.userName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
                {review.photoUrl && (
                  <div className="mt-3 relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={review.photoUrl}
                      alt={`Photo by ${review.userName}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
