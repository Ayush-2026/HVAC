import { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  getServiceBySlug,
  getCategoryForService,
  hvacCategories,
} from "@lib/mock/hvac-data"
import PaymentForm from "@modules/booking/components/payment-form"

type Props = { params: Promise<{ slug: string; countryCode: string }> }

export async function generateStaticParams() {
  return hvacCategories.flatMap(c => c.services).map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return { title: `Payment — ${service.title} | HVAC Services` }
}

export default async function PaymentPage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const category = getCategoryForService(service.id) ?? null

  const callOutCharge = 4900
  const subtotal = service.price + callOutCharge
  const vat = Math.round(subtotal * 0.20)
  const total = subtotal + vat

  return (
    <PaymentForm
      service={service}
      category={category}
      pricing={{ callOutCharge, subtotal, vat, total }}
    />
  )
}
