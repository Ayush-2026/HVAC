const ContactBanner = () => {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="content-container">
        <div className="flex flex-col large:flex-row items-center justify-between gap-8">
          <div className="text-center large:text-left">
            <h3 className="text-[#0f2a4a] text-2xl font-bold mb-2">
              Need help choosing the right product?
            </h3>
            <p className="text-gray-500 text-sm">
              Our technical specialists are available Mon–Sat, 8am–6pm to advise you.
            </p>
          </div>

          <div className="flex flex-col small:flex-row gap-4 flex-shrink-0">
            <a
              href="tel:08001234567"
              className="flex items-center gap-3 bg-[#0f2a4a] hover:bg-[#1e3f6f] text-white font-semibold px-6 py-3 rounded transition-colors duration-200 text-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0800 123 4567
            </a>
            <a
              href="mailto:support@hvacstore.co.uk"
              className="flex items-center gap-3 border border-[#0f2a4a] text-[#0f2a4a] hover:bg-[#0f2a4a] hover:text-white font-semibold px-6 py-3 rounded transition-colors duration-200 text-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactBanner
