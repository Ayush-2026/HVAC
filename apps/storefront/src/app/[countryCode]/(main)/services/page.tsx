import { Metadata } from "next"
import ServiceCard from "@modules/services/components/service-card"
import { hvacCategories } from "@lib/mock/hvac-data"

export const metadata: Metadata = {
  title: "HVAC Services | Heating, Cooling & Air Quality",
  description:
    "Browse our full range of HVAC services — air conditioning, heating, ventilation, emergency callouts and maintenance plans.",
}

type Props = {
  searchParams: Promise<{ category?: string }>
}

export default async function ServicesPage({ searchParams }: Props) {
  const { category } = await searchParams

  const categories = category
    ? hvacCategories.filter((c) => c.handle === category)
    : hvacCategories

  const activeCategory = hvacCategories.find((c) => c.handle === category)

  return (
    <div className="bg-white min-h-screen">
      {/* Page header */}
      <div className="bg-[#0f2a4a] py-14">
        <div className="content-container text-center">
          <p className="text-[#f97316] text-sm font-semibold uppercase tracking-widest mb-3">
            {activeCategory ? activeCategory.title : "All Services"}
          </p>
          <h1 className="text-white text-4xl small:text-5xl font-bold mb-4">
            {activeCategory ? activeCategory.description : "Our HVAC Services"}
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Professional heating, cooling, and ventilation services for residential and commercial customers across the UK.
          </p>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="content-container">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            <a
              href="./services"
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 ${
                !category
                  ? "bg-[#0f2a4a] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All
            </a>
            {hvacCategories.map((cat) => (
              <a
                key={cat.id}
                href={`./services?category=${cat.handle}`}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
                  category === cat.handle
                    ? "bg-[#0f2a4a] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Services grouped by category */}
      <div className="content-container py-12 flex flex-col gap-16">
        {categories.map((cat) => (
          <div key={cat.id}>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-[#0f2a4a] text-2xl font-bold">{cat.title}</h2>
                <p className="text-gray-500 text-sm mt-1">{cat.description}</p>
              </div>
              <span className="text-gray-400 text-sm hidden small:block">
                {cat.services.length} service{cat.services.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid grid-cols-1 small:grid-cols-2 large:grid-cols-3 gap-6">
              {cat.services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
