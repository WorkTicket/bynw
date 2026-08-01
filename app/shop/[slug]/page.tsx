import { notFound } from "next/navigation"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import ImageCarousel from "@/components/ImageCarousel"
import ScrollReveal from "@/components/ScrollReveal"
import HotmartBuyButton from "@/components/HotmartBuyButton"
import PaymentLogos from "@/components/PaymentLogos"
import MetaViewContent from "@/components/MetaViewContent"
import ProductFinalCTA from "@/components/ProductFinalCTA"
import { products, getProductBySlug } from "@/lib/products"
import { parsePriceValue } from "@/lib/pricing"
import { formatPromoEndLabel, isPromoActive } from "@/lib/offer"
import { DEFAULT_OG_IMAGE } from "@/lib/site"
import {
  createPageMetadata,
  buildProductJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo"
import { listFeaturedReviews } from "@/lib/reviews"

const Testimonials = dynamic(() => import("@/components/Testimonials"))
const Guarantee = dynamic(() => import("@/components/Guarantee"))
type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  const desc = product.description.slice(0, 160)
  const ogImages = product.images.slice(0, 3).map((img) => ({
    url: `/images/${img}`,
    width: 1200,
    height: 630,
    alt: product.seoTitle,
  }))
  return createPageMetadata({
    title: product.seoTitle,
    description: desc,
    path: `/shop/${params.slug}`,
    images: ogImages.length ? ogImages : [DEFAULT_OG_IMAGE],
  })
}

const sectionHeading = "font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-normal overflow-visible pb-1"

