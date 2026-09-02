import Image from "next/image"
import ImageCarousel from "@/components/ImageCarousel"
import Testimonials from "@/components/Testimonials"
import ScrollReveal from "@/components/ScrollReveal"
import HotmartBuyButton from "@/components/HotmartBuyButton"
import PaymentLogos from "@/components/PaymentLogos"
import MetaViewContent from "@/components/MetaViewContent"
import ProductFinalCTA from "@/components/ProductFinalCTA"
import { parsePriceValue } from "@/lib/pricing"
import {
  formatDiscountBadge,
  getDiscountPercent,
  promoHeroBadge,
  promoUrgencyLine,
} from "@/lib/offer"
import { StarIcon, CheckCircleIcon } from "@/lib/icons"
import { WHATSAPP_URL } from "@/lib/site"
import SaleCountdown from "@/components/SaleCountdown"
import {
  SITE_RATING,
  SITE_RATING_DISPLAY,
  type Review,
} from "@/lib/testimonials-data"
import type { Product } from "@/lib/products"

type Props = {
  product: Product
  reviews: Review[]
}

const sectionHeading =
  "font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-normal overflow-visible pb-1"

const TRUST_POINTS = [
  { title: "Acceso inmediato", detail: "PDF por correo al pagar" },
  { title: "Garantía 7 días", detail: "Compra sin riesgo" },
  { title: "Pago seguro", detail: "Checkout Hotmart" },
  { title: "Soporte WhatsApp", detail: "Respuesta en 24h" },
] as const

const STEPS = [
  {
    n: "01",
    title: "Compras en 2 minutos",
    detail: "Pago seguro con tarjeta, PayPal o Klarna vía Hotmart.",
  },
  {
    n: "02",
    title: "Recibes el acceso",
    detail: "Te llega el enlace por correo. Descarga los PDF al instante.",
  },
  {
    n: "03",
    title: "Empiezas a tejer",
    detail: "Patrones organizados, listos para imprimir o ver en el móvil.",
  },
] as const

function formatSavings(price: string, originalPrice: string): string | null {
  const saved = parsePriceValue(originalPrice) - parsePriceValue(price)
  if (saved <= 0) return null
  if (/MX\$/i.test(price) || /MX\$/i.test(originalPrice)) {
    return `Ahorras MX$${Math.round(saved)}`
  }
  if (price.includes("€") || originalPrice.includes("€")) {
    return `Ahorras ${Math.round(saved)}€`
  }
  return `Ahorras ${Math.round(saved)}`
}

function buildHeroBenefits(product: Product): string[] {
  const giftCount = product.bonusItems.length + product.extraGiftItems.length
  const patternMatch =
    product.title.match(/más de (\d+)/i) ||
    product.description.match(/más de (\d+)/i) ||
    product.title.match(/(\d+)\+/i)
  const stackLead = patternMatch
    ? giftCount > 0
      ? `${patternMatch[1]}+ patrones + ${giftCount} bonos incluidos`
      : `${patternMatch[1]}+ patrones en PDF`
    : giftCount > 0
      ? `${giftCount} bonos incluidos con tu compra`
      : "Colección digital en PDF"

  // Keep to 3 short bullets so Comprar stays in the first FB in-app viewport.
  return [
    stackLead,
    "Fotos paso a paso en español",
    "Para tejer, regalar o vender · acceso de por vida",
  ]
}

/** Short hero line aligned with Meta ad creative (guide: foto + video ads). */
function buildHeroSupport(product: Product): string {
  const priceBit = product.price.replace(/\s/g, "")
  switch (product.slug) {
    case "princesas-disney":
      return `Fotos paso a paso · descarga al momento · ${priceBit}`
    case "flores-eternas":
      return `Tulipanes, rosas y más · PDF al momento · ${priceBit}`
    case "amigurumis-chenille":
      return `Amigurumis suaves en chenille · ideal principiantes · ${priceBit}`
    case "munecas-premium":
      return `Muñecas premium con fotos claras · descarga inmediata · ${priceBit}`
    case "santos-angeles":
      return `Santos y ángeles en PDF · acceso de por vida · ${priceBit}`
    case "navidad":
      return `Patrones navideños listos para tejer · PDF al momento · ${priceBit}`
    case "halloween":
      return `Diseños Halloween fáciles · descarga inmediata · ${priceBit}`
    case "flores-reversibles":
      return `Flores reversibles paso a paso · garantía 7 días · ${priceBit}`
    case "profesiones":
      return `Patrones de profesiones · PDF al momento · ${priceBit}`
    default:
      return `Descarga al momento · acceso de por vida · ${priceBit}`
  }
}

