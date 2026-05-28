import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { type HvacService, formatPrice } from "@lib/mock/hvac-data"

type Props = {
  service: HvacService
}

/* Map first tag to a top-accent colour */
const tagAccent: Record<string, string> = {
  Cooling:     "bg-sky-500",
  Heating:     "bg-orange-500",
  "Air Quality": "bg-emerald-500",
  Commercial:  "bg-violet-600",
  Emergency:   "bg-red-500",
  Membership:  "bg-amber-500",
  "Mini Split": "bg-sky-500",
  Humidity:    "bg-teal-500",
}

const ServiceCard = ({ service }: Props) => {
  const accentClass = tagAccent[service.tags[0]] ?? "bg-[#f97316]"

  return (
    <div className="card-lift group bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col shadow-sm hover:border-[#0f2a4a] hover:shadow-lg transition-all duration-300">

      {/* Coloured top accent stripe */}
      <div className={`h-1 w-full ${accentClass} flex-shrink-0`} />

      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Duration badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-[#0f2a4a] text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          <svg className="w-3 h-3 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {service.duration}
        </div>

        {/* Emergency badge */}
        {service.tags.includes("Emergency") && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
            24/7
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {service.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-[#0f2a4a] font-bold text-lg leading-snug group-hover:text-[#f97316] transition-colors duration-200">
          {service.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed flex-1">
          {service.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-100 mt-1" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5 font-medium">Starting from</p>
            <p className="text-[#0f2a4a] font-extrabold text-2xl leading-none">{formatPrice(service.price)}</p>
          </div>
          <LocalizedClientLink
            href={`/services/${service.slug}`}
            className="flex items-center gap-1.5 bg-[#0f2a4a] hover:bg-[#f97316] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 group/btn shadow-sm"
          >
            View Details
            <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
