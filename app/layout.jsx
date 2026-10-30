import localFont from 'next/font/local';
import Header from '../components/Header';
import JsonLd from '../components/JsonLd';
import MetaBrowserOptimizer from '../components/MetaBrowserOptimizer';
import MetaPixel from '../components/MetaPixel';
import { absoluteUrl, site } from '../lib/site';
import './globals.css';
const sans = localFont({ src: [{ path: '../public/assets/sans.woff2', weight: '400', style: 'normal' }, { path: '../public/assets/sans-bold.woff2', weight: '700 900', style: 'normal' }], variable: '--font-sans', display: 'swap' });
const script = localFont({ src: '../public/assets/script.woff2', variable: '--font-script', display: 'swap' });
export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Manos Creativas Bynmw · Patrones de crochet', template: '%s | Manos Creativas Bynmw' },
  description: site.description,
  applicationName: site.name,
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
export default function RootLayout({ children }) { 
  const fontCss = `@font-face{font-family:sans;src:url(/_next/static/media/9094ce5fb1f4408b-s.p.woff2) format("woff2");font-display:swap;font-weight:400;font-style:normal}@font-face{font-family:sans;src:url(/_next/static/media/1c157719e55b0600-s.p.woff2) format("woff2");font-display:swap;font-weight:700 900;font-style:normal}@font-face{font-family:script;src:url(/_next/static/media/8bc71562c3fb9b92-s.p.woff2) format("woff2");font-display:swap}`;
  return <html lang="es-ES" data-scroll-behavior="smooth" className={`${sans.variable} ${script.variable}`}><head><link rel="preconnect" href="https://pay.hotmart.com" /><link rel="dns-prefetch" href="https://pay.hotmart.com" /><link rel="stylesheet" href="/_next/static/css/cabfc59c7dc901c1.css" media="print" onload="this.media='all'" /><style>{fontCss}</style></head><body className="antialiased"><MetaPixel /><MetaBrowserOptimizer /><JsonLd data={organization} /><Header />{children}</body></html>; }
