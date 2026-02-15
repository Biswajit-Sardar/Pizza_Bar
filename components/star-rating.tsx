"use client"

import { Star } from "lucide-react"
import { useState } from "react"

interface StarRatingProps {
  rating: number
  onRate?: (rating: number) => void
  size?: "sm" | "md" | "lg"
  interactive?: boolean
}

const sizeMap = {
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
  lg: "h-6 w-6",
}

export function StarRating({
  rating,
  onRate,
  size = "md",
  interactive = false,
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-0.5" role="group" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const value = i + 1
        const isFilled = interactive ? value <= (hovered || rating) : value <= rating
        const isHalf = !interactive && !isFilled && value - 0.5 <= rating

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => onRate?.(value)}
            onMouseEnter={() => interactive && setHovered(value)}
            onMouseLeave={() => interactive && setHovered(0)}
            className={`${interactive ? "cursor-pointer" : "cursor-default"} transition-colors`}
            aria-label={`${value} star${value !== 1 ? "s" : ""}`}
          >
            <Star
              className={`${sizeMap[size]} ${
                isFilled
                  ? "fill-accent text-accent"
                  : isHalf
                    ? "fill-accent/50 text-accent"
                    : "fill-transparent text-border"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
