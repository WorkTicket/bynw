import LeadMagnet from "./LeadMagnet"
import ScrollReveal from "@/components/ScrollReveal"
import { GiftIcon, DownloadIcon } from "@/lib/icons"
import { GIFT_MAGNET } from "@/lib/gift-magnet"

export default function LeadMagnetSection() {
  return (
    <section className="section-pink section-padding overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <GiftIcon className="absolute top-8 right-[10%] text-rose-300/20 animate-breathe hidden sm:block" size={36} style={{ animationDelay: "0.5s" }} />
        <DownloadIcon className="absolute bottom-12 left-[8%] text-rose-300/15 animate-sway hidden sm:block" size={28} style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="section relative">
        <ScrollReveal>
          <div className="section-header">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-200/50 px-4 py-2 text-xs font-semibold tracking-wider text-rose-700 backdrop-blur-sm border border-rose-300/30 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse shadow-lg shadow-rose-500/40" />
              Guía gratuita
            </span>

            <h2 className="font-display text-3xl font-semibold text-ink sm:text-5xl lg:text-6xl leading-[1.12] tracking-tight">
              Descarga gratis el{" "}
              <span className="gradient-text-rose italic">{GIFT_MAGNET.title}</span>
            </h2>

            <p className="mt-5 text-base text-muted max-w-lg mx-auto leading-relaxed sm:text-lg">
              {GIFT_MAGNET.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {["PDF descargable", "Paso a paso ilustrado", "Descarga al instante"].map((label) => (
                <div key={label} className="flex items-center gap-2 text-muted">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100">
                    <svg className="h-3.5 w-3.5 text-rose-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-8 w-full max-w-lg sm:max-w-xl">
              <LeadMagnet variant="compact" source="inline-section" submitLabel="Descargar patrón gratis" placeholder="tu@email.com" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
