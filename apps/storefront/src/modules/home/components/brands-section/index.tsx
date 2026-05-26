"use client"

import Image from "next/image"
import { useState } from "react"

const brands = [
  { name: "Daikin",              domain: "daikin.com" },
  { name: "Mitsubishi Electric", domain: "mitsubishielectric.com" },
  { name: "Honeywell",           domain: "honeywell.com" },
  { name: "Vaillant",            domain: "vaillant.com" },
  { name: "Worcester Bosch",     domain: "worcester-bosch.co.uk" },
  { name: "Panasonic",           domain: "panasonic.com" },
  { name: "LG",                  domain: "lg.com" },
  { name: "Samsung",             domain: "samsung.com" },
]

const BrandLogo = ({ name, domain }: { name: string; domain: string }) => {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="flex items-center justify-center px-6 py-4 bg-white border border-gray-200 rounded-xl hover:border-[#f97316] hover:shadow-sm transition-all duration-200 min-w-[140px] h-[72px]">
      {!imgError ? (
        <Image
          src={`https://logo.clearbit.com/${domain}`}
          alt={`${name} logo`}
          width={100}
          height={40}
          className="object-contain max-h-10 w-auto"
          onError={() => setImgError(true)}
          unoptimized
        />
      ) : (
        <span className="text-[#0f2a4a] font-semibold text-sm">{name}</span>
      )}
    </div>
  )
}

const BrandsSection = () => {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="content-container">
        <p className="text-center text-gray-400 text-sm font-medium uppercase tracking-widest mb-8">
          Authorised Stockist of Leading Brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {brands.map((brand) => (
            <BrandLogo key={brand.name} name={brand.name} domain={brand.domain} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandsSection
