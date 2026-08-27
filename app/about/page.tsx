import { Metadata } from "next"
import PrimaryCTA from "@/components/PrimaryCTA"
import SecondaryCTA from "@/components/SecondaryCTA"
import ScrollReveal from "@/components/ScrollReveal"
import { createPageMetadata } from "@/lib/seo"
import {
  DEFAULT_OG_IMAGE,
  SUPPORT_SLA,
  WHATSAPP_URL,
} from "@/lib/site"

export const metadata: Metadata = createPageMetadata({
  title: "Nosotros",
  description:
    "Conoce la historia de Manos Creativas Bynmw y nuestra pasión por el crochet o ganchillo. Patrones en PDF para España.",
  path: "/about",
  images: [DEFAULT_OG_IMAGE],
})

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="section relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-[2rem] text-rose-500 sm:text-[2.25rem]">
                Manos Creativas Bynmw
              </p>
              <span className="eyebrow mt-5">Nosotros</span>
              <h1 className="mt-4">
                Sobre Manos{" "}
                <span className="gradient-text-rose italic">Creativas</span>
              </h1>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-white section-padding">
        <div className="section max-w-5xl">
          <ScrollReveal>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="eyebrow">Nuestra historia</span>
                <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                  De un hobby a una comunidad de artesanas
                </h2>
                <p className="mt-5 text-muted leading-relaxed">
                  Manos Creativas Bynmw nace de la pasión de Natalia por el crochet o ganchillo
                  y de querer compartir patrones claros con tejedoras de cualquier
                  parte. Cada colección está pensada para que puedas seguir los
                  pasos con calma, tanto si empiezas como si ya tienes experiencia.
                </p>
                <p className="mt-4 text-muted leading-relaxed">
                  Lo que empezó como un hobby se ha convertido en una comunidad de
                  artesanas que usan nuestros patrones para crear, aprender y, en
                  muchos casos, montar su propio negocio.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-rose-100/50 shadow-soft">
                <div className="aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/manoscreative.webp"
                    alt="Natalia — Manos Creativas Bynmw"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-premium-dark section-padding">
        <div className="section">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow">Nuestra misión</span>
              <p className="mt-6 font-display text-2xl leading-relaxed text-ink sm:text-3xl">
                “Ayudar a tejedoras de cualquier parte a crear con patrones claros
                y recursos prácticos, ya sea para vender, regalar o disfrutar en
                casa.”
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pink section-padding">
        <div className="section">
          <ScrollReveal>
            <div className="section-header">
              <span className="eyebrow">Por qué elegirnos</span>
              <h2>
                Tres razones para confiar en{" "}
                <span className="gradient-text-rose italic">nosotras</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-10 sm:grid-cols-3">
            {[
              {
                title: "Patrones propios",
                desc: "Diseños propios que no verás en otro sitio.",
              },
              {
                title: "Acceso inmediato",
                desc: "Descarga tus patrones en PDF al instante después de la compra.",
              },
              {
                title: "Soporte personalizado",
                desc: "Natalia te guía por WhatsApp en cada paso del proceso.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div className="text-center sm:text-left">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-white section-padding">
        <div className="section">
          <ScrollReveal>
            <div className="mx-auto max-w-xl text-center">
              <span className="eyebrow">Empieza hoy</span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                Elige tu colección
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Patrones en PDF con descarga al momento, acceso de por vida y
                garantía de 7 días.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center">
                <PrimaryCTA href="/shop" size="lg">
                  Ver colecciones
                </PrimaryCTA>
                <SecondaryCTA
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-whatsapp-click="about_cta"
                >
                  Escribir por WhatsApp
                </SecondaryCTA>
              </div>
              <p className="mt-4 text-sm text-muted">{SUPPORT_SLA}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
