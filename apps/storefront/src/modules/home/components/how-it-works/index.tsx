import LocalizedClientLink from "@modules/common/components/localized-client-link"
import FadeIn from "@modules/common/components/fade-in"

const steps = [
  {
    step: "01",
    title: "Browse & Book",
    description: "Search 22+ HVAC services across 6 categories. Filter by type or urgency and select exactly what you need.",
  },
  {
    step: "02",
    title: "Confirm Your Slot",
    description: "Pick a date and time that suits you — online 24/7 or call our team. Same-day slots available for emergencies.",
  },
  {
    step: "03",
    title: "Engineer Arrives",
    description: "A qualified, vetted engineer shows up on time with a fully stocked van. No surprise fees.",
  },
  {
    step: "04",
    title: "Job Done, Guaranteed",
    description: "Every job comes with a 12-month workmanship guarantee. Any issues — we come back, no questions asked.",
  },
]

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle dot background */}
      <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />

      <div className="content-container relative z-10">
        <FadeIn className="text-center mb-16">
          <p className="text-shimmer text-sm font-semibold uppercase tracking-widest mb-3 inline-block">
            Simple Process
          </p>
          <h2 className="text-[#0f2a4a] text-3xl small:text-4xl font-bold mb-4">
            From Booking to Done in 4 Steps
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            No jargon, no waiting around. We make getting your HVAC sorted as easy as possible.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 small:grid-cols-2 large:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <FadeIn key={s.step} delay={i * 120}>
              <div className="relative flex flex-col items-center text-center">
                {/* Connector line (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="hidden large:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px border-t border-dashed border-[#f97316]/30 z-0" />
                )}

                {/* Step circle */}
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#0f2a4a] flex items-center justify-center mb-5 shadow-lg shadow-[#0f2a4a]/20">
                  <span className="text-[#f97316] font-bold text-base">{s.step}</span>
                </div>

                <h3 className="text-[#0f2a4a] font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-14" delay={300}>
          <LocalizedClientLink
            href="/services"
            className="inline-flex items-center gap-2 bg-[#0f2a4a] hover:bg-[#f97316] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#f97316]/25 hover:-translate-y-0.5"
          >
            Browse All Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </LocalizedClientLink>
        </FadeIn>
      </div>
    </section>
  )
}

export default HowItWorks
