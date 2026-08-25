import { WHATSAPP_URL, SUPPORT_SLA } from "@/lib/site"
import { CheckCircleIcon } from "@/lib/icons"

/** Compact guarantee + WhatsApp, meant to sit next to the catalog / price — not a competing CTA. */
export default function PurchaseTrustStrip() {
  return (
    <div className="rounded-2xl border border-rose-100/80 bg-white/80 px-5 py-5 sm:px-7 sm:py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/80 sm:text-[15px]">
          <CheckCircleIcon className="mt-0.5 shrink-0 text-rose-500" size={18} />
          <span>
            <span className="font-semibold text-ink">Garantía 7 días.</span> Si
            los patrones no te convencen, te devolvemos el dinero.
          </span>
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-track-whatsapp-click="catalog_trust"
          className="shrink-0 text-[13px] font-medium text-rose-600 underline-offset-4 transition-colors hover:text-rose-700 hover:underline"
        >
          ¿Dudas? WhatsApp a Natalia
          <span className="mt-0.5 block text-[11px] font-normal text-muted no-underline">
            {SUPPORT_SLA}
          </span>
        </a>
      </div>
    </div>
  )
}
