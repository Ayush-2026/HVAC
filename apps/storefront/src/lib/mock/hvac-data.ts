export type HvacService = {
  id: string
  title: string
  slug: string
  description: string
  price: number
  duration: string
  image: string
  featured?: boolean
  tags: string[]
}

export type HvacCategory = {
  id: string
  title: string
  handle: string
  description: string
  services: HvacService[]
}

export const hvacCategories: HvacCategory[] = [
  {
    id: "cat_ac_services",
    title: "Air Conditioning Services",
    handle: "air-conditioning-services",
    description: "Residential and commercial cooling solutions",
    services: [
      {
        id: "svc_ac_installation",
        title: "AC Installation",
        slug: "ac-installation",
        description:
          "Professional central air conditioner installation for homes and businesses.",
        price: 49900,
        duration: "4-8 Hours",
        image:
          "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
        featured: true,
        tags: ["Cooling", "Installation", "Residential"],
      },
      {
        id: "svc_ac_repair",
        title: "AC Repair",
        slug: "ac-repair",
        description:
          "Fast diagnostics and repair for all AC brands and systems.",
        price: 12900,
        duration: "1-3 Hours",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
        featured: true,
        tags: ["Cooling", "Repair", "Emergency"],
      },
      {
        id: "svc_ac_maintenance",
        title: "AC Maintenance Tune-Up",
        slug: "ac-maintenance",
        description:
          "Seasonal maintenance to improve efficiency and extend system life.",
        price: 8900,
        duration: "1-2 Hours",
        image:
          "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80",
        tags: ["Cooling", "Maintenance"],
      },
      {
        id: "svc_ductless_mini_split",
        title: "Ductless Mini Split Installation",
        slug: "ductless-mini-split-installation",
        description:
          "Energy-efficient ductless mini split installation services.",
        price: 69900,
        duration: "5-8 Hours",
        image:
          "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
        tags: ["Mini Split", "Installation"],
      },
      {
        id: "svc_ac_replacement",
        title: "AC Replacement",
        slug: "ac-replacement",
        description:
          "Replace outdated cooling systems with high-efficiency units.",
        price: 79900,
        duration: "1 Day",
        image:
          "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=800&q=80",
        tags: ["Cooling", "Replacement"],
      },
    ],
  },

  {
    id: "cat_heating_services",
    title: "Heating Services",
    handle: "heating-services",
    description: "Heating repair, installation, and maintenance",
    services: [
      {
        id: "svc_furnace_repair",
        title: "Furnace Repair",
        slug: "furnace-repair",
        description:
          "Repair services for gas, electric, and high-efficiency furnaces.",
        price: 14900,
        duration: "1-3 Hours",
        image:
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
        featured: true,
        tags: ["Heating", "Repair"],
      },
      {
        id: "svc_furnace_installation",
        title: "Furnace Installation",
        slug: "furnace-installation",
        description:
          "New furnace installation with smart thermostat integration.",
        price: 89900,
        duration: "1 Day",
        image:
          "https://images.unsplash.com/photo-1496368077930-c1e31b4e5b44?auto=format&fit=crop&w=800&q=80",
        tags: ["Heating", "Installation"],
      },
      {
        id: "svc_heat_pump_installation",
        title: "Heat Pump Installation",
        slug: "heat-pump-installation",
        description:
          "Energy-efficient heat pump systems for year-round comfort.",
        price: 99900,
        duration: "1 Day",
        image:
          "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?auto=format&fit=crop&w=800&q=80",
        tags: ["Heating", "Cooling", "Installation"],
      },
      {
        id: "svc_heating_maintenance",
        title: "Heating System Tune-Up",
        slug: "heating-system-tune-up",
        description: "Preventative heating maintenance before winter season.",
        price: 9900,
        duration: "1-2 Hours",
        image:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
        tags: ["Heating", "Maintenance"],
      },
    ],
  },

  {
    id: "cat_indoor_air_quality",
    title: "Indoor Air Quality",
    handle: "indoor-air-quality",
    description: "Cleaner and healthier indoor air solutions",
    services: [
      {
        id: "svc_air_duct_cleaning",
        title: "Air Duct Cleaning",
        slug: "air-duct-cleaning",
        description:
          "Remove dust, allergens, and contaminants from duct systems.",
        price: 19900,
        duration: "2-4 Hours",
        image:
          "https://images.unsplash.com/photo-1527515637462-cff94ead201b?auto=format&fit=crop&w=800&q=80",
        featured: true,
        tags: ["Air Quality", "Cleaning"],
      },
      {
        id: "svc_air_purifier_installation",
        title: "Air Purifier Installation",
        slug: "air-purifier-installation",
        description: "Whole-home air purification system installation.",
        price: 24900,
        duration: "2-3 Hours",
        image:
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
        tags: ["Air Quality"],
      },
      {
        id: "svc_humidifier_installation",
        title: "Humidifier Installation",
        slug: "humidifier-installation",
        description:
          "Maintain proper indoor humidity for comfort and health.",
        price: 17900,
        duration: "2 Hours",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
        tags: ["Humidity", "Comfort"],
      },
      {
        id: "svc_uv_light_installation",
        title: "UV Light Installation",
        slug: "uv-light-installation",
        description:
          "Reduce bacteria and mold growth inside HVAC systems.",
        price: 15900,
        duration: "1-2 Hours",
        image:
          "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80",
        tags: ["Air Quality", "Sanitization"],
      },
    ],
  },

  {
    id: "cat_commercial_hvac",
    title: "Commercial HVAC",
    handle: "commercial-hvac",
    description: "Commercial heating and cooling solutions",
    services: [
      {
        id: "svc_rooftop_unit_repair",
        title: "Rooftop Unit Repair",
        slug: "rooftop-unit-repair",
        description:
          "Commercial rooftop HVAC unit diagnostics and repair.",
        price: 24900,
        duration: "2-5 Hours",
        image:
          "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
        tags: ["Commercial", "Repair"],
      },
      {
        id: "svc_commercial_hvac_installation",
        title: "Commercial HVAC Installation",
        slug: "commercial-hvac-installation",
        description:
          "Full HVAC installation for offices, retail, and warehouses.",
        price: 249900,
        duration: "2-5 Days",
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        featured: true,
        tags: ["Commercial", "Installation"],
      },
      {
        id: "svc_preventive_maintenance",
        title: "Commercial Preventive Maintenance",
        slug: "commercial-preventive-maintenance",
        description:
          "Scheduled maintenance plans for commercial HVAC systems.",
        price: 39900,
        duration: "Monthly Service",
        image:
          "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=800&q=80",
        tags: ["Commercial", "Maintenance"],
      },
    ],
  },

  {
    id: "cat_emergency_services",
    title: "Emergency HVAC Services",
    handle: "emergency-hvac-services",
    description: "24/7 urgent HVAC support",
    services: [
      {
        id: "svc_emergency_ac_repair",
        title: "24/7 Emergency AC Repair",
        slug: "24-7-emergency-ac-repair",
        description:
          "Immediate emergency cooling repair service available day and night.",
        price: 19900,
        duration: "Same Day",
        image:
          "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
        featured: true,
        tags: ["Emergency", "Cooling"],
      },
      {
        id: "svc_emergency_heating_repair",
        title: "Emergency Heating Repair",
        slug: "emergency-heating-repair",
        description:
          "Rapid-response heating repair during cold weather emergencies.",
        price: 21900,
        duration: "Same Day",
        image:
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
        tags: ["Emergency", "Heating"],
      },
    ],
  },

  {
    id: "cat_membership_plans",
    title: "Maintenance Membership Plans",
    handle: "maintenance-membership-plans",
    description: "Annual HVAC service and protection plans",
    services: [
      {
        id: "svc_bronze_plan",
        title: "Bronze Maintenance Plan",
        slug: "bronze-maintenance-plan",
        description:
          "Annual HVAC inspection and discounted repair pricing.",
        price: 14900,
        duration: "Yearly",
        image:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
        tags: ["Membership"],
      },
      {
        id: "svc_silver_plan",
        title: "Silver Maintenance Plan",
        slug: "silver-maintenance-plan",
        description: "Bi-annual maintenance with priority scheduling.",
        price: 24900,
        duration: "Yearly",
        image:
          "https://images.unsplash.com/photo-1496368077930-c1e31b4e5b44?auto=format&fit=crop&w=800&q=80",
        tags: ["Membership"],
      },
      {
        id: "svc_gold_plan",
        title: "Gold Maintenance Plan",
        slug: "gold-maintenance-plan",
        description:
          "Priority emergency support and full maintenance coverage.",
        price: 39900,
        duration: "Yearly",
        image:
          "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?auto=format&fit=crop&w=800&q=80",
        featured: true,
        tags: ["Membership", "Priority"],
      },
    ],
  },
]

