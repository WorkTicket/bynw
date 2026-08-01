import { Metadata } from "next"
import PrimaryCTA from "@/components/PrimaryCTA"
import SecondaryCTA from "@/components/SecondaryCTA"
import ScrollReveal from "@/components/ScrollReveal"
import ProductCard from "@/components/ProductCard"
import LeadMagnet from "@/components/LeadMagnet"
import { products } from "@/lib/products"
import { DEFAULT_OG_IMAGE, WHATSAPP_URL, absoluteUrl } from "@/lib/site"
import { createPageMetadata, buildBreadcrumbJsonLd } from "@/lib/seo"
import { listFeaturedReviews } from "@/lib/reviews"
import { reviewImageSrc } from "@/lib/testimonials-data"

export const metadata: Metadata = createPageMetadata({
  title: "Colección Maestra de Patrones",
  description:
    "Patrones de crochet o ganchillo en PDF: amigurumis, Princesas Disney y Flores Eternas. Para todos los niveles. Descarga inmediata en España.",
  path: "/shop",
  images: [DEFAULT_OG_IMAGE],
})

const features = [
  {
    title: "Acceso inmediato",
    desc: "Recibes todo al momento en tu correo tras la compra. Sin esperas ni envíos físicos.",
  },
  {
    title: "Soporte por WhatsApp",
    desc: "Natalia te guía personalmente. Resolvemos tus dudas en menos de 24h.",
  },
  {
    title: "Patrones cuidados",
    desc: "Diseños con fotos en alta resolución, paso a paso y guía de abreviaturas.",
  },
  {
    title: "Bonos incluidos",
    desc: "Cada colección incluye patrones extra, guías y material adicional sin coste.",
  },
  {
    title: "Pago seguro",
    desc: "Pagos gestionados por Hotmart. Tus datos quedan protegidos.",
  },
  {
    title: "Descarga vitalicia",
    desc: "Accede a tus patrones cuando quieras. Descárgalos, imprímelos y guárdalos.",
  },
]

