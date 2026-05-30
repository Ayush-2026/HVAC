import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ServiceCard from "@modules/services/components/service-card"
import {
  getServiceBySlug,
  getCategoryForService,
  hvacCategories,
  formatPrice,
} from "@lib/mock/hvac-data"

type Props = {
  params: Promise<{ slug: string; countryCode: string }>
}

export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  return hvacCategories
    .flatMap((c) => c.services)
    .map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: `${service.title} | HVAC Services`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const category = getCategoryForService(service.id)
  const related = category?.services.filter((s) => s.id !== service.id).slice(0, 3) ?? []

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="content-container py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <LocalizedClientLink href="/" className="hover:text-[#f97316] transition-colors">Home</LocalizedClientLink>
            <span>/</span>
            <LocalizedClientLink href="/services" className="hover:text-[#f97316] transition-colors">Services</LocalizedClientLink>
            {category && (
              <>
                <span>/</span>
                <LocalizedClientLink
                  href={`/services?category=${category.handle}`}
                  className="hover:text-[#f97316] transition-colors"
                >
                  {category.title}
                </LocalizedClientLink>
              </>
            )}
            <span>/</span>
            <span className="text-[#0f2a4a] font-medium">{service.title}</span>
          </nav>
        </div>
      </div>

      <div className="content-container py-12">
        <div className="grid grid-cols-1 large:grid-cols-2 gap-12 items-start">

          {/* Left: Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            {service.tags.includes("Emergency") && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                24/7 Emergency
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold uppercase tracking-wider bg-[#f97316]/10 text-[#f97316] px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div>
              <h1 className="text-[#0f2a4a] text-3xl small:text-4xl font-bold mb-3">
                {service.title}
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed">{service.description}</p>
            </div>

            {/* Key info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Duration</p>
                <div className="flex items-center gap-2 text-[#0f2a4a] font-semibold">
                  <svg className="w-4 h-4 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {service.duration}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Category</p>
                <div className="flex items-center gap-2 text-[#0f2a4a] font-semibold">
                  <svg className="w-4 h-4 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {category?.title ?? "HVAC"}
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="bg-[#0f2a4a]/5 border border-[#0f2a4a]/10 rounded-xl p-5">
              <h3 className="text-[#0f2a4a] font-semibold mb-3">What&apos;s Included</h3>
              <ul className="space-y-2">
                {[
                  "Full diagnostics and assessment",
                  "Labour and standard parts",
                  "Post-service quality check",
                  "12-month workmanship guarantee",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-[#f97316] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price + CTA */}
            <div className="flex flex-col small:flex-row items-start small:items-center justify-between gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-400 mb-1">Starting from</p>
                <p className="text-[#0f2a4a] font-bold text-4xl">{formatPrice(service.price)}</p>
                <p className="text-xs text-gray-400 mt-1">Final price confirmed at booking</p>
              </div>
              <div className="flex flex-col gap-2 w-full small:w-auto">
                <LocalizedClientLink
                  href={`/services/${service.slug}/book`}
                  className="w-full small:w-auto flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200 text-base"
                >
                  Book This Service
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </LocalizedClientLink>
                <a
                  href="tel:08001234567"
                  className="w-full small:w-auto flex items-center justify-center gap-2 border border-[#0f2a4a] text-[#0f2a4a] hover:bg-[#0f2a4a] hover:text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call 0800 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-[#0f2a4a] text-2xl font-bold mb-6">Related Services</h2>
            <div className="grid grid-cols-1 small:grid-cols-2 large:grid-cols-3 gap-6">
              {related.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
