import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  buildPaidAdsRedirectUrl,
  extractShopSlug,
  isMetaPaidTraffic,
  resolveColdAdsSlug,
  shouldRedirectPaidOrganicPath,
} from "@/lib/paid-traffic"

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? ""

  // Consolidate www → apex for a single canonical host
  if (host === "www.bynmwcreative.com") {
    const url = request.nextUrl.clone()
    url.host = "bynmwcreative.com"
    url.protocol = "https"
    return NextResponse.redirect(url, 301)
  }

  const { pathname, searchParams } = request.nextUrl

  // Safety net: Meta paid hits on / or /shop* → conversion lander /ads/{slug}
  if (
    shouldRedirectPaidOrganicPath(pathname) &&
    isMetaPaidTraffic(searchParams)
  ) {
    const slug = resolveColdAdsSlug({
      searchParams,
      pathSlug: extractShopSlug(pathname),
    })
    const target = buildPaidAdsRedirectUrl(request.nextUrl, slug)
    return NextResponse.redirect(target, 302)
  }

  return NextResponse.next()
}

export const config = {
  // Include api/images/gift so www → apex consolidates every host path.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