export default async function ShopPage() {
  const featuredTestimonials = await listFeaturedReviews(3)

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Colección Maestra de Patrones de Crochet o Ganchillo",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.seoTitle,
      url: absoluteUrl(`/shop/${product.slug}`),
    })),
  }

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Colecciones", path: "/shop" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="page-hero">
        <div className="section relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-script text-[2rem] text-rose-500 sm:text-[2.25rem]">
                Manos Creativas Bynmw
              </p>
              <span className="eyebrow mt-5">Colección Maestra</span>
              <h1 className="mt-4">
                Patrones de amigurumis y{" "}
                <span className="gradient-text-rose italic">flores en crochet o ganchillo</span>
              </h1>
              <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                PDF de amigurumis, Princesas Disney y Flores Eternas. Tanto si
                empiezas como si ya llevas tiempo tejiendo.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section
        id="colecciones"
        className="section-white section-padding scroll-mt-24"
      >
        <div className="section">
          <ScrollReveal>
            <div className="section-header">
              <span className="eyebrow">Colecciones</span>
              <h2>
                Elige tu colección{" "}
                <span className="gradient-text-rose italic">favorita</span>
              </h2>
              <p>
                Cada colección incluye patrones detallados en PDF con fotos paso
                a paso.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 120}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pink section-padding">
        <div className="section">
          <ScrollReveal>
            <div className="section-header">
              <span className="eyebrow">Por qué nosotras</span>
              <h2>
                Todo lo que necesitas en un solo{" "}
                <span className="gradient-text-rose italic">lugar</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat, i) => (
              <ScrollReveal key={feat.title} delay={i * 60}>
                <div>
                  <div className="mb-3 h-px w-8 bg-gradient-to-r from-rose-400/80 to-transparent" aria-hidden="true" />
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-white section-padding">
        <div className="section">
          <ScrollReveal>
            <div className="section-header">
              <span className="eyebrow">Testimonios</span>
              <h2>
                Lo que dicen nuestras{" "}
                <span className="gradient-text-rose italic">clientas</span>
              </h2>
              <p>Historias reales de tejedoras que ya usan nuestras colecciones.</p>
            </div>
          </ScrollReveal>

          <ul className="mx-auto max-w-3xl divide-y divide-rose-100/80">
            {featuredTestimonials.map((t, i) => {
              const photo = reviewImageSrc(t)
              return (
                <li key={t.id}>
                  <ScrollReveal delay={i * 60}>
                    <blockquote className="flex items-start gap-4 py-7 sm:gap-6 sm:py-8">
                      {photo && (
                        <div className="shrink-0 overflow-hidden rounded-2xl bg-rose-50/50 ring-1 ring-rose-100/70">
                          <img
                            src={photo}
                            alt={`Trabajo terminado de ${t.name}`}
                            loading="lazy"
                            decoding="async"
                            className="h-[5.5rem] w-[5.5rem] object-cover sm:h-[6.75rem] sm:w-[6.75rem]"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-ink">{t.name}</p>
                        {t.location && (
                          <p className="mt-0.5 text-[12px] text-muted">{t.location}</p>
                        )}
                        <div
                          className="mt-2 flex gap-0.5 text-rose-400 text-xs tracking-widest"
                          aria-label={`${t.rating} de 5 estrellas`}
                        >
                          {"★★★★★".slice(0, t.rating)}
                        </div>
                        <p className="mt-3 text-[1.05rem] leading-[1.7] text-ink/85 sm:text-[1.1rem]">
                          “{t.text}”
                        </p>
                      </div>
                    </blockquote>
                  </ScrollReveal>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="section-alt section-padding">
        <div className="section">
          <ScrollReveal>
            <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_auto] md:gap-14">
              <div className="order-2 text-center md:order-1 md:text-left">
                <span className="eyebrow">Soporte directo</span>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  Natalia te guía personalmente por WhatsApp
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted mx-auto md:mx-0">
                  Soy Natalia, de Manos Creativas. Escríbeme y te guiaré en cada
                  paso del proceso de compra.
                </p>
                <PrimaryCTA
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex"
                  data-track-whatsapp-click="shop_support"
                >
                  Escribir a Natalia
                </PrimaryCTA>
              </div>
              <div className="order-1 mx-auto md:order-2">
                <div className="h-28 w-28 overflow-hidden rounded-full shadow-[0_0_0_1px_rgba(242,179,182,0.55),0_0_0_5px_rgba(255,248,246,0.95),0_0_0_6px_rgba(237,145,150,0.28)] sm:h-36 sm:w-36">
                  <img
                    src="/images/manoscreative.webp"
                    alt="Natalia - Fundadora"
                    loading="lazy"
                    decoding="async"
                    width="144"
                    height="144"
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
            <div className="mx-auto max-w-xl text-center">
              <span className="eyebrow">Guía gratuita</span>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-5xl">
                Descarga gratis el{" "}
                <span className="gradient-text-rose italic">
                  patrón de las Guerreras K-POP
                </span>
              </h2>
              <p className="mt-5 text-ink/60">
                Comprueba la calidad de los patrones antes de comprar.
              </p>
              <div className="mx-auto mt-8 max-w-md">
                <LeadMagnet
                  variant="compact"
                  source="inline-section"
                  submitLabel="Descargar patrón gratis"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-white section-padding">
        <div className="section">
          <ScrollReveal>
            <div className="mx-auto max-w-lg text-center">
              <span className="eyebrow">Contacto</span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                ¿Tienes alguna pregunta?
              </h2>
              <p className="mt-3 text-sm text-muted">
                Estamos aquí para ayudarte. Respuesta en menos de 24h.
              </p>
              <SecondaryCTA
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8"
                data-track-whatsapp-click="shop_contact"
              >
                Escribir por WhatsApp
              </SecondaryCTA>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
