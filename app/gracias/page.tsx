import type { Metadata } from "next"
import Link from "next/link"
import PrimaryCTA from "@/components/PrimaryCTA"
import SecondaryCTA from "@/components/SecondaryCTA"
import PetiteOrnament from "@/components/PetiteOrnament"
import {
  BRAND_NAME,
  WHATSAPP_POST_PURCHASE_URL,
  absoluteUrl,
} from "@/lib/site"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Gracias por tu compra",
    description:
      "Confirma tu acceso, escribe por WhatsApp si necesitas ayuda y comparte tu reseña con foto.",
    path: "/gracias",
    noIndex: true,
  }),
  robots: { index: false, follow: false },
  alternates: { canonical: absoluteUrl("/gracias") },
}

/**
 * Post-purchase retention lander.
 * Point Hotmart thank-you / email CTA here (see .env.example).
 * Lead magnet stays on organic home/shop only — not on this page.
 */
export default function GraciasPage() {
  return (
    <section className="section-premium-dark section-padding min-h-[min(70svh,36rem)]">
      <div className="section relative">
        <div className="mx-auto max-w-xl text-center animate-fade-in-up">
          <p className="font-script text-[2.15rem] leading-[1.15] text-rose-400 sm:text-[2.45rem]">
            {BRAND_NAME}
          </p>

          <PetiteOrnament className="mt-5" tone="mid" />

          <h1 className="mt-6 font-display text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:mt-7 sm:text-[2.85rem]">
            ¡Gracias por tu{" "}
            <span className="gradient-text-rose italic">compra</span>!
          </h1>

          <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.75] text-ink/55 sm:text-lg">
            Revisa tu correo: el acceso a los PDF llega al confirmar el pago. Si
            no lo ves en unos minutos, mira spam o escríbenos por WhatsApp.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:mt-11">
            <PrimaryCTA
              href={WHATSAPP_POST_PURCHASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              data-track-whatsapp-click="gracias_support"
            >
              Confirmar acceso por WhatsApp
            </PrimaryCTA>
            <SecondaryCTA href="/testimonials#dejar-resena" className="w-full sm:w-auto">
              Dejar reseña con foto
            </SecondaryCTA>
            <Link
              href="/shop"
              className="text-sm font-medium text-ink/50 transition-colors hover:text-rose-600"
            >
              Ver más colecciones
            </Link>
          </div>

          <p className="mt-8 text-[11px] tracking-[0.06em] text-ink/45">
            Soporte en menos de 24h
            <span className="meta-sep" aria-hidden>
              ✦
            </span>
            Acceso de por vida
            <span className="meta-sep" aria-hidden>
              ✦
            </span>
            Garantía 7 días
          </p>
        </div>
      </div>
    </section>
  )
}
