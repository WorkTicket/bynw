import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const existingCountry = request.cookies.get("user_country")

  if (!existingCountry) {
    const country = request.headers.get("CF-IPCountry")
    if (country) {
      response.cookies.set("user_country", country, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        sameSite: "lax",
      })
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|gift).*)"],
}
