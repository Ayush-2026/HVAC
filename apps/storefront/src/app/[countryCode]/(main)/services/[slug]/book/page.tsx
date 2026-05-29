import { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  getServiceBySlug,
  getCategoryForService,
  hvacCategories,
} from "@lib/mock/hvac-data"
import BookingForm from "@modules/booking/components/booking-form"

type Props = { params: Promise<{ slug: string; countryCode: string }> }

export async function generateStaticParams() {
  return hvacCategories.flatMap(c => c.services).map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return { title: `Book ${service.title} | HVAC Services` }
}

export default async function BookPage({ params }: Props) {
  const { slug, countryCode } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const category = getCategoryForService(service.id) ?? null

  const callOutCharge = 4900
  const subtotal = service.price + callOutCharge
  const vat = Math.round(subtotal * 0.20)
  const total = subtotal + vat

  return (
    <BookingForm
      service={service}
      category={category}
      countryCode={countryCode}
      pricing={{ callOutCharge, subtotal, vat, total }}
    />
  )
}