export default async function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const localizedProduct = product
  const priceNum = parsePriceValue(localizedProduct.price)
  const originalNum = parsePriceValue(localizedProduct.originalPrice)
  const discount = originalNum > 0 ? Math.round((1 - priceNum / originalNum) * 100) : 0
  const featuredReviews = await listFeaturedReviews(3)

  const productJsonLd = buildProductJsonLd(product)
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Colecciones", path: "/shop" },
    { name: product.seoTitle, path: `/shop/${product.slug}` },
  ])

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
          <span className="mt-0.5 text-rose-400 shrink-0">•</span>
          <span>{t}</span>
        </div>
      )
    }
    return elements
  }

  const buyProps = {
    href: localizedProduct.buyUrl,
    contentId: localizedProduct.id,
    contentName: localizedProduct.seoTitle,
    price: localizedProduct.price,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <MetaViewContent
        contentId={localizedProduct.id}
        contentName={localizedProduct.seoTitle}
        price={localizedProduct.price}
      />

      <section className="section-white relative overflow-x-clip pb-24 sm:pb-28 pt-10 sm:pt-14">
        <div className="section relative z-10">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
                <div className="relative lg:order-2">
                  <div className="product-media">
                    <ImageCarousel
                      images={localizedProduct.images}
                      interval={2000}
                      alt={localizedProduct.shortTitle}
                      priority
                    />
                  </div>
                  {localizedProduct.caption && (
                    <p className="mt-3 text-center text-xs text-muted sm:text-sm">
                      {localizedProduct.caption}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:order-1 lg:sticky lg:top-[calc(var(--site-header-offset)+1.5rem)]">
                  <span className="eyebrow">Colección</span>
                  <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-[1.1]">
                    {localizedProduct.shortTitle}
                  </h1>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                    {localizedProduct.title}
                  </p>

                  <div className="mt-6 flex flex-wrap items-baseline justify-center lg:justify-start gap-3">
                    <span className="text-3xl sm:text-4xl font-semibold text-ink">
                      {localizedProduct.price}
                    </span>
                    {originalNum > priceNum && (
                      <span className="text-lg text-muted/40 line-through">
                        {localizedProduct.originalPrice}
                      </span>
                    )}
                    {discount >= 40 && (
                      <span className="text-sm font-medium text-rose-600">
                        {`−${discount}%`}
                        {isPromoActive()
                          ? ` · hasta ${formatPromoEndLabel()}`
                          : ""}
                      </span>
                    )}
                  </div>

                  <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed">
                    {localizedProduct.description}
                  </p>

                  <div className="mt-8 space-y-4 w-full max-w-md lg:max-w-none">
                    <HotmartBuyButton
                      {...buyProps}
                      size="lg"
                      className="lg:justify-start"
                    >
                      Comprar ahora
                    </HotmartBuyButton>

                    <p className="text-[11px] leading-relaxed tracking-wide text-muted/80 text-center lg:text-left">
                      Acceso inmediato
                      <span className="meta-sep" aria-hidden="true">✦</span>
                      Garantía 7 días
                      <span className="meta-sep" aria-hidden="true">✦</span>
                      Pago 100% seguro
                    </p>

                    <div className="flex justify-center lg:justify-start">
                      <PaymentLogos />
                    </div>

                    <p className="text-xs text-muted text-center lg:text-left">
                      Pago 100% seguro. Socio oficial: Hotmart.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mx-auto mt-20 sm:mt-28 max-w-3xl">
                <span className="eyebrow">Detalles</span>
                <h2 className={`mt-3 ${sectionHeading}`}>
                  Especificaciones{" "}
                  <span className="gradient-text-rose italic">técnicas</span>
                </h2>
                <div className="mt-8 space-y-1.5">
                  {renderSpecs(product.specs)}
                </div>
              </div>
            </ScrollReveal>

            {product.bonusItems.length > 0 && (
              <div className="mt-20 sm:mt-28">
                <ScrollReveal>
                  <div className="mx-auto max-w-4xl">
                    <h2 className={`${sectionHeading} text-center`}>
                      Bonos de regalo exclusivos por tu compra
                    </h2>
                    <div className="mt-10 grid items-center gap-10 sm:grid-cols-2">
                      {product.bonusImage && (
                        <div className="overflow-hidden rounded-2xl bg-rose-50/40 ring-1 ring-rose-100/50">
                          <img
                            src={`/images/${product.bonusImage}`}
                            alt={`Bonos incluidos con ${product.seoTitle}`}
                            loading="lazy"
                            decoding="async"
                            className="block h-auto w-full object-contain"
                          />
                        </div>
                      )}
                      <ul className="space-y-3">
                        {product.bonusItems.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-muted">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            )}

            {product.extraGiftItems.length > 0 && (
              <div className="mt-16">
                <ScrollReveal>
                  <div className="mx-auto max-w-4xl">
                    <h2 className={`${sectionHeading} text-center`}>
                      {product.extraGiftTitle}
                    </h2>
                    <div className="mt-10 grid items-center gap-10 sm:grid-cols-2">
                      <div className="overflow-hidden rounded-2xl bg-rose-50/40 ring-1 ring-rose-100/50">
                        <img
                          src={`/images/imagen-4.webp`}
                          alt={`Obsequios adicionales con ${product.seoTitle}`}
                          loading="lazy"
                          decoding="async"
                          className="block h-auto w-full object-contain"
                        />
                      </div>
                      <ul className="space-y-3">
                        {product.extraGiftItems.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-muted">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            )}

            <div className="mt-20 sm:mt-28">
              <ScrollReveal>
                <div className="mx-auto max-w-5xl">
                  <div className="text-center">
                    <span className="eyebrow">Entrega</span>
                    <h2 className={`mt-3 ${sectionHeading}`}>
                      Así de fácil recibes tu{" "}
                      <span className="gradient-text-rose italic">colección</span>
                    </h2>
                  </div>

                  <div className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-14 items-center">
                    <div className="relative order-1 mx-auto w-full max-w-[220px] sm:max-w-[260px] lg:col-span-2 lg:max-w-none">
                      <ImageCarousel
                        images={product.deliveryImages}
                        aspect="aspect-[9/16]"
                        interval={2000}
                        alt={`Entrega digital de ${product.seoTitle}`}
                      />
                    </div>

                    <div className="order-2 flex flex-col gap-4 text-center lg:text-left lg:col-span-3">
                      <p className="text-sm sm:text-base text-muted leading-relaxed">
                        Nada de procesos raros. Cuando completes la compra, te llegará un correo electrónico (e-mail) con acceso inmediato a todos los patrones.
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
                  <span className="eyebrow">Calidad</span>
                  <h2 className={`mt-3 ${sectionHeading}`}>
                    Echa un vistazo a la calidad de{" "}
                    <span className="gradient-text-rose italic">nuestros patrones</span>
                  </h2>
                  <p className="mt-5 text-sm sm:text-base text-muted leading-relaxed max-w-xl mx-auto">
                    Patrones detallados, con fotos en cada paso, pensados para que tejas con tranquilidad.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="mt-10 max-w-lg mx-auto">
                  <ImageCarousel
                    images={product.qualityImages}
                    interval={2000}
                    alt={`Calidad de ${product.seoTitle}`}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <Testimonials reviews={featuredReviews} limit={3} showForm={false} />
      <Guarantee />

      <ProductFinalCTA
        shortTitle={localizedProduct.shortTitle}
        price={localizedProduct.price}
        buyProps={buyProps}
        discount={discount}
      />
    </>
  )
}
