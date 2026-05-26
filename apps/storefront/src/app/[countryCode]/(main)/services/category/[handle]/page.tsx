import { Metadata } from "next"
import { notFound } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ServiceCard from "@modules/services/components/service-card"
import { getCategoryByHandle, hvacCategories } from "@lib/mock/hvac-data"

type Props = {
  params: Promise<{ handle: string; countryCode: string }>
}

export async function generateStaticParams() {
  return hvacCategories.map((c) => ({ handle: c.handle }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const category = getCategoryByHandle(handle)
  if (!category) return {}
  return {
    title: `${category.title} | HVAC Services`,
    description: category.description,
  }
}

const categoryColors: Record<string, { gradient: string; accent: string; light: string }> = {
  "air-conditioning-services":    { gradient: "from-blue-900 to-[#0f2a4a]",   accent: "text-blue-300",   light: "bg-blue-50 text-blue-700" },
  "heating-services":             { gradient: "from-orange-900 to-[#0f2a4a]", accent: "text-orange-300", light: "bg-orange-50 text-orange-700" },
  "indoor-air-quality":           { gradient: "from-teal-900 to-[#0f2a4a]",   accent: "text-teal-300",   light: "bg-teal-50 text-teal-700" },
  "commercial-hvac":              { gradient: "from-purple-900 to-[#0f2a4a]", accent: "text-purple-300", light: "bg-purple-50 text-purple-700" },
  "emergency-hvac-services":      { gradient: "from-red-900 to-[#0f2a4a]",    accent: "text-red-300",    light: "bg-red-50 text-red-700" },
  "maintenance-membership-plans": { gradient: "from-yellow-900 to-[#0f2a4a]", accent: "text-yellow-300", light: "bg-yellow-50 text-yellow-700" },
}

const categoryPerks: Record<string, string[]> = {
  "air-conditioning-services":    ["All major brands serviced", "Same-day diagnosis available", "10-year warranty on new installs"],
  "heating-services":             ["Gas Safe registered engineers", "Boiler finance options", "Smart thermostat integration"],
  "indoor-air-quality":           ["Free air quality assessment", "HEPA-certified solutions", "Allergen & mould testing"],
  "commercial-hvac":              ["Dedicated account manager", "Planned maintenance contracts", "24/7 commercial support"],
  "emergency-hvac-services":      ["Average 90-min response time", "No call-out charge on weekends", "Fully stocked vans"],
  "maintenance-membership-plans": ["Priority booking guaranteed", "Parts & labour covered", "Annual system health report"],
}

export default async function CategoryPage({ params }: Props) {
  const { handle } = await params
  const category = getCategoryByHandle(handle)
  if (!category) notFound()

  const colors = categoryColors[handle] ?? { gradient: "from-gray-900 to-[#0f2a4a]", accent: "text-gray-300", light: "bg-gray-50 text-gray-700" }
  const perks = categoryPerks[handle] ?? []

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <div className={`bg-gradient-to-br ${colors.gradient} py-16`}>
        <div className="content-container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <LocalizedClientLink href="/" className="hover:text-white transition-colors">Home</LocalizedClientLink>
            <span>/</span>
            <LocalizedClientLink href="/services" className="hover:text-white transition-colors">Services</LocalizedClientLink>
            <span>/</span>
            <span className="text-white">{category.title}</span>
          </nav>

          <div className="flex flex-col large:flex-row items-start large:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${colors.accent}`}>
                {category.services.length} Services Available
              </p>
              <h1 className="text-white text-4xl small:text-5xl font-bold mb-4 leading-tight">
                {category.title}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                {category.description} — carried out by qualified engineers with a 12-month workmanship guarantee on every job.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                {perks.map((perk) => (
                  <span key={perk} className="flex items-center gap-1.5 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {perk}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick CTA */}
            <div className="flex-shrink-0 bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 flex flex-col gap-4 min-w-[240px]">
              <p className="text-white font-semibold">Need help choosing?</p>
              <p className="text-gray-300 text-sm">Our engineers can advise you on the right service for your situation.</p>
              <a
                href="tel:08001234567"
                className="flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0800 123 4567
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Services grid */}
      <div className="content-container py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#0f2a4a] text-2xl font-bold">
            All {category.title}
          </h2>
          <LocalizedClientLink
            href="/services"
            className="text-sm text-gray-400 hover:text-[#f97316] transition-colors flex items-center gap-1"
          >
            ← All categories
          </LocalizedClientLink>
        </div>

        <div className="grid grid-cols-1 small:grid-cols-2 large:grid-cols-3 gap-6">
          {category.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Other categories strip */}
      <div className="bg-gray-50 border-t border-gray-100 py-10">
        <div className="content-container">
          <p className="text-[#0f2a4a] font-semibold mb-5">Explore Other Categories</p>
          <div className="flex flex-wrap gap-3">
            {hvacCategories
              .filter((c) => c.handle !== handle)
              .map((c) => (
                <LocalizedClientLink
                  key={c.id}
                  href={`/services/category/${c.handle}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-[#0f2a4a] font-medium hover:border-[#f97316] hover:text-[#f97316] transition-colors duration-150"
                >
                  {c.title}
                </LocalizedClientLink>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
