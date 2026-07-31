import { Metadata } from "next"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import { createPageMetadata } from "@/lib/seo"
import {
  CONTACT_EMAIL,
  DEFAULT_OG_IMAGE,
  SUPPORT_SLA,
  WHATSAPP_URL,
} from "@/lib/site"

export const metadata: Metadata = createPageMetadata({
  title: "Contacto",
  description:
    "Ponte en contacto con Manos Creativas Bynmw por WhatsApp o email. Atención personalizada en España. Estamos aquí para ayudarte.",
  path: "/contact",
  images: [DEFAULT_OG_IMAGE],
})

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="section relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-[2rem] text-rose-500 sm:text-[2.25rem]">
                Manos Creativas Bynmw
              </p>
              <span className="eyebrow mt-5">Contacto</span>
              <h1 className="mt-4">Contáctanos</h1>
              <p className="mt-5 text-lg text-muted">
                ¿Tienes alguna pregunta? Escríbenos por WhatsApp o email.
                {` ${SUPPORT_SLA}.`}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-white section-padding">
        <div className="section">
          <div className="mx-auto max-w-md text-center">
            <ScrollReveal>
              <div className="portrait-ring mx-auto mb-6 h-24 w-24">
                <img
                  src="/images/manoscreative.webp"
                  alt="Natalia - Manos Creativas"
                  loading="lazy"
                  decoding="async"
                  width="96"
                  height="96"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="font-display text-3xl font-semibold text-ink">
                Habla con Natalia
              </h2>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                Te ayudo con la compra, dudas sobre los patrones o cualquier
                consulta.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-track-whatsapp-click="contact_page"
                className="btn-primary mt-8 inline-flex w-full items-center justify-center gap-2 py-4"
              >
                <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escribir por WhatsApp
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-5 inline-flex text-sm font-medium text-rose-600 transition-colors hover:text-rose-700"
              >
                {CONTACT_EMAIL}
              </a>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <div className="mt-10">
                <Link href="/shop" className="btn-secondary inline-flex w-full justify-center py-3.5">
                  Ver colecciones
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="mt-12 border-t border-rose-100/60 pt-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-500">
                  Redes sociales
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-muted">
                  <a
                    href="https://www.tiktok.com/@bynmw8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="soft-link"
                  >
                    TikTok
                  </a>
                  <a
                    href="https://www.instagram.com/bynmw12_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="soft-link"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/share/1L3pLJdqvm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="soft-link"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
