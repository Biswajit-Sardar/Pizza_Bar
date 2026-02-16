import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-20 px-6 bg-primary">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground text-balance">
          Ready to Order Your Perfect Pizza?
        </h2>
        <p className="mt-4 text-primary-foreground/80 leading-relaxed max-w-lg mx-auto">
          Browse our full menu, customize your order, and choose from UPI,
          card, or cash-on-delivery payment. Fresh pizza delivered to your door.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-[hsl(0,0%,100%)] text-primary hover:bg-[hsl(0,0%,95%)] px-8"
            asChild
          >
            <Link href="/menu">
              Order Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8"
            asChild
          >
            <Link href="/menu">View Full Menu</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
