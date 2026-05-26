import LocalizedClientLink from "@modules/common/components/localized-client-link"
import FadeIn from "@modules/common/components/fade-in"
import { hvacCategories } from "@lib/mock/hvac-data"

const categoryIcons: Record<string, React.ReactNode> = {
  "air-conditioning-services": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  "heating-services": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    </svg>
  ),
  "indoor-air-quality": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  "commercial-hvac": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  "emergency-hvac-services": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  "maintenance-membership-plans": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
}

const categoryColors: Record<string, { icon: string; ring: string }> = {
  "air-conditioning-services":    { icon: "text-sky-600",    ring: "bg-sky-50    border-sky-100"    },
  "heating-services":             { icon: "text-orange-600", ring: "bg-orange-50 border-orange-100" },
  "indoor-air-quality":           { icon: "text-teal-600",   ring: "bg-teal-50   border-teal-100"   },
  "commercial-hvac":              { icon: "text-violet-600", ring: "bg-violet-50 border-violet-100" },
  "emergency-hvac-services":      { icon: "text-red-600",    ring: "bg-red-50    border-red-100"    },
  "maintenance-membership-plans": { icon: "text-amber-600",  ring: "bg-amber-50  border-amber-100"  },
}

const CategoriesSection = () => {
  return (
    <section className="py-20 bg-[#faf8f5]">
      <div className="content-container">
        <FadeIn className="text-center mb-14">
          <p className="text-shimmer text-sm font-semibold uppercase tracking-widest mb-3 inline-block">
            Browse by Category
          </p>
          <h2 className="text-[#0f2a4a] text-3xl small:text-4xl font-bold mb-4">
            Every Service You Need — One Trusted Team
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Whether it&apos;s an emergency callout at midnight or a full commercial install — we&apos;ve got the right team for the job.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 small:grid-cols-2 large:grid-cols-3 gap-5">
          {hvacCategories.map((cat, i) => {
            const icon = categoryIcons[cat.handle]
            const colors = categoryColors[cat.handle] ?? { icon: "text-gray-600", ring: "bg-gray-50 border-gray-100" }
            return (
              <FadeIn key={cat.id} delay={i * 80}>
                <LocalizedClientLink
                  href={`/services/category/${cat.handle}`}
                  className="card-lift group flex gap-4 items-start p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#f97316]/30"
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center ${colors.ring} ${colors.icon} transition-transform duration-300 group-hover:scale-110`}>
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[#0f2a4a] font-semibold text-base mb-1 group-hover:text-[#f97316] transition-colors duration-200 leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-2">{cat.description}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      {cat.services.length} services →
                    </p>
                  </div>
                </LocalizedClientLink>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection
