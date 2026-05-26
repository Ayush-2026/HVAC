const features = [
  {
    title: "UK-Wide Fast Delivery",
    description:
      "Next-day and 48-hour delivery available on most items. Free delivery on orders over £50.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8l-2 7a2 2 0 002 2h14a2 2 0 002-2L19 8M10 12a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2z" />
      </svg>
    ),
  },
  {
    title: "Expert Technical Support",
    description:
      "Our HVAC specialists are available Mon–Sat to help you choose the right product and troubleshoot any issues.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Trusted Manufacturers",
    description:
      "We stock only products from leading HVAC brands — all with full manufacturer warranties.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Easy Returns",
    description:
      "Changed your mind? No problem. Hassle-free 30-day returns on unused items in original packaging.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 2 2 2-2 2 2 2-2 4 2z" />
      </svg>
    ),
  },
  {
    title: "Competitive Trade Pricing",
    description:
      "Special trade accounts available with discounted pricing, credit terms, and dedicated account managers.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Secure Online Checkout",
    description:
      "Shop with confidence. SSL-encrypted checkout with multiple payment options including Pay Later.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
]

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-[#0f2a4a]">
      <div className="content-container">
        <div className="text-center mb-12">
          <p className="text-[#f97316] text-sm font-semibold uppercase tracking-widest mb-2">
            Why Choose HVAC Store
          </p>
          <h2 className="text-white text-3xl small:text-4xl font-bold mb-4">
            Why Thousands of UK Customers Choose Us
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            We don&apos;t just fix HVAC systems — we earn your trust on every callout, every install, every time.
          </p>
        </div>

        <div className="grid grid-cols-1 small:grid-cols-2 large:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center text-[#f97316]">
                {f.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
