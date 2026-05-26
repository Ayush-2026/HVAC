"use client"

import { useState } from "react"

const NewsletterCTA = () => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="py-16 bg-[#0f2a4a]">
      <div className="content-container">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#f97316] text-sm font-semibold uppercase tracking-widest mb-2">
            Stay in the Loop
          </p>
          <h2 className="text-white text-3xl small:text-4xl font-bold mb-4">
            Exclusive Deals & HVAC Tips
          </h2>
          <p className="text-gray-400 mb-8">
            Sign up for our newsletter and get trade tips, seasonal promotions, and new product alerts
            straight to your inbox. Unsubscribe anytime.
          </p>

          {submitted ? (
            <div className="bg-[#f97316]/10 border border-[#f97316]/30 rounded-xl px-8 py-6">
              <p className="text-[#f97316] font-semibold text-lg mb-1">You&apos;re subscribed!</p>
              <p className="text-gray-400 text-sm">Welcome aboard. Check your inbox for a confirmation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col small:flex-row gap-3 justify-center">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 max-w-sm px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#f97316] transition-colors text-sm"
              />
              <button
                type="submit"
                className="bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold px-6 py-3 rounded transition-colors duration-200 text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-gray-600 text-xs mt-4">
            We respect your privacy. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  )
}

export default NewsletterCTA
