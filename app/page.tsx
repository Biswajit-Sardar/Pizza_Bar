import { HeroSection } from "@/components/hero-section"
import { FeaturedSection } from "@/components/featured-section"
import { CategoriesSection } from "@/components/categories-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CtaSection } from "@/components/cta-section"

export default function Page() {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <CategoriesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
