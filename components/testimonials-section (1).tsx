import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Rahul Sharma",
    avatar: "RS",
    rating: 5,
    comment:
      "Best pizza in town! The Margherita is perfection. Fresh ingredients and that wood-fired flavor is unbeatable.",
  },
  {
    name: "Priya Patel",
    avatar: "PP",
    rating: 5,
    comment:
      "The Meat Lovers pizza is incredibly loaded. Every bite is a flavor explosion. My entire family loves ordering from PizzaBar!",
  },
  {
    name: "Amit Kumar",
    avatar: "AK",
    rating: 5,
    comment:
      "Ordering online was so easy and the delivery was super fast. The Mushroom Truffle pizza is out of this world!",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-card rounded-xl border border-border p-6 relative"
            >
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent text-accent"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {t.comment}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {t.avatar}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
