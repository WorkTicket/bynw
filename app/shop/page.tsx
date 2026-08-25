import { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"
import ProductCard from "@/components/ProductCard"
import LeadMagnet from "@/components/LeadMagnet"
import WhatsAppSupport from "@/components/WhatsAppSupport"
import { products, isBestseller } from "@/lib/products"
import { DEFAULT_OG_IMAGE, absoluteUrl } from "@/lib/site"
import { createPageMetadata, buildBreadcrumbJsonLd } from "@/lib/seo"
import { listFeaturedReviews } from "@/lib/reviews"
import { reviewImageSrc } from "@/lib/testimonials-data"
import { SALE_PERCENT } from "@/lib/offer"
import PurchaseTrustStrip from "@/components/PurchaseTrustStrip"

export const metadata: Metadata = createPageMetadata({
  title: "Colección Maestra de Patrones",
  description:
    "Patrones de crochet o ganchillo en PDF: amigurumis, Princesas de Cuento y Flores Eternas. Para todos los niveles. Descarga inmediata en España.",
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
    desc: "Natalia te ayuda con tu compra o con el ingreso a tus patrones. Respuesta en menos de 24h.",
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
              <span className="eyebrow mt-5">−{SALE_PERCENT}% esta semana</span>
              <h1 className="mt-4">
                Patrones de amigurumis y{" "}
                <span className="gradient-text-rose italic">flores en crochet o ganchillo</span>
              </h1>
              <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                PDF de amigurumis, Princesas de Cuento y Flores Eternas, para
                tejer, regalar o vender. Descarga al momento.
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
                Patrones en PDF con fotos paso a paso, para tejer, regalar o
                vender.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 120}>
                <ProductCard
                  product={p}
                  priority={i < 2}
                  featured={isBestseller(p.slug)}
                  badge={isBestseller(p.slug) ? "Más vendida" : undefined}
                />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 sm:mt-14">
            <PurchaseTrustStrip />
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

      <WhatsAppSupport />

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
    </>
  )
}
