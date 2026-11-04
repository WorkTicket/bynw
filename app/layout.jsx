import localFont from 'next/font/local';
import Header from '../components/Header';
import JsonLd from '../components/JsonLd';
import MetaBrowserOptimizer from '../components/MetaBrowserOptimizer';
import MetaPixel from '../components/MetaPixel';
import CookieConsent from '../components/CookieConsent';
import { absoluteUrl, site } from '../lib/site';
import './globals.css';
const sans = localFont({ src: [{ path: '../public/assets/sans.woff2', weight: '400', style: 'normal' }, { path: '../public/assets/sans-bold.woff2', weight: '700 900', style: 'normal' }], variable: '--font-sans', display: 'swap' });
const script = localFont({ src: '../public/assets/script.woff2', variable: '--font-script', display: 'swap' });
export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Manos Creativas Bynmw · Patrones de crochet', template: '%s | Manos Creativas Bynmw' },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
  appleWebApp: { capable: true, title: site.name, statusBarStyle: 'default' },
  category: 'Crochet y manualidades',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', locale: site.locale, siteName: site.name, url: '/',
    title: 'Manos Creativas Bynmw · Patrones de crochet', description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: 'Patrones de crochet de Manos Creativas Bynmw' }],
  },
  twitter: { card: 'summary_large_image', title: 'Manos Creativas Bynmw · Patrones de crochet', description: site.description, images: [site.ogImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  icons: { icon: '/assets/favicon.png', apple: '/Crochet-Shop-Website-Images/05-assets-tienda-completa/11-marca/favicon-yarn-heart-180.png' },
  manifest: '/manifest.webmanifest',
};
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#fff8fb',
  colorScheme: 'light',
};
const organization = {
  '@context': 'https://schema.org', '@type': 'Organization', name: site.name, url: site.url,
  logo: absoluteUrl('/assets/manos-logo.webp'), email: 'mailto:bynw808@gmail.com',
};
export default function RootLayout({ children }) { return <html lang="es-ES" data-scroll-behavior="smooth" className={`${sans.variable} ${script.variable}`}><head><link rel="preconnect" href="https://pay.hotmart.com" /><link rel="dns-prefetch" href="https://pay.hotmart.com" /><link rel="preload" as="image" href="/optimized/assets/hero-480.webp" media="(max-width: 700px)" fetchPriority="high" /><link rel="preload" as="image" href="/optimized/assets/hero-1024.webp" media="(min-width: 701px)" fetchPriority="high" /></head><body className="antialiased"><MetaPixel /><MetaBrowserOptimizer /><JsonLd data={organization} /><Header />{children}<CookieConsent /></body></html>; }
