"use client"

import { useCountry } from "./CountryProvider"

const euLogos = [
  { src: "/images/visa.svg", alt: "Visa" },
  { src: "/images/mastercard.svg", alt: "Mastercard" },
  { src: "/images/paypal.svg", alt: "PayPal" },
  { src: "/images/klarna.svg", alt: "Klarna" },
]

function OxxoLogo() {
  return (
    <svg viewBox="0 0 80 24" className="h-full w-auto" role="img" aria-label="OXXO">
      <rect width="80" height="24" rx="4" fill="#E1251B" />
      <text x="40" y="17" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif">OXXO</text>
    </svg>
  )
}

function MercadoPagoLogo() {
  return (
    <svg viewBox="0 0 120 24" className="h-full w-auto" role="img" aria-label="Mercado Pago">
      <rect width="120" height="24" rx="4" fill="#00A650" />
      <text x="60" y="17" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif">Mercado Pago</text>
    </svg>
  )
}

function SpeiLogo() {
  return (
    <svg viewBox="0 0 60 24" className="h-full w-auto" role="img" aria-label="SPEI">
      <rect width="60" height="24" rx="4" fill="#1a1a2e" />
      <text x="30" y="17" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif">SPEI</text>
    </svg>
  )
}

export default function PaymentLogos({ className = "h-5" }: { className?: string }) {
  const country = useCountry()
  const isMexico = country === "MX"

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {isMexico ? (
        <>
          <OxxoLogo />
          <MercadoPagoLogo />
          <SpeiLogo />
          <img src="/images/paypal.svg" alt="PayPal" loading="lazy" decoding="async" className="h-full w-auto" />
        </>
      ) : (
        euLogos.map((logo) => (
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-auto"
          />
        ))
      )}
    </div>
  )
}
