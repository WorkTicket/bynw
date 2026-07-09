import type { Metadata, Viewport } from "next"
import { Suspense } from "react"
import { Inter, Cormorant_Garamond, Dancing_Script } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"
import ExitIntentPopup from "@/components/ExitIntentPopup"
import Analytics from "@/components/Analytics"
import StickyMobileCTA from "@/components/StickyMobileCTA"
import CountryProvider from "@/components/CountryProvider"
import { getCountry } from "@/lib/country"

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})

const script = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-script",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
}

const SITE_URL = "https://bynmwcreative.com"

export async function generateMetadata(): Promise<Metadata> {
  const country = getCountry()
  const locale = country === "MX" ? "es_MX" : "es_ES"

  const title = "Manos Creativas Bynmw ⋆ Patrones de Crochet en PDF"
  const description =
    "Patrones de crochet en PDF: amigurumis, Princesas Disney y Flores Eternas. Descarga al momento. Más de 500 clientas satisfechas. Disponible en México y España."

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s ⋆ Manos Creativas Bynmw",
    },
    description,
    keywords: [
      "patrones crochet",
      "patrones crochet México",
      "patrones crochet España",
      "amigurumis",
      "patrones PDF",
      "crochet patrones",
      "flores crochet",
      "princesas crochet",
      "manualidades",
      "patrones amigurumi",
    ],
    authors: [{ name: "Manos Creativas Bynmw" }],
    creator: "Manos Creativas Bynmw",
    publisher: "Manos Creativas Bynmw",
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
    alternates: {
      canonical: SITE_URL,
      languages: {
        "es-MX": SITE_URL,
        "es-ES": SITE_URL,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      title,
      description,
      siteName: "Manos Creativas Bynmw",
      type: "website",
      locale,
      images: [
        {
          url: "/images/imagen-1.webp",
          width: 1200,
          height: 630,
          alt: "Manos Creativas Bynmw - Patrones de Crochet",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: "/images/imagen-1.webp",
          width: 1200,
          height: 630,
          alt: "Manos Creativas Bynmw - Patrones de Crochet",
        },
      ],
    },
    icons: {
      icon: "/images/logo-64.png",
      apple: "/images/logo-64.png",
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    },
  }
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Manos Creativas Bynmw",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-64.png`,
  description:
    "Patrones de crochet en PDF: amigurumis, Princesas Disney y Flores Eternas. Descarga al momento.",
  email: "manoscreativasbynmw@gmail.com",
  sameAs: [
    "https://www.tiktok.com/@bynmw8",
    "https://www.instagram.com/bynmw12_",
    "https://www.facebook.com/share/1L3pLJdqvm/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+57-300-850-4709",
    contactType: "customer service",
    availableLanguage: ["Spanish"],
    areaServed: ["MX", "ES"],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const country = getCountry()

  return (
    <html
      lang={country === "MX" ? "es-MX" : "es-ES"}
      className={`${sans.variable} ${display.variable} ${script.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://static.hotmart.com" />
        <link rel="dns-prefetch" href="https://checkout.hotmart.com" />
        <link rel="dns-prefetch" href="https://api.hotmart.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link
          rel="preload"
          as="image"
          href="/images/imagen-1.webp"
          fetchPriority="high"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased text-ink bg-rose-50">
        <Suspense>
          <Analytics />
        </Suspense>
        <CountryProvider initialCountry={country}>
          <Header />
          <main className="flex-1 pt-[var(--site-header-offset)]">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <ExitIntentPopup />
          <StickyMobileCTA />
        </CountryProvider>
      </body>
    </html>
  )
}
