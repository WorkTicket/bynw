import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  buildPaidAdsRedirectUrl,
  extractShopSlug,
  isMetaPaidTraffic,
  resolveColdAdsSlug,
  shouldRedirectPaidOrganicPath,
} from "@/lib/paid-traffic"

const STATIC_EXT =
  /\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|woff2?|ttf|otf|map)$/i

function isStaticAsset(pathname: string) {
  return (
    pathname.startsWith("/images/") ||
    pathname.startsWith("/gift/") ||
    STATIC_EXT.test(pathname)
  )
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? ""

  // Consolidate www → apex for a single canonical host (including /images).
  if (host === "www.bynmwcreative.com") {
    const url = request.nextUrl.clone()
    url.host = "bynmwcreative.com"
    url.protocol = "https"
    return NextResponse.redirect(url, 301)
  }

  const { pathname, searchParams } = request.nextUrl

  // Skip paid-traffic logic on static assets (www redirect already handled).
  if (isStaticAsset(pathname)) {
    return NextResponse.next()
  }

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
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