function BuyBlock({
  buyProps,
  buyLabel,
  align = "center",
  compact = false,
}: {
  buyProps: {
    slug: string
    contentId: string
    contentName: string
    price: string
  }
  buyLabel: string
  align?: "center" | "start"
  /** Hero: hide payment logos on small screens so Comprar stays in FB in-app fold. */
  compact?: boolean
}) {
  const alignCls =
    align === "start"
      ? "items-center lg:items-start text-center lg:text-left"
      : "items-center text-center"

  return (
    <div
      className={`flex w-full max-w-md flex-col ${compact ? "gap-2" : "gap-3.5"} ${alignCls} lg:max-w-none`}
    >
      <HotmartBuyButton
        {...buyProps}
        size="lg"
        className={align === "start" ? "lg:justify-start" : undefined}
      >
        {buyLabel}
      </HotmartBuyButton>
      <p className="text-[10px] leading-relaxed tracking-wide text-muted/85 sm:text-[11px]">
        Acceso inmediato
        <span className="meta-sep" aria-hidden="true">
          ✦
        </span>
        Garantía 7 días
        <span className="meta-sep hidden sm:inline" aria-hidden="true">
          ✦
        </span>
        <span className="hidden sm:inline">Pago seguro en Hotmart</span>
      </p>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-track-whatsapp-click="ads_product_buy"
        className={`text-[12px] font-medium text-rose-600 underline-offset-4 transition-colors hover:text-rose-700 hover:underline${compact ? " hidden sm:inline" : ""}`}
      >
        ¿Dudas? WhatsApp a Natalia
      </a>
      <div
        className={`flex ${align === "start" ? "justify-center lg:justify-start" : "justify-center"} ${compact ? "hidden sm:flex" : ""}`}
      >
        <PaymentLogos />
      </div>
    </div>
  )
}

