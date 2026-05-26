import LocalizedClientLink from "@modules/common/components/localized-client-link"
import FadeIn from "@modules/common/components/fade-in"
import ServiceCard from "@modules/services/components/service-card"
import { featuredServices } from "@lib/mock/hvac-data"

const FeaturedServices = () => {
  return (
    <section className="py-20 bg-white">
      <div className="content-container">
        <FadeIn className="flex flex-col small:flex-row small:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-shimmer text-sm font-semibold uppercase tracking-widest mb-3 inline-block">
              Most Booked
            </p>
            <h2 className="text-[#0f2a4a] text-3xl small:text-4xl font-bold">
              Services Our Customers Rely On
            </h2>
          </div>
          <LocalizedClientLink
            href="/services"
            className="flex items-center gap-2 text-[#f97316] font-semibold text-sm group flex-shrink-0"
          >
            View all services
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </LocalizedClientLink>
        </FadeIn>

        <div className="grid grid-cols-1 small:grid-cols-2 large:grid-cols-3 gap-6">
          {featuredServices.map((service, i) => (
            <FadeIn key={service.id} delay={i * 80}>
              <ServiceCard service={service} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedServices
