import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="w-full bg-[#0a1f38] border-b border-[#1e3f6f] overflow-hidden relative">

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#f97316]/8 blur-[100px]" />
        <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-[#1e5799]/20 blur-[80px]" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-[#f97316]/5 blur-[60px]" />
      </div>

      <div className="content-container py-20 small:py-28 flex flex-col large:flex-row items-center gap-12 large:gap-20 relative z-10">

        {/* ── Left: text ── */}
        <div className="flex flex-col gap-5 max-w-2xl large:max-w-xl flex-shrink-0">
          <div className="animate-fade-in">
            <span className="inline-flex items-center bg-[#f97316]/15 border border-[#f97316]/25 text-[#f97316] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
              UK-Based HVAC Specialists
            </span>
          </div>

          <h1 className="text-white text-4xl small:text-5xl font-bold leading-[1.15] animate-fade-in-up animate-delay-100">
            When Comfort Can&apos;t Wait —{" "}
            <span className="text-shimmer">We&apos;re Already There.</span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-xl animate-fade-in-up animate-delay-200">
            From emergency breakdowns to full system installs — professional HVAC services trusted by thousands of UK homes and businesses.
          </p>

          <div className="flex flex-row gap-3 mt-1 animate-fade-in-up animate-delay-300">
            <LocalizedClientLink
              href="/services"
              className="bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm hover:shadow-lg hover:shadow-[#f97316]/25 hover:-translate-y-0.5"
            >
              Explore Services
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/services/category/emergency-hvac-services"
              className="border border-white/20 hover:border-white/50 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm hover:bg-white/5"
            >
              Emergency Call-Out
            </LocalizedClientLink>
          </div>

          <div className="flex flex-col small:flex-row gap-5 pt-5 border-t border-white/10 mt-1 animate-fade-in-up animate-delay-400">
            {[
              { icon: "M5 13l4 4L19 7", label: "Free UK delivery on orders over £50" },
              { icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "Expert technical support" },
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Trusted UK supplier" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#f97316]/15 border border-[#f97316]/25 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <span className="text-gray-400 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: image ── */}
        <div className="relative w-full large:flex-1 flex items-center justify-center animate-fade-in animate-delay-200">
          {/* Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 rounded-full bg-[#f97316]/12 blur-[80px]" />
          </div>

          {/* Floating badge — top left */}
          <div className="absolute top-4 left-2 large:-left-4 z-20 animate-float">
            <div className="bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 leading-none mb-0.5 uppercase tracking-wider">Energy Saving</p>
                <p className="text-sm font-bold text-[#0f2a4a] leading-none">Up to 40% off bills</p>
              </div>
            </div>
          </div>

          {/* Floating badge — bottom right */}
          <div className="absolute bottom-4 right-2 large:-right-4 z-20 animate-float-slow">
            <div className="bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#f97316]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 leading-none mb-0.5 uppercase tracking-wider">Fast Delivery</p>
                <p className="text-sm font-bold text-[#0f2a4a] leading-none">Next working day</p>
              </div>
            </div>
          </div>

          {/* Main image */}
          <div className="relative w-full max-w-lg large:max-w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80"
              alt="Modern HVAC air conditioning unit"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f38]/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-flex items-center gap-2 bg-[#f97316] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                12,000+ services available
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero
