"use client"

import React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  Banknote,
  Smartphone,
  Truck,
  MapPin,
  Check,
  Plus,
  Minus,
  Trash2,
  User,
} from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { formatPrice } from "@/lib/pizza-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type PaymentMethod = "online" | "cash" | "upi"
type Step = "cart" | "details" | "payment" | "confirmation"

export default function CheckoutPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    clearCart,
    totalItems,
  } = useCart()
  const { isLoggedIn, setShowAuthModal, user } = useAuth()
  const [step, setStep] = useState<Step>("cart")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online")
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: "",
    instructions: "",
  })

  const deliveryFee = 49
  const tax = Math.round(totalPrice * 0.05)
  const grandTotal = totalPrice + deliveryFee + tax

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const isDetailsValid =
    formData.name.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.address.trim() !== ""

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    setStep("confirmation")
    clearCart()
  }

  const handleProceed = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      return
    }
    setStep("details")
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name,
        email: prev.email || user.email,
        phone: prev.phone || user.phone,
      }))
    }
  }

  if (orderPlaced) {
    return (
      <div className="pt-24 pb-16 px-6 min-h-screen">
        <div className="mx-auto max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-[hsl(140,50%,90%)] flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-[hsl(140,60%,35%)]" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-3">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-2">
            Thank you for your order, {formData.name}! Your delicious pizzas are
            being prepared.
          </p>
          <div className="bg-card border border-border rounded-xl p-6 my-8 text-left">
            <h3 className="font-semibold text-foreground mb-3">
              Order Details
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-medium text-foreground">
                  #PB{Date.now().toString().slice(-6)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment</span>
                <span className="font-medium text-foreground capitalize">
                  {paymentMethod === "cash"
                    ? "Cash on Delivery"
                    : paymentMethod === "upi"
                      ? "UPI / PhonePe / GPay"
                      : "Online Payment"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery to</span>
                <span className="font-medium text-foreground text-right max-w-[200px]">
                  {formData.address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold text-primary">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
            <Truck className="h-4 w-4" />
            <span>Estimated delivery: 25-35 minutes</span>
          </div>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/menu">Order More Pizzas</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 px-6 min-h-screen">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
          Checkout
        </h1>

        {items.length === 0 && !orderPlaced ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-4">
              Your cart is empty
            </p>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Progress Steps */}
            <div className="flex items-center gap-2 mb-10">
              {(["cart", "details", "payment"] as Step[]).map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (s === "cart") setStep("cart")
                      if (s === "details" && items.length > 0 && isLoggedIn)
                        setStep("details")
                      if (s === "payment" && isDetailsValid)
                        setStep("payment")
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      step === s
                        ? "bg-primary text-primary-foreground"
                        : (["cart", "details", "payment"] as Step[]).indexOf(
                              step
                            ) > i
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </button>
                  <span
                    className={`text-sm font-medium capitalize hidden sm:block ${
                      step === s
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {s === "cart"
                      ? "Cart"
                      : s === "details"
                        ? "Delivery"
                        : "Payment"}
                  </span>
                  {i < 2 && (
                    <div className="w-8 md:w-16 h-0.5 bg-border mx-1" />
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {step === "cart" && (
                  <div>
                    <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                      Your Cart ({totalItems} items)
                    </h2>
                    <div className="flex flex-col gap-4">
                      {items.map((item) => (
                        <div
                          key={`${item.pizza.id}-${item.size}`}
                          className="flex gap-4 p-4 bg-card border border-border rounded-xl"
                        >
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.pizza.image}
                              alt={item.pizza.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-medium text-foreground">
                                  {item.pizza.name}
                                </h3>
                                <p className="text-sm text-muted-foreground capitalize">
                                  {item.size} size
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  removeItem(item.pizza.id, item.size)
                                }
                                className="text-muted-foreground hover:text-destructive transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.pizza.id,
                                      item.size,
                                      item.quantity - 1
                                    )
                                  }
                                  className="h-7 w-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                                  aria-label="Decrease"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="w-6 text-center font-medium text-foreground text-sm">
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
                                  className="h-7 w-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                                  aria-label="Increase"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <span className="font-bold text-primary">
                                {formatPrice(
                                  item.pizza.prices[item.size] * item.quantity
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      {!isLoggedIn && (
                        <div className="mb-4 p-4 rounded-xl bg-[hsl(36,60%,95%)] border border-[hsl(36,50%,80%)] flex items-center gap-3">
                          <User className="h-5 w-5 text-[hsl(36,50%,40%)]" />
                          <p className="text-sm text-[hsl(36,50%,30%)]">
                            Please sign in or create an account to proceed with
                            your order.
                          </p>
                        </div>
                      )}
                      <Button
                        size="lg"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={handleProceed}
                      >
                        {isLoggedIn
                          ? "Continue to Delivery Details"
                          : "Sign In to Continue"}
                      </Button>
                    </div>
                  </div>
                )}

                {step === "details" && (
                  <div>
                    <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                      Delivery Details
                    </h2>
                    <div className="bg-card border border-border rounded-xl p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="name"
                            className="text-sm text-foreground mb-1.5 block"
                          >
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="phone"
                            className="text-sm text-foreground mb-1.5 block"
                          >
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="+91 9XXXX XXXXX"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label
                            htmlFor="email"
                            className="text-sm text-foreground mb-1.5 block"
                          >
                            Email (optional)
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label
                            htmlFor="address"
                            className="text-sm text-foreground mb-1.5 block"
                          >
                            Delivery Address *
                          </Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Textarea
                              id="address"
                              name="address"
                              placeholder="Enter your full delivery address..."
                              className="pl-10"
                              rows={2}
                              value={formData.address}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <Label
                            htmlFor="instructions"
                            className="text-sm text-foreground mb-1.5 block"
                          >
                            Special Instructions (optional)
                          </Label>
                          <Textarea
                            id="instructions"
                            name="instructions"
                            placeholder="Any special requests, allergies, doorbell instructions..."
                            rows={2}
                            value={formData.instructions}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setStep("cart")}
                      >
                        Back
                      </Button>
                      <Button
                        size="lg"
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => setStep("payment")}
                        disabled={!isDetailsValid}
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}

                {step === "payment" && (
                  <div>
                    <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                      Choose Payment Method
                    </h2>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => setPaymentMethod("online")}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                          paymentMethod === "online"
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border bg-card hover:border-primary/50"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            paymentMethod === "online"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            Online Payment
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Pay securely with Credit/Debit Card, Net Banking
                          </p>
                        </div>
                        {paymentMethod === "online" && (
                          <Check className="h-5 w-5 text-primary ml-auto" />
                        )}
                      </button>

                      <button
                        onClick={() => setPaymentMethod("upi")}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                          paymentMethod === "upi"
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border bg-card hover:border-primary/50"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            paymentMethod === "upi"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            UPI Payment
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Pay with Google Pay, PhonePe, Paytm, or any UPI app
                          </p>
                        </div>
                        {paymentMethod === "upi" && (
                          <Check className="h-5 w-5 text-primary ml-auto" />
                        )}
                      </button>

                      <button
                        onClick={() => setPaymentMethod("cash")}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                          paymentMethod === "cash"
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border bg-card hover:border-primary/50"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            paymentMethod === "cash"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Banknote className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            Cash on Delivery
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Pay with cash when your order arrives at your
                            doorstep
                          </p>
                        </div>
                        {paymentMethod === "cash" && (
                          <Check className="h-5 w-5 text-primary ml-auto" />
                        )}
                      </button>
                    </div>

                    {paymentMethod === "online" && (
                      <div className="mt-6 bg-card border border-border rounded-xl p-6">
                        <h3 className="font-medium text-foreground mb-4">
                          Card Details
                        </h3>
                        <div className="flex flex-col gap-4">
                          <div>
                            <Label
                              htmlFor="card-number"
                              className="text-sm text-foreground mb-1.5 block"
                            >
                              Card Number
                            </Label>
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor="card-expiry"
                                className="text-sm text-foreground mb-1.5 block"
                              >
                                Expiry
                              </Label>
                              <Input
                                id="card-expiry"
                                placeholder="MM/YY"
                                maxLength={5}
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor="card-cvv"
                                className="text-sm text-foreground mb-1.5 block"
                              >
                                CVV
                              </Label>
                              <Input
                                id="card-cvv"
                                placeholder="123"
                                maxLength={4}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "upi" && (
                      <div className="mt-6 bg-card border border-border rounded-xl p-6">
                        <h3 className="font-medium text-foreground mb-4">
                          UPI Payment
                        </h3>
                        <div>
                          <Label
                            htmlFor="upi-id"
                            className="text-sm text-foreground mb-1.5 block"
                          >
                            UPI ID
                          </Label>
                          <Input
                            id="upi-id"
                            placeholder="yourname@upi or phone@paytm"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          You will receive a payment request on your UPI app
                          after placing the order.
                        </p>
                      </div>
                    )}

                    {paymentMethod === "cash" && (
                      <div className="mt-6 bg-[hsl(36,60%,95%)] border border-[hsl(36,50%,80%)] rounded-xl p-4">
                        <p className="text-sm text-[hsl(36,50%,30%)]">
                          Please keep{" "}
                          <span className="font-bold">
                            {formatPrice(grandTotal)}
                          </span>{" "}
                          ready. Our delivery person will collect the payment
                          upon delivery.
                        </p>
                      </div>
                    )}

                    <div className="mt-6 flex gap-3">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setStep("details")}
                      >
                        Back
                      </Button>
                      <Button
                        size="lg"
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={handlePlaceOrder}
                      >
                        Place Order - {formatPrice(grandTotal)}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                    Order Summary
                  </h3>
                  <div className="flex flex-col gap-3 mb-4">
                    {items.map((item) => (
                      <div
                        key={`${item.pizza.id}-${item.size}`}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="bg-primary/10 text-primary text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                            {item.quantity}
                          </span>
                          <span className="text-foreground truncate">
                            {item.pizza.name}
                          </span>
                          <span className="text-xs text-muted-foreground capitalize flex-shrink-0">
                            ({item.size})
                          </span>
                        </div>
                        <span className="font-medium text-foreground flex-shrink-0 ml-2">
                          {formatPrice(
                            item.pizza.prices[item.size] * item.quantity
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-3 flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Delivery Fee
                      </span>
                      <span className="text-foreground">
                        {formatPrice(deliveryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        GST (5%)
                      </span>
                      <span className="text-foreground">
                        {formatPrice(tax)}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t border-border">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary text-lg">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <Truck className="h-3.5 w-3.5" />
                    <span>Estimated delivery: 25-35 min</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
