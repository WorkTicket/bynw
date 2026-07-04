const logos = [
  { src: "/images/visa.svg", alt: "Visa" },
  { src: "/images/mastercard.svg", alt: "Mastercard" },
  { src: "/images/paypal.svg", alt: "PayPal" },
  { src: "/images/klarna.svg", alt: "Klarna" },
]

export default function PaymentLogos({ className = "h-5" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {logos.map((logo) => (
        <img
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          className="h-full w-auto"
        />
      ))}
    </div>
  )
}