export default function AdsProductLander({ product, reviews }: Props) {
  const priceNum = parsePriceValue(product.price)
  const originalNum = parsePriceValue(product.originalPrice)
  const discount = getDiscountPercent(product.price, product.originalPrice)
  const discountBadge = formatDiscountBadge(discount)
  const savingsLabel = formatSavings(product.price, product.originalPrice)
  const promoLine = promoUrgencyLine()
  const heroBenefits = buildHeroBenefits(product)
  const heroSupport = buildHeroSupport(product)
  const buyProps = {
    slug: product.slug,
    contentId: product.id,
    contentName: product.seoTitle,
    price: product.price,
  }

  // Match Meta ad CTA ("Comprar ahora") — price stays outside the button.
  const buyLabel = "Comprar ahora"

  const reviewCount = Math.max(SITE_RATING.reviewCount, reviews.length)
  const proofReview = reviews.find((r) => r.text?.trim())
  const proofQuote = proofReview
    ? proofReview.text.trim().length > 110
      ? `${proofReview.text.trim().slice(0, 107).trim()}…`
      : proofReview.text.trim()
    : null

  return (
    <>
      <MetaViewContent
        contentId={product.id}
        contentName={product.seoTitle}
        price={product.price}
      />

      {/* Phone / FB in-app: badge → title → stars → price → Comprar, then proof. */}
      <section
        id="oferta"
        className="ads-product-hero relative scroll-mt-[var(--site-header-offset)] overflow-hidden bg-[#fffaf8] pb-[calc(var(--sticky-cta-stack)+1.25rem)] pt-3 sm:pb-[calc(var(--sticky-cta-stack)+2rem)] sm:pt-10 lg:pb-20 lg:pt-14"
      >
        <div className="section relative z-10">
          <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-16">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <span className="order-1 inline-flex items-center rounded-full bg-rose-100/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-700">
                {promoHeroBadge()}
              </span>

              <h1 className="order-2 mt-2.5 font-display text-2xl font-semibold leading-[1.1] tracking-tight text-ink sm:mt-4 sm:text-4xl lg:text-[2.65rem]">
                {product.shortTitle}
              </h1>

              <p className="order-6 mt-3 max-w-md text-sm leading-[1.55] text-muted lg:order-3 lg:mt-2.5 sm:text-base sm:leading-[1.65]">
                {heroSupport}
              </p>

              <div className="order-3 mt-2.5 flex flex-wrap items-center justify-center gap-1.5 sm:mt-4 sm:gap-2 lg:order-4 lg:justify-start">
                <div
                  className="flex items-center gap-0.5"
                  aria-label={`${SITE_RATING_DISPLAY} de 5 estrellas`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="text-rose-400" size={13} />
                  ))}
                </div>
                <span className="text-xs font-semibold text-ink sm:text-sm">
                  {SITE_RATING_DISPLAY}
                </span>
                <span className="text-xs text-muted sm:text-sm">
                  · {reviewCount} reseñas
                </span>
              </div>

              {proofQuote && proofReview ? (
                <p className="order-7 mt-3 hidden max-w-md text-[11px] leading-snug text-ink/60 lg:order-5 lg:mt-2.5 lg:block sm:text-xs sm:leading-relaxed">
                  <span className="italic">“{proofQuote}”</span>
                  <span className="not-italic text-muted">
                    {" "}
                    — {proofReview.name}
                    {proofReview.location ? `, ${proofReview.location}` : ""}
                  </span>
                </p>
              ) : null}

              <ul className="order-8 mt-3 w-full max-w-md space-y-2 text-left lg:order-6 sm:mt-5 sm:space-y-2.5">
                {heroBenefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[13px] text-ink/85 sm:text-[15px]"
                  >
                    <CheckCircleIcon
                      className="mt-0.5 shrink-0 text-rose-500"
                      size={16}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="order-4 mt-3 flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-1 sm:mt-6 sm:gap-x-3 lg:order-7 lg:justify-start">
                <span className="text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {product.price}
                </span>
                {originalNum > priceNum && (
                  <span className="text-base text-muted/40 line-through sm:text-lg">
                    {product.originalPrice}
                  </span>
                )}
                {discountBadge && (
                  <span className="rounded-full bg-rose-100/80 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700 sm:text-xs">
                    {discountBadge}
                  </span>
                )}
                {savingsLabel ? (
                  <span className="hidden text-[11px] font-medium text-rose-700/90 sm:inline sm:text-xs">
                    {savingsLabel}
                  </span>
                ) : null}
                <span className="w-full text-[11px] text-muted/80 sm:text-xs">
                  {promoLine}
                </span>
                <SaleCountdown className="hidden w-full text-[12px] font-medium text-rose-700/90 sm:block" />
              </div>

              <div className="order-5 mt-3 w-full max-w-md sm:mt-7 lg:order-8">
                <BuyBlock
                  buyProps={buyProps}
                  buyLabel={buyLabel}
                  align="start"
                  compact
                />
              </div>

              <div className="order-9 my-5 w-full max-w-sm overflow-hidden rounded-2xl bg-rose-50/40 ring-1 ring-rose-100/60 lg:hidden">
                <div className="relative aspect-square w-full">
                  <Image
                    src={`/images/${product.images[0]}`}
                    alt={product.shortTitle}
                    fill
                    priority
                    fetchPriority="high"
                    quality={80}
                    sizes="(max-width: 640px) 90vw, 380px"
                    unoptimized
                    className="object-contain p-2"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Image Column */}
            <div className="hidden lg:block lg:sticky lg:top-[calc(var(--site-header-offset)+1.5rem)]">
              <div className="overflow-hidden rounded-2xl bg-rose-50/40 ring-1 ring-rose-100/60 shadow-sm">
                <div className="relative aspect-square w-full">
                  <Image
                    src={`/images/${product.images[0]}`}
                    alt={product.shortTitle}
                    fill
                    priority
                    fetchPriority="high"
                    quality={85}
                    sizes="(min-width: 1024px) 480px, 100vw"
                    unoptimized
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="section-trust">
        <div className="section py-5 sm:py-6">
          <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {TRUST_POINTS.map((t) => (
              <li key={t.title} className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink sm:text-xs">
                  {t.title}
                </p>
                <p className="mt-1 text-[11px] text-muted sm:text-xs">{t.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* More product shots (below the fold) */}
      {product.images.length > 1 && (
        <section className="section-white section-padding">
          <div className="section">
            <ScrollReveal>
              <div className="mx-auto max-w-lg">
                <div className="text-center">
                  <span className="eyebrow">La colección</span>
                  <h2 className={`mt-3 ${sectionHeading}`}>
                    Mira más{" "}
                    <span className="gradient-text-rose italic">diseños</span>
                  </h2>
                  {product.caption && (
                    <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
                      {product.caption}
                    </p>
                  )}
                </div>
                <div className="mt-8 overflow-hidden rounded-2xl bg-rose-50/40 ring-1 ring-rose-100/60">
                  <ImageCarousel
                    images={product.images.slice(1)}
                    interval={4500}
                    alt={product.shortTitle}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Value stack */}
      {(product.bonusItems.length > 0 || product.extraGiftItems.length > 0) && (
        <section className="section-white section-padding">
          <div className="section">
            <ScrollReveal>
              <div className="mx-auto max-w-4xl">
                <div className="text-center">
                  <span className="eyebrow">Qué incluye</span>
                  <h2 className={`mt-3 ${sectionHeading}`}>
                    Todo el valor que{" "}
                    <span className="gradient-text-rose italic">recibes</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                    {product.title}
                  </p>
                </div>

                {product.bonusItems.length > 0 && (
                  <div className="mt-10 grid items-center gap-10 sm:grid-cols-2">
                    {product.bonusImage && (
                      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-rose-50/40 ring-1 ring-rose-100/50">
                        <Image
                          src={`/images/${product.bonusImage}`}
                          alt={`Bonos incluidos con ${product.seoTitle}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 420px"
                          quality={70}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-500">
                        Bonos incluidos
                      </p>
                      <ul className="space-y-3">
                        {product.bonusItems.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm text-muted sm:text-base"
                          >
                            <CheckCircleIcon
                              className="mt-0.5 shrink-0 text-rose-400"
                              size={17}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {product.extraGiftItems.length > 0 && (
                  <div className="mt-12 rounded-2xl bg-[var(--surface-blush)]/80 px-5 py-8 sm:px-8 sm:py-10">
                    <h3 className="text-center font-display text-xl font-semibold text-ink sm:text-2xl">
                      {product.extraGiftTitle}
                    </h3>
                    <ul className="mx-auto mt-6 max-w-xl space-y-3">
                      {product.extraGiftItems.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-muted sm:text-base"
                        >
                          <CheckCircleIcon
                            className="mt-0.5 shrink-0 text-rose-400"
                            size={17}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mx-auto mt-12 flex max-w-md flex-col items-center">
                  <BuyBlock buyProps={buyProps} buyLabel={buyLabel} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* How it works + delivery proof */}
      <section className="section-alt section-padding">
        <div className="section">
          <ScrollReveal>
            <div className="mx-auto max-w-5xl">
              <div className="text-center">
                <span className="eyebrow">Así de fácil</span>
                <h2 className={`mt-3 ${sectionHeading}`}>
                  De la compra al{" "}
                  <span className="gradient-text-rose italic">primer punto</span>
                </h2>
              </div>

              <ol className="mx-auto mt-10 grid max-w-4xl gap-8 text-left sm:grid-cols-3 sm:gap-6">
                {STEPS.map((s) => (
                  <li key={s.n}>
                    <p className="font-script text-[1.65rem] leading-none text-rose-400">
                      {s.n}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {s.detail}
                    </p>
                  </li>
                ))}
              </ol>

              {product.deliveryImages.length > 0 && (
                <div className="mt-14 grid items-center gap-10 lg:grid-cols-5 lg:gap-14">
                  <div className="relative order-1 mx-auto w-full max-w-[220px] sm:max-w-[260px] lg:col-span-2 lg:max-w-none">
                    <ImageCarousel
                      images={product.deliveryImages}
                      aspect="aspect-[9/16]"
                      interval={4500}
                      alt={`Entrega digital de ${product.seoTitle}`}
                    />
                  </div>
                  <div className="order-2 flex flex-col gap-4 text-center lg:col-span-3 lg:text-left">
                    <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                      Así recibes tu colección
                    </h3>
                    <p className="text-sm leading-relaxed text-muted sm:text-base">
                      Cuando completes la compra te llega un correo con acceso
                      inmediato a todos los patrones.
                    </p>
                    <p className="text-sm leading-relaxed text-muted sm:text-base">
                      Todo va organizado en carpetas con nombre, como ves en la
                      imagen. Solo abres el patrón que quieras tejer.
                    </p>
                    <p className="text-sm leading-relaxed text-muted sm:text-base">
                      Puedes guardarlos en el móvil, la tablet o el ordenador, e
                      imprimirlos si te resulta más cómodo.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quality proof */}
      {product.qualityImages.length > 0 && (
        <section className="section-white section-padding">
          <div className="section">
            <ScrollReveal>
              <div className="mx-auto max-w-3xl text-center">
                <span className="eyebrow">Calidad</span>
                <h2 className={`mt-3 ${sectionHeading}`}>
                  Mira cómo se ven los{" "}
                  <span className="gradient-text-rose italic">patrones</span>
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-sm text-muted sm:text-base">
                  Instrucciones claras y fotos en cada paso, pensadas para tejer
                  con tranquilidad.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="mx-auto mt-10 max-w-lg">
                <ImageCarousel
                  images={product.qualityImages}
                  interval={4500}
                  alt={`Calidad de ${product.seoTitle}`}
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      <Testimonials
        reviews={reviews}
        limit={3}
        showForm={false}
        showMoreLink={false}
        layout="photos"
        preserveOrder
      />
      <ProductFinalCTA
        shortTitle={product.shortTitle}
        price={product.price}
        buyProps={buyProps}
        discount={discount}
      />
    </>
  )
}
