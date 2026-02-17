"use client"

import { useState } from "react"
import { X, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AuthModal() {
  const { showAuthModal, setShowAuthModal, login, signup } = useAuth()
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (mode === "login") {
      if (!formData.email.trim() || !formData.password.trim()) {
        setError("Please fill in all fields")
        return
      }
      const success = login(formData.email, formData.password)
      if (!success) setError("Invalid credentials")
    } else {
      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.phone.trim() ||
        !formData.password.trim()
      ) {
        setError("Please fill in all required fields")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }
      const success = signup(
        formData.name,
        formData.email,
        formData.phone,
        formData.password
      )
      if (!success) setError("Signup failed, try again")
    }
  }

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login")
    setError("")
    setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" })
  }

  if (!showAuthModal) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-[60]"
        onClick={() => setShowAuthModal(false)}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className="relative bg-primary px-6 py-8 text-center">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-3">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-primary-foreground">
              {mode === "login" ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="text-sm text-primary-foreground/80 mt-1">
              {mode === "login"
                ? "Sign in to place your order"
                : "Register to start ordering delicious pizzas"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            {mode === "signup" && (
              <div>
                <Label htmlFor="auth-name" className="text-sm text-foreground mb-1.5 block">
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="auth-name"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="auth-email" className="text-sm text-foreground mb-1.5 block">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="auth-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <Label htmlFor="auth-phone" className="text-sm text-foreground mb-1.5 block">
                  Phone Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="auth-phone"
                    name="phone"
                    placeholder="+91 9XXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="auth-password" className="text-sm text-foreground mb-1.5 block">
                Password *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="auth-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <Label htmlFor="auth-confirm" className="text-sm text-foreground mb-1.5 block">
                  Confirm Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="auth-confirm"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
            >
              {mode === "login" ? "Sign In" : "Create Account"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={switchMode}
                className="text-primary font-medium hover:underline"
              >
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
