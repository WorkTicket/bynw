import { notFound } from "next/navigation"
import { Metadata } from "next"
import { cookies } from "next/headers"
import ImageCarousel from "@/components/ImageCarousel"
import ScrollReveal from "@/components/ScrollReveal"
import HotmartBuyButton from "@/components/HotmartBuyButton"
import PaymentLogos from "@/components/PaymentLogos"
import { products, getProductBySlug } from "@/lib/products"
import { getLocalizedProduct } from "@/lib/pricing"

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.title} | Manos Creativas Bynmw`,
      description: product.description.slice(0, 160),
    },
  }
}

const sectionHeading = "font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-normal overflow-visible pb-1"

export default function ProductPage({ params }: Props) {
  const cookieStore = cookies()
  const country = cookieStore.get("user_country")?.value
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const localizedProduct = getLocalizedProduct(product, country)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: localizedProduct.title,
    description: localizedProduct.description,
    offers: {
      "@type": "Offer",
      price: localizedProduct.price.replace(/[^0-9.]/g, ""),
      priceCurrency: country === "MX" ? "MXN" : "EUR",
      url: localizedProduct.buyUrl,
      availability: "https://schema.org/InStock",
    },
  }

  function renderSpecs(text: string) {
    const lines = text.split("\n")
    const elements: React.ReactNode[] = []
    for (let i = 0; i < lines.length; i++) {
      const t = lines[i].trim()
      if (!t) { elements.push(<br key={i} />); continue }
      if (t.includes("Especificaciones Técnicas") || t.includes("Contenido Educativo Especial")) {
        elements.push(<p key={i} className="mt-4 mb-1 text-sm font-semibold text-ink">{t}</p>)
        continue
      }
      elements.push(
        <div key={i} className="flex items-start gap-2 text-sm text-muted">
          <span className="mt-0.5 text-wine-400 shrink-0">•</span>
          <span>{t}</span>
        </div>
      )
    }
    return elements
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-x-clip bg-gradient-to-b from-white via-rose-50/20 to-white pb-24 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-wine-100/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-rose-100/20 blur-3xl" />
          <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-wine-50/30 blur-3xl" />
        </div>

        <div className="section relative z-10">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
                <div className="relative lg:order-2">
                  <div className="absolute -inset-3 rounded-3xl2 bg-wine-gradient opacity-5 blur-xl" />
                  <div className="relative overflow-hidden rounded-2xl2 shadow-2xl ring-1 ring-white/10">
                    <ImageCarousel images={localizedProduct.images} interval={2500} alt={localizedProduct.title} />
                  </div>
                </div>
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:order-1">
                  <span className="badge">Colección</span>
                  <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-ink tracking-tight leading-snug">
                    {localizedProduct.title}
                  </h1>

                  <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                    <span className="text-3xl sm:text-4xl font-bold gradient-text">
                      {localizedProduct.price}
                    </span>
                    <span className="text-lg sm:text-xl text-muted/40 line-through">
                      {localizedProduct.originalPrice}
                    </span>
                  </div>

                  <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed">
                    {localizedProduct.description}
                  </p>

                  <div className="mt-8 space-y-4 w-full">
                    <HotmartBuyButton href={localizedProduct.buyUrl}>
                      {localizedProduct.buyText}
                    </HotmartBuyButton>

                    <div className="flex justify-center">
                      <PaymentLogos />
                    </div>

                    <div className="trust-badge text-center lg:text-left text-xs">
                      Pago 100% seguro. Socio oficial: Hotmart.
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mx-auto mt-20 sm:mt-28 max-w-4xl">
                <span className="badge">Descripción</span>
                <h2 className={`mt-4 ${sectionHeading}`}>
                  Descripción{" "}
                  <span className="gradient-text italic">General</span>
                </h2>
                <div className="section-divider mt-4" />
                <p className="mt-6 text-base sm:text-lg text-muted leading-relaxed">
                  {localizedProduct.description}
                </p>
                <div className="mt-6 rounded-2xl2 bg-wine-50/40 border border-wine-100/30 p-5 sm:p-6">
                  <h3 className="font-display text-lg font-semibold text-ink mb-4">
                    Especificaciones Técnicas
                  </h3>
                  <div className="space-y-1.5">
                    {renderSpecs(product.specs)}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-20 sm:mt-28">
              <ScrollReveal>
                <div className="mx-auto max-w-4xl">
                  <div className="rounded-2xl2 bg-wine-50/40 border border-wine-100/30 p-6 sm:p-8 lg:p-10">
                    <h2 className={`${sectionHeading} text-center`}>
                      Bonos de regalo incluidos con tu compra
                    </h2>
                    <div className="mt-8 grid items-center gap-8 sm:grid-cols-2">
                      <div className="overflow-hidden rounded-xl shadow-md ring-1 ring-white/10 bg-wine-50/40">
                        <img
                          src={`/images/${product.bonusImage}`}
                          alt="Bonos incluidos"
                          className="block h-auto w-full object-contain"
                        />
                      </div>
                      <div>
                        <ul className="space-y-3">
                          {product.bonusItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-muted">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                                <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {product.extraGiftItems.length > 0 && (
              <div className="mt-10">
                <ScrollReveal>
                  <div className="mx-auto max-w-4xl">
                    <div className="rounded-2xl2 bg-rose-50/40 border border-rose-200/30 p-6 sm:p-8 lg:p-10">
                      <h2 className={`${sectionHeading} text-center`}>
                        {product.extraGiftTitle}
                      </h2>
                      <div className="mt-8 grid items-center gap-8 sm:grid-cols-2">
                        <div className="overflow-hidden rounded-xl shadow-md ring-1 ring-white/10 bg-rose-50/40">
                          <img
                            src={`/images/imagen-4.jpeg`}
                            alt="Obsequios adicionales"
                            className="block h-auto w-full object-contain"
                          />
                        </div>
                        <div>
                          <ul className="space-y-3">
                            {product.extraGiftItems.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-muted">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-wine-100 text-wine-600">
                                  <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            )}

            <div className="mt-20 sm:mt-28 relative">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/2 -left-20 h-48 w-12 -translate-y-1/2 rounded-full bg-wine-100/20 blur-2xl" />
                <div className="absolute top-1/2 -right-20 h-48 w-12 -translate-y-1/2 rounded-full bg-rose-100/20 blur-2xl" />
              </div>

              <ScrollReveal>
                <div className="mx-auto max-w-5xl">
                  <div className="text-center">
                    <span className="badge">Entrega</span>
                    <h2 className={`mt-4 ${sectionHeading}`}>
                      Así de fácil recibes tu{" "}
                      <span className="gradient-text italic">colección</span>
                    </h2>
                    <div className="section-divider mt-4" />
                  </div>

                  <div className="mt-8 sm:mt-10 grid gap-8 lg:grid-cols-5 lg:gap-12 items-center">
                    <div className="relative order-1 mx-auto w-full max-w-[200px] sm:max-w-[240px] lg:col-span-3 lg:max-w-[280px] xl:max-w-xs">
                      <div className="absolute -inset-2 rounded-2xl2 bg-rose-100/20 blur-xl" />
                      <div className="relative overflow-hidden rounded-2xl2 shadow-xl ring-1 ring-white/10">
                        <ImageCarousel
                          images={product.deliveryImages}
                          aspect="aspect-[9/16]"
                          interval={3500}
                          alt={`Entrega de ${product.title}`}
                        />
                      </div>
                    </div>

                    <div className="order-2 flex flex-col gap-4 text-center lg:text-left lg:col-span-2">
                      <p className="text-sm sm:text-base text-muted leading-relaxed">
                        Nada de procesos raros. Cuando completes la compra, te llegará un correo con acceso inmediato a todos los patrones.
                      </p>
                      <p className="text-sm sm:text-base text-muted leading-relaxed">
                        Todo va organizado en carpetas con nombre, como ves en la imagen. Solo tienes que abrir el patrón que quieras tejer.
                      </p>
                      <p className="text-sm sm:text-base text-muted leading-relaxed">
                        Puedes guardarlos en el móvil, la tablet o el ordenador, e imprimirlos si te resulta más cómodo.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="mt-20 sm:mt-28">
              <ScrollReveal>
                <div className="mx-auto max-w-3xl text-center">
                  <span className="badge">Calidad</span>
                  <h2 className={`mt-4 ${sectionHeading}`}>
                    Echa un vistazo a la calidad de{" "}
                    <span className="gradient-text italic">nuestros patrones</span>
                  </h2>
                  <p className="mt-6 text-sm sm:text-base text-muted leading-relaxed max-w-xl mx-auto">
                    Patrones detallados, con fotos en cada paso, pensados para que tejes con tranquilidad.
                  </p>
                  <div className="section-divider mt-4" />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="mt-8 sm:mt-10 max-w-lg mx-auto">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-2xl2 bg-wine-100/10 blur-xl" />
                    <div className="relative overflow-hidden rounded-2xl2 shadow-xl ring-1 ring-white/10">
                      <ImageCarousel images={product.qualityImages} noAutoplay alt={`Calidad de ${product.title}`} />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal>
              <div className="mt-20 sm:mt-28 text-center">
                <div className="relative mx-auto max-w-lg">
                  <div className="absolute -inset-6 rounded-3xl2 bg-wine-gradient opacity-5 blur-2xl" />
                  <div className="relative rounded-2xl2 bg-white border border-wine-100/30 p-8 shadow-card">
                    <h2 className={`${sectionHeading}`}>
                      ¿Lista para empezar?
                    </h2>
                    <p className="mt-3 text-sm text-muted">
                      Acceso inmediato a la colección y a los bonos incluidos.
                    </p>
                    <HotmartBuyButton href={localizedProduct.buyUrl} className="mt-6">
                      {localizedProduct.buyText}
                    </HotmartBuyButton>
                    <div className="mt-3 flex justify-center">
                      <PaymentLogos />
                    </div>
                    <div className="mt-3 trust-badge text-center text-xs">
                      Pago 100% seguro. Socio oficial: Hotmart.
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
