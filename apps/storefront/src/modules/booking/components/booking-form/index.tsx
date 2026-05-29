"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { type HvacService, type HvacCategory, formatPrice } from "@lib/mock/hvac-data"

type Pricing = {
  callOutCharge: number
  subtotal: number
  vat: number
  total: number
}

type Props = {
  service: HvacService
  category: HvacCategory | null
  countryCode: string
  pricing: Pricing
}

const TIME_SLOTS = [
  "Morning (8am – 12pm)",
  "Afternoon (12pm – 5pm)",
  "Evening (5pm – 8pm)",
  "Flexible / Any time",
]

const base = "w-full px-3.5 py-2.5 rounded-xl border text-[#0f2a4a] text-sm transition-colors focus:outline-none focus:ring-2"
const normal = `${base} border-gray-200 bg-gray-50 focus:bg-white focus:ring-[#f97316]/30 focus:border-[#f97316]`
const errored = `${base} border-red-400 bg-red-50 focus:ring-red-300 focus:border-red-400`
const inputCls = (err?: string) => err ? errored : normal

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  )
}

function SectionHeader({ num, title }: { num: number; title: string }) {
  return (
    <h2 className="text-[#0f2a4a] font-bold text-base mb-5 flex items-center gap-2.5">
      <span className="w-6 h-6 rounded-full bg-[#f97316] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
        {num}
      </span>
      {title}
    </h2>
  )
}

