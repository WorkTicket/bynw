import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  buildPaidAdsRedirectUrl,
  extractShopSlug,
  isMetaPaidTraffic,
  resolveColdAdsSlug,
  shouldRedirectPaidOrganicPath,
} from "@/lib/paid-traffic"
import { isInAppBrowser } from "@/lib/hotmart"

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? ""
  const ua = request.headers.get("user-agent")

  // Consolidate www → apex for a single canonical host.
  if (host === "www.bynmwcreative.com") {
    const url = request.nextUrl.clone()
    url.host = "bynmwcreative.com"
    url.protocol = "https"
    return NextResponse.redirect(url, 301)
  }

  const { pathname, searchParams } = request.nextUrl

  // Safety net: Meta paid hits on /shop* → conversion lander /ads/{slug}
  // Home (`/`) is an intentional paid destination — do not redirect.
  if (
    shouldRedirectPaidOrganicPath(pathname) &&
    isMetaPaidTraffic(searchParams, ua)
  ) {
    const targetSlug = resolveColdAdsSlug({
      searchParams,
      pathSlug: extractShopSlug(pathname),
    })
    const target = buildPaidAdsRedirectUrl(request.nextUrl, targetSlug)
    return NextResponse.redirect(target, 302)
  }

  const response = NextResponse.next()

  // Flag Facebook/Instagram WebView for client checkout routing.
  if (isInAppBrowser(ua ?? undefined)) {
    response.cookies.set("fb_iab", "1", {
      path: "/",
      maxAge: 60 * 60,
      sameSite: "lax",
    })
  }

  return response
}

export const config = {
  matcher: [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.bynmwcreative.com" }],
    },
    "/((?!_next/static|_next/image|api|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|webmanifest)$).*)",
  ],
}
