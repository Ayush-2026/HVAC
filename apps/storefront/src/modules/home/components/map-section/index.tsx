const GOOGLE_MAPS_LINK = "https://www.google.com/maps/search/HVAC+suppliers+UK"

const MapSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="content-container">
        <div className="text-center mb-10">
          <p className="text-[#f97316] text-sm font-semibold uppercase tracking-widest mb-2">
            Find Us
          </p>
          <h2 className="text-[#0f2a4a] text-3xl small:text-4xl font-bold mb-4">
            Visit Our Showroom
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Come and see our full range in person. Our team is on hand to advise you Monday–Saturday, 8am–6pm.
          </p>
        </div>

        <div className="flex flex-col large:flex-row gap-8 items-stretch">
          {/* Contact details card */}
          <div className="large:w-72 flex-shrink-0 bg-[#0f2a4a] text-white rounded-2xl p-8 flex flex-col gap-6">
            <div>
              <p className="text-[#f97316] text-xs font-semibold uppercase tracking-widest mb-3">Address</p>
              <p className="text-sm leading-relaxed text-gray-300">
                HVAC Store Ltd<br />
                14 Trade Park Way<br />
                Birmingham<br />
                B12 0QT<br />
                United Kingdom
              </p>
            </div>

            <div>
              <p className="text-[#f97316] text-xs font-semibold uppercase tracking-widest mb-3">Opening Hours</p>
              <div className="text-sm text-gray-300 space-y-1">
                <div className="flex justify-between gap-4">
                  <span>Mon – Fri</span>
                  <span>8:00am – 6:00pm</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Saturday</span>
                  <span>9:00am – 4:00pm</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[#f97316] text-xs font-semibold uppercase tracking-widest mb-3">Phone</p>
              <a href="tel:08001234567" className="text-sm text-gray-300 hover:text-white transition-colors">
                0800 123 4567
              </a>
            </div>

            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center gap-2 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold px-4 py-3 rounded-lg transition-colors duration-200 text-sm justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Get Directions
            </a>
          </div>

          {/* Clickable map */}
          <a
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-1 min-h-[380px] rounded-2xl overflow-hidden border border-gray-200 block"
            aria-label="Open location in Google Maps"
          >
            <iframe
              title="HVAC Store location"
              className="w-full h-full min-h-[380px] pointer-events-none"
              src="https://maps.google.com/maps?q=Birmingham,UK&output=embed&z=13"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Click overlay */}
            <div className="absolute inset-0 bg-[#0f2a4a]/0 group-hover:bg-[#0f2a4a]/10 transition-colors duration-200 flex items-end justify-end p-4">
              <span className="bg-white text-[#0f2a4a] font-semibold text-sm px-4 py-2 rounded-lg shadow-md flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                <svg className="w-4 h-4 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open in Google Maps
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default MapSection
