const brands = [
  { name: "Daikin",              abbr: "DAI",  color: "#003087" },
  { name: "Mitsubishi Electric", abbr: "ME",   color: "#e60012" },
  { name: "Honeywell",           abbr: "HW",   color: "#fc4c02" },
  { name: "Vaillant",            abbr: "VAI",  color: "#006400" },
  { name: "Worcester Bosch",     abbr: "WB",   color: "#003087" },
  { name: "Panasonic",           abbr: "PAN",  color: "#0044a0" },
  { name: "LG",                  abbr: "LG",   color: "#a50034" },
  { name: "Samsung",             abbr: "SAM",  color: "#1428a0" },
]

const BrandsSection = () => {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="content-container">
        <p className="text-center text-gray-400 text-sm font-medium uppercase tracking-widest mb-8">
          Authorised Stockist of Leading Brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-3">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all duration-200 min-w-[148px]"
            >
              {/* Brand initial badge */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-black tracking-tight flex-shrink-0"
                style={{ backgroundColor: brand.color }}
              >
                {brand.abbr}
              </div>
              <span className="text-[#0f2a4a] font-semibold text-sm leading-tight">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandsSection
