import LocalizedClientLink from "@modules/common/components/localized-client-link"
import FadeIn from "@modules/common/components/fade-in"
import { hvacCategories } from "@lib/mock/hvac-data"

const categoryMeta: Record<string, {
  color: string
  lightBg: string
  border: string
  shadow: string
  tag: string
  icon: React.ReactNode
}> = {
  "air-conditioning-services": {
    color:   "text-sky-600",
    lightBg: "bg-sky-500",
    border:  "border-sky-500",
    shadow:  "hover:shadow-sky-100",
    tag:     "Cooling",
    icon: (
      /* Snowflake — 6-arm with V-branch tips */
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="12" y1="2"    x2="12" y2="22"/>
        <line x1="2"  y1="12"   x2="22" y2="12"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
        <line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/>
        <polyline points="10,5.5 12,2 14,5.5"/>
        <polyline points="10,18.5 12,22 14,18.5"/>
        <polyline points="5.5,10 2,12 5.5,14"/>
        <polyline points="18.5,10 22,12 18.5,14"/>
      </svg>
    ),
  },
  "heating-services": {
    color:   "text-orange-600",
    lightBg: "bg-orange-500",
    border:  "border-orange-500",
    shadow:  "hover:shadow-orange-100",
    tag:     "Heating",
    icon: (
      /* Thermometer with rising mercury + heat waves */
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
        <line x1="12" y1="13" x2="12" y2="8"/>
        <path d="M17.5 5.5c0-1 .8-1 .8-2s-.8-1-.8-2"/>
        <path d="M19.5 5.5c0-1 .8-1 .8-2s-.8-1-.8-2"/>
      </svg>
    ),
  },
  "indoor-air-quality": {
    color:   "text-emerald-600",
    lightBg: "bg-emerald-500",
    border:  "border-emerald-500",
    shadow:  "hover:shadow-emerald-100",
    tag:     "Air Quality",
    icon: (
      /* Wind — three curved sweep lines (Lucide wind) */
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
        <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
        <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
      </svg>
    ),
  },
  "commercial-hvac": {
    color:   "text-violet-600",
    lightBg: "bg-violet-600",
    border:  "border-violet-600",
    shadow:  "hover:shadow-violet-100",
    tag:     "Commercial",
    icon: (
      /* Rooftop RTU unit — box with central fan circle and side vents */
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="12" rx="2"/>
        <circle cx="12" cy="13" r="3"/>
        <line x1="12" y1="10" x2="12" y2="8.5"/>
        <line x1="12" y1="16" x2="12" y2="17.5"/>
        <line x1="9"  y1="13" x2="7.5" y2="13"/>
        <line x1="15" y1="13" x2="16.5" y2="13"/>
        <line x1="2" y1="7" x2="22" y2="7"/>
        <line x1="6" y1="4" x2="6" y2="7"/>
        <line x1="12" y1="4" x2="12" y2="7"/>
        <line x1="18" y1="4" x2="18" y2="7"/>
      </svg>
    ),
  },
  "emergency-hvac-services": {
    color:   "text-red-600",
    lightBg: "bg-red-500",
    border:  "border-red-500",
    shadow:  "hover:shadow-red-100",
    tag:     "24/7",
    icon: (
      /* Lightning bolt / Zap — universal symbol for speed & urgency */
      <svg className="w-7 h-7 text-white" fill="currentColor" stroke="none" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  "maintenance-membership-plans": {
    color:   "text-amber-600",
    lightBg: "bg-amber-500",
    border:  "border-amber-500",
    shadow:  "hover:shadow-amber-100",
    tag:     "Plans",
    icon: (
      /* Crown — premium membership symbol */
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M2 5l4 7 6-9 6 9 4-7-2 12H4L2 5z"/>
        <line x1="4.5" y1="20" x2="19.5" y2="20"/>
        <circle cx="12" cy="3" r="1" fill="currentColor" stroke="none"/>
        <circle cx="2"  cy="5" r="1" fill="currentColor" stroke="none"/>
        <circle cx="22" cy="5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
}

const nums = ["01","02","03","04","05","06"]

const CategoriesSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="content-container">

        {/* ── Header ── */}
        <FadeIn className="max-w-2xl mb-16">
          <span className="inline-flex items-center bg-[#f97316]/10 border border-[#f97316]/20 text-[#f97316] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            Browse by Category
          </span>
          <h2 className="text-[#0f2a4a] text-4xl small:text-5xl font-bold leading-tight mb-4">
            Every Service You Need —<br />
            <span className="text-shimmer">One Trusted Team.</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Whether it&apos;s an emergency callout at midnight or a full commercial install — we&apos;ve got the right specialists for the job.
          </p>
        </FadeIn>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 small:grid-cols-2 large:grid-cols-3 gap-4">
          {hvacCategories.map((cat, i) => {
            const meta = categoryMeta[cat.handle]
            return (
              <FadeIn key={cat.id} delay={i * 60}>
                <LocalizedClientLink
                  href={`/services/category/${cat.handle}`}
                  className={`group relative flex flex-col bg-white hover:bg-[#0f2a4a] transition-colors duration-300 p-7 overflow-hidden h-full rounded-2xl border border-gray-200 hover:border-[#0f2a4a] ${meta.shadow} hover:shadow-xl`}
                >
                  {/* Faded number watermark */}
                  <span className="absolute -right-2 -bottom-4 text-[96px] font-black leading-none text-gray-100 group-hover:text-white/5 transition-colors duration-300 select-none pointer-events-none">
                    {nums[i]}
                  </span>

                  {/* Top row: icon + tag */}
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl ${meta.lightBg} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      {meta.icon}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${meta.border} ${meta.color} bg-transparent group-hover:bg-white/10 group-hover:border-white/20 group-hover:text-white transition-colors duration-300`}>
                      {meta.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col flex-1">
                    <h3 className="text-[#0f2a4a] group-hover:text-white font-bold text-xl mb-2 transition-colors duration-300 leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-gray-500 group-hover:text-gray-300 text-sm leading-relaxed mb-5 flex-1 transition-colors duration-300">
                      {cat.description}
                    </p>

                    {/* Footer row */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-400 transition-colors">
                        {cat.services.length} services
                      </span>
                      <div className={`flex items-center gap-1 text-sm font-semibold ${meta.color} group-hover:text-white transition-colors duration-300`}>
                        Explore
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${meta.lightBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </LocalizedClientLink>
              </FadeIn>
            )
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <FadeIn className="mt-10 flex items-center justify-between flex-wrap gap-4" delay={200}>
          <p className="text-gray-400 text-sm">
            Not sure which service you need?{" "}
            <a href="tel:08001234567" className="text-[#f97316] font-semibold hover:underline">
              Call us free on 0800 123 4567
            </a>
          </p>
          <LocalizedClientLink
            href="/services"
            className="flex items-center gap-2 text-[#0f2a4a] border border-gray-200 hover:border-[#0f2a4a] hover:bg-[#0f2a4a] hover:text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
          >
            View All Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </LocalizedClientLink>
        </FadeIn>

      </div>
    </section>
  )
}

export default CategoriesSection
