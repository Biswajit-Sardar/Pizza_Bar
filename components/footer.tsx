import Link from "next/link"
import { MapPin, Phone, Clock, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-[hsl(30,20%,80%)] py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-lg">
                  P
                </span>
              </div>
              <span className="font-serif text-xl font-bold text-[hsl(0,0%,100%)]">
                PizzaBar
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Handcrafted pizzas made with love, premium ingredients, and a
              flame that tells a story.
            </p>
          </div>

          <div>
            <h3 className="font-serif font-bold text-[hsl(0,0%,100%)] mb-4">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/"
                className="text-sm hover:text-[hsl(0,0%,100%)] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="text-sm hover:text-[hsl(0,0%,100%)] transition-colors"
              >
                Full Menu
              </Link>
              <Link
                href="/checkout"
                className="text-sm hover:text-[hsl(0,0%,100%)] transition-colors"
              >
                Order Online
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-[hsl(0,0%,100%)] mb-4">
              Contact Us
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>42 MG Road, Kolkata 700016</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>hello@pizzabar.in</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-[hsl(0,0%,100%)] mb-4">
              Opening Hours
            </h3>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>Mon - Thu: 11am - 10pm</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>Fri - Sat: 11am - 11pm</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>Sunday: 12pm - 9pm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[hsl(30,10%,25%)] text-center">
          <p className="text-sm text-[hsl(30,10%,50%)]">
            2026 PizzaBar. All rights reserved. Crafted with passion.
          </p>
        </div>
      </div>
    </footer>
  )
}
