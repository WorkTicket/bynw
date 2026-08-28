import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { buildPaidHomeRedirectUrl, isAdsLanderPath } from "@/lib/paid-traffic"
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

  const { pathname } = request.nextUrl

  // Existing Facebook ads still point at /ads landers — send them to home.
  if (isAdsLanderPath(pathname)) {
    return NextResponse.redirect(buildPaidHomeRedirectUrl(request.nextUrl), 302)
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
