import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import StatsSection from "@modules/home/components/stats-section"
import CategoriesSection from "@modules/home/components/categories-section"
import FeaturedServices from "@modules/home/components/featured-services"
import WhyChooseUs from "@modules/home/components/why-choose-us"
import BrandsSection from "@modules/home/components/brands-section"
import HowItWorks from "@modules/home/components/how-it-works"
import Testimonials from "@modules/home/components/testimonials"
import ContactBanner from "@modules/home/components/contact-banner"
import MapSection from "@modules/home/components/map-section"
import FAQSection from "@modules/home/components/faq-section"
import NewsletterCTA from "@modules/home/components/newsletter-cta"

export const metadata: Metadata = {
  title: "HVAC | Heating & Cooling Solutions",
  description:
    "Quality HVAC services for homes and businesses across the UK. Expert support, fast response.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  await props.params

  return (
    <>
      <Hero />
      <StatsSection />
      <CategoriesSection />
      <FeaturedServices />
      <WhyChooseUs />
      <BrandsSection />
      <HowItWorks />
      <Testimonials />
      <ContactBanner />
      <MapSection />
      <FAQSection />
      <NewsletterCTA />
    </>
  )
}
