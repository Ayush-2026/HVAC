"use client"

import { useState } from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { type HvacService, type HvacCategory, formatPrice } from "@lib/mock/hvac-data"

type Pricing = { callOutCharge: number; subtotal: number; vat: number; total: number }
type Props = { service: HvacService; category: HvacCategory | null; pricing: Pricing }

function formatCardNumber(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim()
}

function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4)
  return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d
}

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-[#0f2a4a] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316]"

function PayField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}

function SummaryRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${muted ? "text-gray-400" : "text-gray-600"}`}>{label}</span>
      <span className={`text-sm ${muted ? "text-gray-400" : "text-gray-800 font-medium"}`}>{value}</span>
    </div>
  )
}

export default function PaymentForm({ service, category, pricing }: Props) {
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" })
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)
  const [bookingRef] = useState(`HV-${Math.floor(100000 + Math.random() * 900000)}`)

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault()
    setPaying(true)
    setTimeout(() => { setPaying(false); setPaid(true) }, 2200)
  }

  /* ── Success State ── */
  if (paid) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-[#0f2a4a] text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 text-sm mb-6">
            Thank you for booking with HVAC Services. A confirmation email is on its way to you.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Booking Reference</p>
            <p className="text-[#0f2a4a] font-bold text-xl font-mono tracking-wide">{bookingRef}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-2 justify-center">
              <svg className="w-4 h-4 text-[#f97316] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Confirmation sent to your email
            </div>
            <div className="flex items-center gap-2 justify-center">
              <svg className="w-4 h-4 text-[#f97316] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Engineer will call 24hrs before arrival
            </div>
          </div>
          <LocalizedClientLink
            href="/services"
            className="inline-flex items-center gap-2 bg-[#0f2a4a] hover:bg-[#f97316] text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 text-sm"
          >
            Browse More Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </LocalizedClientLink>
        </div>
      </div>
    )
  }

  /* ── Payment Form ── */
  return (
    <div className="bg-[#f8f9fb] min-h-screen">
      {/* Secure header */}
      <div className="bg-[#0f2a4a] border-b border-[#1e3f6f] py-4">
        <div className="content-container flex items-center justify-between">
          <LocalizedClientLink href="/" className="text-white font-bold text-lg tracking-wide hover:text-[#f97316] transition-colors">
            HVAC
          </LocalizedClientLink>
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure Payment
          </div>
        </div>
      </div>

      <div className="content-container py-10">
        <div className="grid grid-cols-1 large:grid-cols-[1fr_360px] gap-8 items-start">

          {/* ── Left: Card Form ── */}
          <div>
            <h1 className="text-[#0f2a4a] text-2xl font-bold mb-1">Secure Checkout</h1>
            <p className="text-gray-500 text-sm mb-6">Your payment is protected by 256-bit SSL encryption.</p>

            <form onSubmit={handlePay}>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

                {/* Card brand icons */}
                <div className="flex items-center gap-2 mb-6 pb-5 border-b border-gray-100">
                  <span className="text-xs text-gray-400 font-medium mr-1">We accept:</span>
                  {/* Visa */}
                  <div className="h-7 w-12 rounded border border-gray-200 bg-white flex items-center justify-center px-1.5">
                    <svg viewBox="0 0 48 16" className="h-4 w-auto" fill="none">
                      <text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#1A1F71">VISA</text>
                    </svg>
                  </div>
                  {/* Mastercard */}
                  <div className="h-7 w-12 rounded border border-gray-200 bg-white flex items-center justify-center gap-0.5">
                    <div className="w-4 h-4 rounded-full bg-[#EB001B]" />
                    <div className="w-4 h-4 rounded-full bg-[#F79E1B] -ml-1.5 opacity-90" />
                  </div>
                  {/* Amex */}
                  <div className="h-7 w-12 rounded border border-gray-200 bg-[#2E77BC] flex items-center justify-center">
                    <span className="text-white text-[8px] font-black tracking-tight">AMEX</span>
                  </div>
                  {/* Maestro */}
                  <div className="h-7 w-12 rounded border border-gray-200 bg-white flex items-center justify-center">
                    <span className="text-[#009BE1] text-[8px] font-black tracking-tight">maestro</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <PayField label="Name on Card">
                    <input
                      type="text"
                      required
                      value={card.name}
                      onChange={e => setCard(p => ({ ...p, name: e.target.value }))}
                      placeholder="John Smith"
                      className={inputCls}
                    />
                  </PayField>

                  <PayField label="Card Number">
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        required
                        value={card.number}
                        onChange={e => setCard(p => ({ ...p, number: formatCardNumber(e.target.value) }))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={`${inputCls} pr-10 font-mono tracking-wider`}
                      />
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                  </PayField>

                  <div className="grid grid-cols-2 gap-4">
                    <PayField label="Expiry Date">
                      <input
                        type="text"
                        inputMode="numeric"
                        required
                        value={card.expiry}
                        onChange={e => setCard(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={`${inputCls} font-mono`}
                      />
                    </PayField>
                    <PayField label="Security Code (CVV)">
                      <div className="relative">
                        <input
                          type="password"
                          inputMode="numeric"
                          required
                          value={card.cvv}
                          onChange={e => setCard(p => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                          placeholder="•••"
                          maxLength={4}
                          className={`${inputCls} pr-10 font-mono`}
                        />
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </PayField>
                  </div>
                </div>

                {/* Pay button */}
                <button
                  type="submit"
                  disabled={paying}
                  className="mt-6 w-full bg-[#f97316] hover:bg-[#ea6c0a] disabled:opacity-70 text-white font-bold py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-base"
                >
                  {paying ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Processing payment…
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Pay {formatPrice(pricing.total)}
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-gray-400 mt-3">
                  By completing payment you agree to our{" "}
                  <span className="underline cursor-pointer hover:text-gray-600">Terms of Service</span>
                  {" "}and{" "}
                  <span className="underline cursor-pointer hover:text-gray-600">Privacy Policy</span>
                </p>
              </div>
            </form>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="large:sticky large:top-24">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              {/* Thumbnail */}
              <div className="relative h-32 bg-gray-100">
                <Image src={service.image} alt={service.title} fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a4a]/85 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  {category && <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider mb-0.5">{category.title}</p>}
                  <p className="text-white font-bold text-sm leading-snug">{service.title}</p>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Order Summary</p>
                <div className="flex flex-col gap-2.5">
                  <SummaryRow label="Base service fee" value={formatPrice(service.price)} />
                  <SummaryRow label="Call-out charge" value={formatPrice(pricing.callOutCharge)} />
                  <div className="h-px bg-gray-100 my-0.5" />
                  <SummaryRow label="Subtotal" value={formatPrice(pricing.subtotal)} />
                  <SummaryRow label="VAT (20%)" value={`+ ${formatPrice(pricing.vat)}`} muted />
                  <div className="h-px bg-gray-200 my-1" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0f2a4a]">Total</span>
                    <span className="font-extrabold text-[#0f2a4a] text-xl">{formatPrice(pricing.total)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                  {[
                    "12-month workmanship guarantee",
                    "Price locked — no hidden fees",
                    "Free cancellation up to 24hrs",
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Back link */}
            <LocalizedClientLink
              href={`/services/${service.slug}/book`}
              className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#0f2a4a] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to booking details
            </LocalizedClientLink>
          </div>

        </div>
      </div>
    </div>
  )
}
