"use client"

import Image from "next/image"
import Link from "next/link"
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/pizza-data"
import { Button } from "@/components/ui/button"

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart()

  if (!isCartOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-foreground/40 z-50"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-lg font-bold text-foreground">
              Your Cart ({totalItems})
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
            <p className="text-muted-foreground text-center">
              Your cart is empty. Add some delicious pizzas!
            </p>
            <Button onClick={() => setIsCartOpen(false)} asChild>
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={`${item.pizza.id}-${item.size}`}
                    className="flex gap-4 p-3 rounded-lg bg-card border border-border"
                  >
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.pizza.image}
                        alt={item.pizza.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground text-sm truncate">
                        {item.pizza.name}
                      </h3>
                      <p className="text-xs text-muted-foreground capitalize">
                        {item.size} size
                      </p>
                      <p className="text-sm font-semibold text-primary mt-1">
                        {formatPrice(item.pizza.prices[item.size])}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.pizza.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="h-6 w-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.pizza.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="h-6 w-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.pizza.id, item.size)}
                          className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-sm font-medium text-foreground">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Delivery Fee
                </span>
                <span className="text-sm font-medium text-foreground">
                  {formatPrice(49)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4 pt-2 border-t border-border">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-lg text-primary">
                  {formatPrice(totalPrice + 49)}
                </span>
              </div>
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
                asChild
                onClick={() => setIsCartOpen(false)}
              >
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
