import { WHATSAPP_URL, SUPPORT_SLA } from "@/lib/site"
import PetiteOrnament from "@/components/PetiteOrnament"

/** Compact guarantee + WhatsApp under the catalog — a petite atelier note, not a boxed disclaimer. */
function DaysHeartBadge() {
  return (
    <svg
      viewBox="0 0 80 74"
      className="h-[4.15rem] w-[4.5rem]"
      role="img"
      aria-label="Garantía de 7 días"
    >
      <defs>
        <linearGradient id="trust-heart-fill" x1="22%" y1="8%" x2="78%" y2="92%">
          <stop offset="0%" stopColor="#f4d4ce" />
          <stop offset="42%" stopColor="#e59aaa" />
          <stop offset="100%" stopColor="#d4727e" />
        </linearGradient>
        <linearGradient id="trust-heart-sheen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fffaf8" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#fffaf8" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse cx="40" cy="70" rx="18" ry="2.4" fill="#b84a5e" opacity="0.12" />

      <path
        d="M40 68 C18 50 6 35 6 21 C6 11 14 4 23 4 C29.5 4 35 8.5 40 16 C45 8.5 50.5 4 57 4 C66 4 74 11 74 21 C74 35 62 50 40 68Z"
        fill="url(#trust-heart-fill)"
      />
      <path
        d="M40 62 C21 47 12 34 12 22.5 C12 14.5 18 9.5 24.5 9.5 C30 9.5 35 13 40 20 C45 13 50 9.5 55.5 9.5 C62 9.5 68 14.5 68 22.5 C68 34 59 47 40 62Z"
        fill="url(#trust-heart-sheen)"
      />

      <text
        x="40"
        y="40"
        textAnchor="middle"
        fill="#fffaf8"
        fontFamily="var(--font-display), 'Bodoni Moda', Georgia, serif"
        fontSize="24"
        fontWeight="600"
      >
        7
      </text>
    </svg>
  )
}

export default function PurchaseTrustStrip() {
  return (
    <aside className="relative mx-auto max-w-lg px-2 text-center">
      <div
        className="pointer-events-none absolute inset-x-6 -inset-y-1 -z-10 rounded-[2.75rem] bg-gradient-to-b from-white/80 via-rose-50/50 to-transparent"
        aria-hidden="true"
      />

      <PetiteOrnament className="mb-4" />

      <div className="mx-auto mb-3 flex justify-center">
        <DaysHeartBadge />
      </div>

      <p className="font-script text-[1.7rem] leading-[1.1] text-rose-400 sm:text-[1.9rem]">
        Compra sin riesgo
      </p>

      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink/75 sm:text-base">
        <span className="font-semibold text-ink">Garantía de 7 días.</span> Si
        los patrones no te convencen, te devolvemos el dinero.
      </p>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-track-whatsapp-click="catalog_trust"
        className="mt-4 inline-flex flex-col items-center text-[13px] font-medium text-rose-600 underline-offset-4 transition-colors hover:text-rose-700 hover:underline"
      >
        WhatsApp a Natalia
        <span className="mt-0.5 text-[11px] font-normal text-muted no-underline">
          Compra o ingreso · {SUPPORT_SLA}
        </span>
      </a>
    </aside>
  )
}