function PriceLine({ label, value, muted, bold }: { label: string; value: string; muted?: boolean; bold?: boolean }) {
  if (bold) {
    return (
      <div className="flex items-center justify-between">
        <span className="font-bold text-[#0f2a4a] text-base">{label}</span>
        <span className="font-extrabold text-[#0f2a4a] text-xl">{value}</span>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${muted ? "text-gray-400" : "text-gray-600"}`}>{label}</span>
      <span className={`text-sm ${muted ? "text-gray-400" : "text-gray-800 font-medium"}`}>{value}</span>
    </div>
  )
}

export default function BookingForm({ service, category, countryCode, pricing }: Props) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address1: "", address2: "", city: "", postcode: "",
    date: "", timeSlot: "", notes: "",
  })

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n })
  }

  const validate = () => {
    const required: (keyof typeof form)[] = [
      "firstName", "lastName", "email", "phone",
      "address1", "city", "postcode", "date", "timeSlot",
    ]
    const next: Record<string, string> = {}
    required.forEach(f => { if (!form[f].trim()) next[f] = "Required" })
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address"
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setTimeout(() => router.push(`/${countryCode}/services/${service.slug}/payment`), 400)
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  return (
    <div className="bg-[#f8f9fb] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="content-container py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <LocalizedClientLink href="/" className="hover:text-[#f97316] transition-colors">Home</LocalizedClientLink>
            <span className="text-gray-300">/</span>
            <LocalizedClientLink href="/services" className="hover:text-[#f97316] transition-colors">Services</LocalizedClientLink>
            <span className="text-gray-300">/</span>
            <LocalizedClientLink href={`/services/${service.slug}`} className="hover:text-[#f97316] transition-colors truncate max-w-[180px]">{service.title}</LocalizedClientLink>
            <span className="text-gray-300">/</span>
            <span className="text-[#0f2a4a] font-medium">Book</span>
          </nav>
        </div>
      </div>

      <div className="content-container py-10">
        <div className="mb-8">
          <h1 className="text-[#0f2a4a] text-3xl font-bold mb-1">Book Your Service</h1>
          <p className="text-gray-500 text-sm">Complete your details below — we&apos;ll confirm your slot within 2 hours.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 large:grid-cols-[1fr_380px] gap-8 items-start">

            {/* ── Left: Form Sections ── */}
            <div className="flex flex-col gap-5">

              {/* 1: Your Details */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <SectionHeader num={1} title="Your Details" />
                <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
                  <Field label="First Name" error={errors.firstName}>
                    <input type="text" value={form.firstName} onChange={set("firstName")} placeholder="John" className={inputCls(errors.firstName)} />
                  </Field>
                  <Field label="Last Name" error={errors.lastName}>
                    <input type="text" value={form.lastName} onChange={set("lastName")} placeholder="Smith" className={inputCls(errors.lastName)} />
                  </Field>
                  <Field label="Email Address" error={errors.email}>
                    <input type="email" value={form.email} onChange={set("email")} placeholder="john@example.com" className={inputCls(errors.email)} />
                  </Field>
                  <Field label="Phone Number" error={errors.phone}>
                    <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+44 7700 900000" className={inputCls(errors.phone)} />
                  </Field>
                </div>
              </div>

              {/* 2: Service Address */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <SectionHeader num={2} title="Service Address" />
                <div className="flex flex-col gap-4">
                  <Field label="Address Line 1" error={errors.address1}>
                    <input type="text" value={form.address1} onChange={set("address1")} placeholder="123 High Street" className={inputCls(errors.address1)} />
                  </Field>
                  <Field label="Address Line 2 (optional)">
                    <input type="text" value={form.address2} onChange={set("address2")} placeholder="Flat, Suite, Unit…" className={inputCls()} />
                  </Field>
                  <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
                    <Field label="City / Town" error={errors.city}>
                      <input type="text" value={form.city} onChange={set("city")} placeholder="London" className={inputCls(errors.city)} />
                    </Field>
                    <Field label="Postcode" error={errors.postcode}>
                      <input type="text" value={form.postcode} onChange={set("postcode")} placeholder="SW1A 1AA" className={`${inputCls(errors.postcode)} uppercase`} />
                    </Field>
                  </div>
                </div>
              </div>

              {/* 3: Appointment */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <SectionHeader num={3} title="Appointment Preferences" />
                <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
                  <Field label="Preferred Date" error={errors.date}>
                    <input type="date" value={form.date} onChange={set("date")} min={minDate} className={inputCls(errors.date)} />
                  </Field>
                  <Field label="Preferred Time Slot" error={errors.timeSlot}>
                    <select value={form.timeSlot} onChange={set("timeSlot")} className={inputCls(errors.timeSlot)}>
                      <option value="">Select a slot…</option>
                      {TIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="mt-4">
                  <Field label="Special Instructions (optional)">
                    <textarea
                      value={form.notes}
                      onChange={set("notes")}
                      rows={3}
                      placeholder="Access codes, parking info, anything the engineer should know…"
                      className={`${inputCls()} resize-none`}
                    />
                  </Field>
                </div>
              </div>

            </div>

            {/* ── Right: Order Summary (sticky) ── */}
            <div className="large:sticky large:top-24">
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">

                {/* Service thumbnail */}
                <div className="relative h-36 bg-gray-100">
                  <Image src={service.image} alt={service.title} fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a4a]/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    {category && (
                      <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider mb-0.5">{category.title}</p>
                    )}
                    <p className="text-white font-bold text-sm leading-snug">{service.title}</p>
                  </div>
                </div>

                <div className="p-5">
                  {/* Duration */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <svg className="w-3.5 h-3.5 text-[#f97316] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Estimated duration: <strong className="text-[#0f2a4a] ml-0.5">{service.duration}</strong>
                  </div>

                  {/* Price breakdown */}
                  <div className="flex flex-col gap-2.5">
                    <PriceLine label="Base service fee" value={formatPrice(service.price)} />
                    <PriceLine label="Call-out charge" value={formatPrice(pricing.callOutCharge)} />
                    <div className="h-px bg-gray-100 my-0.5" />
                    <PriceLine label="Subtotal" value={formatPrice(pricing.subtotal)} />
                    <PriceLine label="VAT (20%)" value={`+ ${formatPrice(pricing.vat)}`} muted />
                    <div className="h-px bg-gray-200 my-1" />
                    <PriceLine label="Total" value={formatPrice(pricing.total)} bold />
                  </div>

                  {/* Guarantees */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                    {[
                      "12-month workmanship guarantee",
                      "Fully vetted & insured engineers",
                      "Price fixed at booking — no surprises",
                    ].map(item => (
                      <div key={item} className="flex items-center gap-2 text-xs text-gray-500">
                        <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-5 w-full bg-[#f97316] hover:bg-[#ea6c0a] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
                  >
                    {submitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Securing your booking…
                      </>
                    ) : (
                      <>
                        Proceed to Checkout
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-center text-[10px] text-gray-400 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    256-bit SSL encrypted · Secure checkout
                  </p>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
