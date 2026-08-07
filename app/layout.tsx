import type { Metadata, Viewport } from "next"
import { Suspense } from "react"
import { Outfit, Bodoni_Moda, Great_Vibes } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"
import Analytics from "@/components/Analytics"
import CookieConsent from "@/components/CookieConsent"
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
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: true,
})

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: true,
})

// Above-fold brand script on hero / ads — preload to avoid FOFT/CLS on LCP text.
const script = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["cursive", "serif"],
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fffaf8",
}

export function generateMetadata(): Metadata {
  const title = `${BRAND_NAME} ⋆ Patrones de Crochet o Ganchillo en PDF`

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
      icon: [
        { url: "/images/logo-64.webp", type: "image/webp" },
        { url: "/images/logo-64.png", type: "image/png" },
      ],
      apple: "/images/logo-64.png",
    },
    manifest: "/manifest.webmanifest",
    ...(isMetaToken ? { verification: { google: gscToken } } : {}),
  }
}

const websiteJsonLd = buildWebsiteJsonLd()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Seed aggregate only — avoid KV round-trip on every HTML document (TTFB).
  const organizationJsonLd = buildOrganizationJsonLd()

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
      <body className="flex min-h-screen flex-col font-sans antialiased text-ink">
        <Suspense>
          <Analytics />
        </Suspense>
        <Header />
        <main className="relative z-[1] flex-1 pt-[var(--site-header-offset)]">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <Suspense fallback={null}>
          <StickyMobileCTA />
        </Suspense>
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
      </body>
    </html>
  )
}
