import type { Metadata, Viewport } from "next"
import { Inter, Cormorant_Garamond, Dancing_Script } from "next/font/google"
import { cookies } from "next/headers"
import Script from "next/script"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"
import ExitIntentPopup from "@/components/ExitIntentPopup"
import CountryProvider from "@/components/CountryProvider"

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})

const script = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-script",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = cookies()
  const country = cookieStore.get("user_country")?.value
  const locale = country === "MX" ? "es_MX" : "es_ES"

  return {
    metadataBase: new URL("https://bynmwcreative.com"),
    title: {
      default: "Manos Creativas Bynmw ⋆ Patrones de Crochet en PDF",
      template: "%s ⋆ Manos Creativas Bynmw",
    },
    description:
      "Patrones de crochet en PDF: amigurumis, Princesas Disney y Flores Eternas. Descarga al momento. Más de 500 clientas satisfechas.",
    keywords: ["patrones crochet", "amigurumis", "patrones PDF", "crochet patrones", "flores crochet", "princesas crochet", "manualidades"],
    openGraph: {
      title: "Manos Creativas Bynmw ⋆ Patrones de Crochet en PDF",
      description:
        "Patrones de crochet en PDF con descarga inmediata.",
      siteName: "Manos Creativas Bynmw",
      type: "website",
      locale,
      images: [{ url: "/images/imagen-1.jpeg", width: 1200, height: 630, alt: "Manos Creativas Bynmw - Patrones de Crochet" }],
    },
    icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const country = cookieStore.get("user_country")?.value || null

  return (
    <html lang={country === "MX" ? "es-MX" : "es-ES"} data-announcement="visible" className={`${sans.variable} ${display.variable} ${script.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://static.hotmart.com/css/hotmart-fb.min.css"
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased text-ink bg-rose-50">
        <Script
          src="https://static.hotmart.com/checkout/widget.min.js"
          strategy="afterInteractive"
        />
        <CountryProvider initialCountry={country}>
          <Header />
          <main className="flex-1 pt-[var(--site-header-offset)]">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <ExitIntentPopup />
        </CountryProvider>
      </body>
    </html>
  )
}
