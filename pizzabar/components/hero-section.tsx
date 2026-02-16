"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { pizzas, formatPrice } from "@/lib/pizza-data"

const offers = [
  {
    tag: "Welcome to PizzaBar",
    title: "Authentic Wood-Fired Pizza",
    description:
      "Every pizza tells a story. Ours begins with the finest ingredients, hand-stretched dough, and a flame that dances at 900 degrees.",
    image: "/images/hero-pizza.jpg",
    cta: "Order Now",
    href: "/menu",
  },
  {
    tag: "Today's Special",
    title: "Buy 1 Get 1 Free",
    description: `Order any large Pepperoni or Meat Lovers pizza and get a second one absolutely free. Limited time offer!`,
    image: "/images/pepperoni.jpg",
    cta: "Grab the Deal",
    href: "/pizza/pepperoni",
  },
  {
    tag: "New Arrival",
    title: "Mushroom Truffle Pizza",
    description: `Wild forest mushrooms with aromatic truffle oil & fresh thyme. Starting at just ${formatPrice(329)}. Try it today!`,
    image: "/images/mushroom.jpg",
    cta: "Try Now",
    href: "/pizza/mushroom-truffle",
  },
  {
    tag: "Combo Offer",
    title: "Family Feast for " + formatPrice(999),
    description:
      "2 Large Pizzas + 1 Garlic Bread + 4 Drinks. Perfect for a weekend family dinner.",
    image: "/images/meat-lovers.jpg",
    cta: "Order Combo",
    href: "/menu",
  },
  {
    tag: "Flat 20% Off",
    title: "First Order Discount",
    description:
      "Sign up and get flat 20% off on your very first order. Use code PIZZABAR20 at checkout!",
    image: "/images/bbq-chicken.jpg",
    cta: "Sign Up & Save",
    href: "/menu",
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setCurrent(index)
      setTimeout(() => setIsTransitioning(false), 600)
    },
    [isTransitioning]
  )

  const next = useCallback(() => {
    goTo((current + 1) % offers.length)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + offers.length) % offers.length)
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slide = offers[current]

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background images - all preloaded, opacity-toggled */}
      {offers.map((offer, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={offer.image}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(20,15%,5%)]/85 via-[hsl(20,15%,5%)]/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 w-full">
        <div className="max-w-xl">
          <p
            key={`tag-${current}`}
            className="text-sm font-medium tracking-widest uppercase text-[hsl(36,70%,50%)] mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            {slide.tag}
          </p>
          <h1
            key={`title-${current}`}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-[hsl(0,0%,100%)] leading-tight text-balance animate-in fade-in slide-in-from-bottom-3 duration-500"
          >
            {slide.title}
          </h1>
          <p
            key={`desc-${current}`}
            className="mt-6 text-lg text-[hsl(30,20%,80%)] leading-relaxed max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {slide.description}
          </p>
          <div
            key={`cta-${current}`}
            className="mt-8 flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-5 duration-500"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
              asChild
            >
              <Link href={slide.href}>
                {slide.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[hsl(30,20%,80%)] text-[hsl(0,0%,100%)] hover:bg-[hsl(0,0%,100%)]/10 px-8"
              asChild
            >
              <Link href="/menu">View Menu</Link>
            </Button>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-[hsl(0,0%,100%)]/10 backdrop-blur-sm flex items-center justify-center text-[hsl(0,0%,100%)] hover:bg-[hsl(0,0%,100%)]/20 transition-colors"
            aria-label="Previous offer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-[hsl(0,0%,100%)]/10 backdrop-blur-sm flex items-center justify-center text-[hsl(0,0%,100%)] hover:bg-[hsl(0,0%,100%)]/20 transition-colors"
            aria-label="Next offer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {offers.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-primary"
                  : "w-2 bg-[hsl(0,0%,100%)]/40 hover:bg-[hsl(0,0%,100%)]/60"
              }`}
              aria-label={`Go to offer ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
