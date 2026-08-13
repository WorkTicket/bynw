import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  buildPaidAdsRedirectUrl,
  extractShopSlug,
  isMetaPaidTraffic,
  resolveColdAdsSlug,
  shouldRedirectPaidOrganicPath,
} from "@/lib/paid-traffic"
import { getProductBySlug } from "@/lib/products"
import { buildHotmartPayUrl } from "@/lib/hotmart"

function checkoutSlug(pathname: string): string | null {
  const match = pathname.match(/^\/checkout\/([^/]+)\/?$/)
  return match?.[1] ?? null
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? ""

  // Consolidate www → apex for a single canonical host.
  if (host === "www.bynmwcreative.com") {
    const url = request.nextUrl.clone()
    url.host = "bynmwcreative.com"
    url.protocol = "https"
    return NextResponse.redirect(url, 301)
  }

  const { pathname, searchParams } = request.nextUrl

  // /checkout/{slug} → Hotmart. A 302 from a tapped link keeps the user
  // gesture in Facebook/Instagram in-app browsers; sitting on a branded
  // interstitial was dropping paid buyers.
  const slug = checkoutSlug(pathname)
  if (slug) {
    const product = getProductBySlug(slug)
    if (product) {
      const payUrl = buildHotmartPayUrl(product.buyUrl, searchParams)
      return NextResponse.redirect(payUrl, 302)
    }
  }

  // Safety net: Meta paid hits on /shop* → conversion lander /ads/{slug}
  // Home (`/`) is an intentional paid destination — do not redirect.
  if (
    shouldRedirectPaidOrganicPath(pathname) &&
    isMetaPaidTraffic(searchParams)
  ) {
    const targetSlug = resolveColdAdsSlug({
      searchParams,
      pathSlug: extractShopSlug(pathname),
    })
    const target = buildPaidAdsRedirectUrl(request.nextUrl, targetSlug)
    return NextResponse.redirect(target, 302)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.bynmwcreative.com" }],
    },
    "/shop",
    "/shop/:path*",
    "/checkout/:path*",
  ],
}
