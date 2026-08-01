import dynamic from "next/dynamic"
import Image from "next/image"
import ImageCarousel from "@/components/ImageCarousel"
import ScrollReveal from "@/components/ScrollReveal"
import HotmartBuyButton from "@/components/HotmartBuyButton"
import PaymentLogos from "@/components/PaymentLogos"
import MetaViewContent from "@/components/MetaViewContent"
import ProductFinalCTA from "@/components/ProductFinalCTA"
import { parsePriceValue } from "@/lib/pricing"
import {
  formatDiscountBadge,
  getDiscountPercent,
  promoUrgencyLine,
} from "@/lib/offer"
import { StarIcon, CheckCircleIcon } from "@/lib/icons"
import {
  SITE_RATING,
  SITE_RATING_DISPLAY,
  type Review,
} from "@/lib/testimonials-data"
import type { Product } from "@/lib/products"

const Testimonials = dynamic(() => import("@/components/Testimonials"))
const Guarantee = dynamic(() => import("@/components/Guarantee"))
type Props = {
  product: Product
  reviews: Review[]
}

const sectionHeading =
  "font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-normal overflow-visible pb-1"

const TRUST_POINTS = [
  { title: "Acceso inmediato", detail: "PDF por correo al pagar" },
  { title: "Garantía 7 días", detail: "Compra sin riesgo" },
  { title: "Pago en euros", detail: "Checkout seguro Hotmart" },
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
    "Ideal para principiantes · acceso de por vida",
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
    href: string
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
        <span className="hidden sm:inline">Pago 100% seguro</span>
      </p>
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
    href: product.buyUrl,
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

      {/* ── Full-bleed hero: product image + one offer (buy stays in FB in-app fold) ── */}
      <section
        id="oferta"
        className="hero-editorial relative min-h-[min(78svh,42rem)] scroll-mt-[var(--site-header-offset)] overflow-hidden sm:min-h-[min(88svh,50rem)]"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 hero-image-drift origin-center scale-[1.04]">
            <Image
              src={`/images/${product.images[0]}`}
              alt={product.shortTitle}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[68%_center] sm:object-[72%_center] lg:object-[78%_center]"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 lg:hidden"
            style={{
              background: `
                linear-gradient(
                  to top,
                  rgba(250,243,241,0.92) 0%,
                  rgba(255,250,248,0.94) 18%,
                  rgba(255,250,248,0.62) 42%,
                  transparent 68%
                ),
                linear-gradient(to bottom, rgba(255,250,248,0.85) 0%, transparent 22%)
              `,
            }}
          />

          <div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              background: `
                linear-gradient(
                  92deg,
                  #fffaf8 0%,
                  #fffaf8 30%,
                  rgba(255,250,248,0.97) 38%,
                  rgba(255,250,248,0.82) 48%,
                  rgba(255,250,248,0.4) 60%,
                  rgba(255,250,248,0.1) 74%,
                  transparent 86%
                ),
                linear-gradient(
                  180deg,
                  transparent 72%,
                  rgba(250,243,241,0.35) 88%,
                  rgba(250,243,241,0.72) 100%
                )
              `,
            }}
          />
        </div>

        <div className="section relative z-10 flex min-h-[min(78svh,42rem)] flex-col justify-end pb-6 pt-6 sm:min-h-[min(88svh,50rem)] sm:justify-center sm:pb-16 sm:pt-14 lg:pb-24">
          <div className="max-w-xl animate-fade-in-up lg:max-w-[36rem]">
            <p className="font-script text-[1.45rem] leading-none text-rose-500 sm:text-[2.25rem]">
              Manos Creativas Bynmw
            </p>

            <h1 className="mt-1.5 font-display text-[1.75rem] font-semibold leading-[1.05] tracking-tight text-ink sm:mt-2 sm:text-4xl lg:text-[2.85rem]">
              {product.shortTitle}
            </h1>

            <p className="mt-2 max-w-md text-[13px] leading-[1.5] text-muted sm:mt-3.5 sm:text-base sm:leading-[1.65]">
              {heroSupport}
            </p>

            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 sm:mt-5 sm:gap-2">
              <div
                className="flex items-center gap-0.5"
                aria-label={`${SITE_RATING_DISPLAY} de 5 estrellas`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="text-rose-400" size={12} />
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
              <p className="mt-2 max-w-md text-[11px] leading-snug text-ink/55 sm:mt-3 sm:text-xs sm:leading-relaxed">
                <span className="italic">“{proofQuote}”</span>
                <span className="not-italic text-muted">
                  {" "}
                  — {proofReview.name}
                  {proofReview.location ? `, ${proofReview.location}` : ""}
                </span>
              </p>
            ) : null}

            <ul className="mt-2.5 w-full max-w-md space-y-1.5 sm:mt-5 sm:space-y-2.5">
              {heroBenefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-[12px] text-ink/80 sm:gap-2.5 sm:text-[15px]"
                >
                  <CheckCircleIcon
                    className="mt-0.5 shrink-0 text-rose-500"
                    size={15}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 sm:mt-6 sm:gap-x-3">
              <span className="text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
                {product.price}
              </span>
              {originalNum > priceNum && (
                <span className="text-base text-muted/40 line-through sm:text-lg">
                  {product.originalPrice}
                </span>
              )}
              {discountBadge && (
                <span className="rounded-full bg-rose-100/80 px-2 py-0.5 text-[11px] font-semibold text-rose-700 sm:px-2.5 sm:text-xs">
                  {discountBadge}
                </span>
              )}
              {savingsLabel && (
                <span className="w-full text-[11px] font-medium text-rose-700/90 sm:w-auto sm:text-xs">
                  {savingsLabel}
                </span>
              )}
              <span className="w-full text-[11px] text-muted/80 sm:text-xs">
                {promoLine}
              </span>
            </div>

            <div className="mt-3.5 w-full max-w-md sm:mt-7">
              <BuyBlock
                buyProps={buyProps}
                buyLabel={buyLabel}
                align="start"
                compact
              />
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
                    images={product.images}
                    interval={2500}
                    alt={product.shortTitle}
                    priority
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
                      interval={2000}
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
                  interval={2200}
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
      />
      <Guarantee />

      <ProductFinalCTA
        shortTitle={product.shortTitle}
        price={product.price}
        buyProps={buyProps}
        discount={discount}
      />
    </>
  )
}