export const cartItem = {
  id: "cart_item_1",
  serviceId: "svc_ac_repair",
  title: "AC Repair",
  quantity: 1,
  price: 12900,
  total: 12900,
}

export const checkoutData = {
  customer: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 555-123-4567",
  },
  address: {
    street: "123 Main St",
    city: "Dallas",
    state: "TX",
    zip: "75001",
    country: "USA",
  },
  appointment: {
    preferredDate: "2026-06-10",
    timeSlot: "10:00 AM - 12:00 PM",
  },
  payment: {
    method: "card",
    status: "pending",
  },
  subtotal: 12900,
  serviceFee: 2500,
  tax: 1400,
  total: 16800,
}

export const paymentMethods = [
  { id: "pm_card",       name: "Credit / Debit Card" },
  { id: "pm_paypal",     name: "PayPal" },
  { id: "pm_apple_pay",  name: "Apple Pay" },
  { id: "pm_google_pay", name: "Google Pay" },
  { id: "pm_financing",  name: "HVAC Financing" },
]

export const featuredServices = hvacCategories
  .flatMap((c) => c.services)
  .filter((s) => s.featured)

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  }).format(cents / 100)
}

export function getServiceBySlug(slug: string): HvacService | undefined {
  return hvacCategories.flatMap((c) => c.services).find((s) => s.slug === slug)
}

export function getCategoryByHandle(handle: string): HvacCategory | undefined {
  return hvacCategories.find((c) => c.handle === handle)
}

export function getCategoryForService(serviceId: string): HvacCategory | undefined {
  return hvacCategories.find((c) => c.services.some((s) => s.id === serviceId))
}
