import FadeIn from "@modules/common/components/fade-in"

const stats = [
  { value: "12,000+", label: "Services Available",   icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { value: "98%",     label: "Customer Satisfaction", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
  { value: "15+",     label: "Years of Experience",   icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { value: "50,000+", label: "Jobs Completed",        icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
]

const StatsSection = () => {
  return (
    <section className="bg-[#0f2a4a] border-b border-[#1e3f6f] py-12">
      <div className="content-container">
        <div className="grid grid-cols-2 large:grid-cols-4">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 100}>
              <div className={`flex flex-col items-center text-center py-6 px-4 ${i < stats.length - 1 ? "large:border-r large:border-white/10" : ""} ${i % 2 === 0 && i < stats.length - 1 ? "border-r border-white/10 large:border-r-0" : ""}`}>
                <div className="w-10 h-10 rounded-xl bg-[#f97316]/15 border border-[#f97316]/20 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} />
                  </svg>
                </div>
                <p className="text-white text-3xl font-bold tracking-tight mb-1">{s.value}</p>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
