"use client"

import { useState } from "react"

const faqs = [
  {
    q: "Do you offer next-day delivery?",
    a: "Yes — most in-stock items ordered before 3pm Monday–Friday are dispatched for next working day delivery. Delivery charges and timeframes are shown at checkout.",
  },
  {
    q: "Can I open a trade account?",
    a: "Absolutely. Trade accounts are available for Gas Safe engineers, electricians, facilities managers, and contractors. Apply online or call us to get set up with credit terms and trade pricing.",
  },
  {
    q: "Are your products covered by manufacturer warranty?",
    a: "Yes. All products we stock carry the full manufacturer warranty. Warranty periods vary by product — details are listed on each product page.",
  },
  {
    q: "Do you offer technical support?",
    a: "Our in-house HVAC technical team is available Monday–Saturday. You can reach us by phone, email, or live chat for pre-sales advice, installation guidance, and fault diagnosis.",
  },
  {
    q: "What is your returns policy?",
    a: "We offer a 30-day return window on unused items in original packaging. Simply contact us to arrange a return. Faulty items are covered under warranty and can be replaced or refunded.",
  },
  {
    q: "Do you supply to the public as well as trade?",
    a: "Yes — we welcome both trade and retail customers. All prices shown include VAT for retail customers. Trade customers with an account see ex-VAT pricing and discounted rates.",
  },
]

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className="text-[#0f2a4a] font-medium">{q}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-5 text-gray-500 text-sm leading-relaxed">{a}</p>
      )}
    </div>
  )
}

const FAQSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="content-container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#f97316] text-sm font-semibold uppercase tracking-widest mb-2">
            FAQ
          </p>
          <h2 className="text-[#0f2a4a] text-3xl small:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500">
            Can&apos;t find the answer? Call us on{" "}
            <span className="text-[#0f2a4a] font-semibold">0800 123 4567</span> or use live chat.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl px-6 small:px-8">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
