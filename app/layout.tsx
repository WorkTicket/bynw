import type { Metadata, Viewport } from "next"
import { Suspense } from "react"
import { Outfit, Bodoni_Moda, Great_Vibes } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"
import Analytics from "@/components/Analytics"
import StickyMobileCTA from "@/components/StickyMobileCTA"
import {
  SITE_URL,
  BRAND_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_LOCALE,
  OG_ALTERNATE_LOCALES,
  SITE_KEYWORDS,
  SITE_LANG,
} from "@/lib/site"
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/seo"

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
})

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  // next/font has no size-adjust metrics for Bodoni Moda
  adjustFontFallback: false,
})

const script = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
  adjustFontFallback: false,
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fff9f8",
}

export function generateMetadata(): Metadata {
  const title = `${BRAND_NAME} ⋆ Patrones de Crochet en PDF`

  // Only set meta verification when a real GSC meta token is provided.
  // HTML-file verification lives at /googleb0de3a7eb0c354a5.html
  const gscToken = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim()
  const isMetaToken = Boolean(gscToken && !gscToken.endsWith(".html"))

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s ⋆ ${BRAND_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: [...SITE_KEYWORDS],
    authors: [{ name: BRAND_NAME }],
    creator: BRAND_NAME,
    publisher: BRAND_NAME,
    category: "shopping",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description: DEFAULT_DESCRIPTION,
      siteName: BRAND_NAME,
      type: "website",
      locale: DEFAULT_OG_LOCALE,
      ...(OG_ALTERNATE_LOCALES.length
        ? { alternateLocale: [...OG_ALTERNATE_LOCALES] }
        : {}),
      url: SITE_URL,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: DEFAULT_DESCRIPTION,
      images: [DEFAULT_OG_IMAGE],
    },
    icons: {
      icon: "/images/logo-64.png",
      apple: "/images/logo-64.png",
    },
    manifest: "/manifest.webmanifest",
    ...(isMetaToken ? { verification: { google: gscToken } } : {}),
  }
}

const websiteJsonLd = buildWebsiteJsonLd()

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let organizationJsonLd = buildOrganizationJsonLd()
  try {
    const { getAggregateRating } = await import("@/lib/reviews")
    const aggregate = await getAggregateRating()
    organizationJsonLd = buildOrganizationJsonLd(aggregate)
  } catch {
    // Seed aggregate fallback
  }

  return (
    <html
      lang={SITE_LANG}
      className={`${sans.variable} ${display.variable} ${script.variable}`}
    >
      <head>
        {/* Analytics hosts only — Hotmart hints inject when a buy CTA is near */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased text-ink bg-[#fff1f0]">
        <Suspense>
          <Analytics />
        </Suspense>
        <Header />
        <main className="flex-1 pt-[var(--site-header-offset)]">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <StickyMobileCTA />
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID ? (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height={1}
              width={1}
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        ) : null}
      </body>
    </html>
  )
}
