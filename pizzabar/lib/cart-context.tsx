"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Pizza, PizzaSize, CartItem } from "./pizza-data"

interface CartContextType {
  items: CartItem[]
  addItem: (pizza: Pizza, size: PizzaSize, quantity?: number) => void
  removeItem: (pizzaId: string, size: PizzaSize) => void
  updateQuantity: (pizzaId: string, size: PizzaSize, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addItem = useCallback((pizza: Pizza, size: PizzaSize, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.pizza.id === pizza.id && item.size === size
      )
      if (existing) {
        return prev.map((item) =>
          item.pizza.id === pizza.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { pizza, size, quantity }]
    })
  }, [])

  const removeItem = useCallback((pizzaId: string, size: PizzaSize) => {
    setItems((prev) =>
      prev.filter((item) => !(item.pizza.id === pizzaId && item.size === size))
    )
  }, [])

  const updateQuantity = useCallback(
    (pizzaId: string, size: PizzaSize, quantity: number) => {
      if (quantity <= 0) {
        removeItem(pizzaId, size)
        return
      }
      setItems((prev) =>
        prev.map((item) =>
          item.pizza.id === pizzaId && item.size === size
            ? { ...item, quantity }
            : item
        )
      )
    },
    [removeItem]
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.pizza.prices[item.size] * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
