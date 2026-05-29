import { Suspense } from "react"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SideMenu from "@modules/layout/components/side-menu"
import CategoryDropdown from "@modules/layout/components/category-dropdown"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="relative h-16 mx-auto bg-[#0f2a4a] border-b border-[#1e3f6f]">
        <nav className="content-container flex items-center justify-between w-full h-full">

          {/* Left: hamburger (mobile only) */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full small:hidden">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
          </div>

          {/* Centre: logo */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="text-white text-xl font-bold tracking-wider uppercase hover:text-[#f97316] transition-colors duration-200"
              data-testid="nav-store-link"
            >
              HVAC
            </LocalizedClientLink>
          </div>

          {/* Right: nav links */}
          <div className="flex items-center gap-x-5 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-5 h-full text-sm">
              {/* Services dropdown */}
              <Suspense fallback={
                <LocalizedClientLink className="text-gray-300 hover:text-white transition-colors duration-200" href="/services">
                  Services
                </LocalizedClientLink>
              }>
                <CategoryDropdown />
              </Suspense>

              {/* Emergency — highlighted */}
              <LocalizedClientLink
                className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-semibold transition-colors duration-200"
                href="/services/category/emergency-hvac-services"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                Emergency
              </LocalizedClientLink>

              {/* Auth links */}
              <LocalizedClientLink
                className="text-gray-300 hover:text-white transition-colors duration-200"
                href="/login"
              >
                Log In
              </LocalizedClientLink>
              <LocalizedClientLink
                className="bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold px-4 py-1.5 rounded-lg transition-colors duration-200 text-sm"
                href="/register"
              >
                Sign Up
              </LocalizedClientLink>
            </div>
          </div>

        </nav>
      </header>
    </div>
  )
}
