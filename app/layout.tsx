import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { CartDrawer } from "@/components/cart-drawer"
import { AuthModal } from "@/components/auth-modal"
import { Footer } from "@/components/footer"

import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "PizzaBar | Authentic Wood-Fired Pizza Restaurant",
  description:
    "Order handcrafted wood-fired pizzas made with premium ingredients. Browse our menu, read reviews, and get fast delivery. Online and offline payment available.",
}

export const viewport: Viewport = {
  themeColor: "#c2410c",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <AuthModal />
            <CartDrawer />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
