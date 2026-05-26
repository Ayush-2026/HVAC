import FadeIn from "@modules/common/components/fade-in"

const reviews = [
  {
    name: "James Thornton",
    role: "Gas Safe Engineer, Manchester",
    body: "I've been using HVAC Store for my trade orders for over two years. Prices are competitive, delivery is always on time, and the technical team actually know what they're talking about.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "Homeowner, Bristol",
    body: "Ordered a replacement thermostat and it arrived next day. The chat support helped me confirm I was ordering the right part. Couldn't ask for better service.",
    rating: 5,
  },
  {
    name: "David Okonkwo",
    role: "Facilities Manager, London",
    body: "We manage several commercial properties and HVAC Store is our go-to supplier. The trade account is excellent — great pricing and dedicated support.",
    rating: 5,
  },
  {
    name: "Lisa Patel",
    role: "DIY Enthusiast, Leeds",
    body: "As someone who doesn't know a lot about HVAC, the team walked me through exactly what I needed for my conservatory. Product arrived well packaged and works perfectly.",
    rating: 4,
  },
]

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < count ? "text-amber-400" : "text-gray-200"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#faf8f5]">
      <div className="content-container">
        <FadeIn className="text-center mb-14">
          <p className="text-shimmer text-sm font-semibold uppercase tracking-widest mb-3 inline-block">
            Customer Reviews
          </p>
          <h2 className="text-[#0f2a4a] text-3xl small:text-4xl font-bold mb-4">
            Trusted by Thousands Across the UK
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Don&apos;t just take our word for it — here&apos;s what our customers say.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 small:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <FadeIn key={r.name} delay={i * 100}>
              <div className="card-lift bg-white border border-gray-100 rounded-2xl p-7 flex flex-col gap-4 relative overflow-hidden hover:border-[#f97316]/20">
                {/* Decorative quote mark */}
                <div className="absolute top-4 right-5 text-[80px] leading-none font-serif text-[#f97316]/8 select-none pointer-events-none">
                  &ldquo;
                </div>

                <Stars count={r.rating} />

                <p className="text-gray-700 leading-relaxed text-sm relative z-10">
                  &ldquo;{r.body}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  {/* Avatar initial */}
                  <div className="w-9 h-9 rounded-full bg-[#0f2a4a] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">{r.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-[#0f2a4a] font-semibold text-sm leading-none mb-0.5">{r.name}</p>
                    <p className="text-gray-400 text-xs">{r.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 text-center" delay={200}>
          <div className="inline-flex items-center gap-3 bg-white border border-gray-100 rounded-full px-6 py-3 shadow-sm">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 text-sm">
              Rated <span className="font-bold text-[#0f2a4a]">4.9 / 5</span> from over{" "}
              <span className="font-bold text-[#0f2a4a]">3,200 reviews</span> on Trustpilot
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default Testimonials
