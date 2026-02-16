"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Send, Camera, X } from "lucide-react"
import { StarRating } from "./star-rating"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ReviewFormProps {
  onSubmit: (review: {
    userName: string
    rating: number
    comment: string
    photoUrl?: string
  }) => void
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [userName, setUserName] = useState("")
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    setPhotoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userName.trim() || rating === 0 || !comment.trim()) return

    onSubmit({
      userName: userName.trim(),
      rating,
      comment: comment.trim(),
      photoUrl: photoPreview || undefined,
    })
    setUserName("")
    setRating(0)
    setComment("")
    setPhotoPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="font-serif text-lg font-bold text-foreground">
        Write a Review
      </h3>

      {submitted && (
        <div className="bg-[hsl(140,50%,94%)] text-[hsl(140,60%,30%)] text-sm p-3 rounded-lg border border-[hsl(140,50%,80%)]">
          Thank you for your review!
        </div>
      )}

      <div>
        <Label
          htmlFor="reviewer-name"
          className="text-sm text-foreground mb-1.5 block"
        >
          Your Name
        </Label>
        <Input
          id="reviewer-name"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>

      <div>
        <Label className="text-sm text-foreground mb-1.5 block">
          Your Rating
        </Label>
        <StarRating rating={rating} onRate={setRating} interactive size="lg" />
      </div>

      <div>
        <Label
          htmlFor="review-comment"
          className="text-sm text-foreground mb-1.5 block"
        >
          Your Review
        </Label>
        <Textarea
          id="review-comment"
          placeholder="Tell us about your experience..."
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>

      {/* Photo Upload */}
      <div>
        <Label className="text-sm text-foreground mb-1.5 block">
          Add Photo (optional)
        </Label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
          id="review-photo"
        />
        {photoPreview ? (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
            <Image
              src={photoPreview}
              alt="Review photo preview"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={removePhoto}
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-foreground/70 flex items-center justify-center"
              aria-label="Remove photo"
            >
              <X className="h-3 w-3 text-[hsl(0,0%,100%)]" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-border hover:border-primary/50 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Camera className="h-4 w-4" />
            Upload a photo of your pizza
          </button>
        )}
      </div>

      <Button
        type="submit"
        className="bg-primary text-primary-foreground hover:bg-primary/90 self-start"
        disabled={!userName.trim() || rating === 0 || !comment.trim()}
      >
        <Send className="h-4 w-4 mr-2" />
        Submit Review
      </Button>
    </form>
  )
}
