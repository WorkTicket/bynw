import dynamic from "next/dynamic"
import Image from "next/image"
import ImageCarousel from "@/components/ImageCarousel"
import ScrollReveal from "@/components/ScrollReveal"
import HotmartBuyButton from "@/components/HotmartBuyButton"
import PaymentLogos from "@/components/PaymentLogos"
import MetaViewContent from "@/components/MetaViewContent"
import { parsePriceValue } from "@/lib/pricing"
import { StarIcon, CheckCircleIcon } from "@/lib/icons"
import {
  SITE_RATING,
  SITE_RATING_DISPLAY,
  type Review,
} from "@/lib/testimonials-data"
import type { Product } from "@/lib/products"

const Testimonials = dynamic(() => import("@/components/Testimonials"))
const Guarantee = dynamic(() => import("@/components/Guarantee"))
const FAQ = dynamic(() => import("@/components/FAQ"))
const BeginnerCallout = dynamic(() => import("@/components/BeginnerCallout"))

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

  // Keep to 3 bullets so the buy CTA stays in the first mobile viewport (FB in-app).
  return [
    stackLead,
    "Fotos paso a paso en español · acceso de por vida",
    "Ideal para principiantes — guía desde cero",
  ]
}

/** Short hero line aligned with Meta ad creative (guide: foto + video ads). */
function buildHeroSupport(product: Product): string {
  if (product.slug === "princesas-disney") {
    return "Fotos paso a paso, descarga al momento y acceso de por vida. Hoy a 15€ · garantía 7 días."
  }
  return `${product.description.split(".")[0]}. Descarga al momento · garantía 7 días.`
}

function BuyBlock({
  buyProps,
  buyLabel,
  align = "center",
}: {
  buyProps: {
    href: string
    contentId: string
    contentName: string
    price: string
  }
  buyLabel: string
  align?: "center" | "start"
}) {
  const alignCls =
    align === "start"
      ? "items-stretch lg:items-start text-center lg:text-left"
      : "items-stretch text-center"

  return (
    <div className={`flex w-full max-w-md flex-col gap-3.5 ${alignCls} lg:max-w-none`}>
      <HotmartBuyButton {...buyProps}>{buyLabel}</HotmartBuyButton>
      <p className="text-[11px] leading-relaxed tracking-wide text-muted/85">
        Acceso inmediato
        <span className="meta-sep" aria-hidden="true">
          ✦
        </span>
        Garantía 7 días
        <span className="meta-sep" aria-hidden="true">
          ✦
        </span>
        Pago 100% seguro
      </p>
      <div
        className={`flex ${align === "start" ? "justify-center lg:justify-start" : "justify-center"}`}
      >
        <PaymentLogos />
      </div>
    </div>
  )
}

export default function AdsProductLander({ product, reviews }: Props) {
  const priceNum = parsePriceValue(product.price)
  const originalNum = parsePriceValue(product.originalPrice)
  const discount =
    originalNum > 0 ? Math.round((1 - priceNum / originalNum) * 100) : 0
  const savingsLabel = formatSavings(product.price, product.originalPrice)
  const heroBenefits = buildHeroBenefits(product)
  const heroSupport = buildHeroSupport(product)
  const buyProps = {
    href: product.buyUrl,
    contentId: product.id,
    contentName: product.seoTitle,
    price: product.price,
  }

  // Match Meta ad CTA ("Comprar ahora") — don't dilute with alternate label.
  const buyLabel = `Comprar ahora — ${product.price}`

  const reviewCount = Math.max(SITE_RATING.reviewCount, reviews.length)

  return (
    <>
      <MetaViewContent
        contentId={product.id}
        contentName={product.seoTitle}
        price={product.price}
      />

      {/* ── Full-bleed hero: product image + one offer ── */}
      <section
        id="oferta"
        className="hero-editorial relative min-h-[min(88svh,50rem)] scroll-mt-[var(--site-header-offset)] overflow-hidden bg-[#fff9f8] sm:min-h-[min(92svh,54rem)]"
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
                linear-gradient(to top, #fff9f8 0%, rgba(255,249,248,0.97) 16%, rgba(255,249,248,0.58) 40%, transparent 66%),
                linear-gradient(to bottom, rgba(255,249,248,0.9) 0%, transparent 26%)
              `,
            }}
          />

          <div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              background: `
                linear-gradient(
                  92deg,
                  #fff9f8 0%,
                  #fff9f8 30%,
                  rgba(255,249,248,0.97) 38%,
                  rgba(255,249,248,0.82) 48%,
                  rgba(255,249,248,0.4) 60%,
                  rgba(255,249,248,0.1) 74%,
                  transparent 86%
                )
              `,
            }}
          />
        </div>

        <div className="section relative z-10 flex min-h-[min(88svh,50rem)] flex-col justify-end pb-10 pt-8 sm:min-h-[min(92svh,54rem)] sm:justify-center sm:pb-20 sm:pt-16 lg:pb-24">
          <div className="max-w-xl animate-fade-in-up lg:max-w-[36rem]">
            <p className="font-script text-[1.7rem] leading-none text-rose-500 sm:text-[2.25rem]">
              Manos Creativas Bynmw
            </p>

            <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-500/90">
              PDF digital · Envío inmediato a España
            </p>

            <h1 className="mt-2 font-display text-[2rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-4xl lg:text-[2.85rem]">
              {product.shortTitle}
            </h1>

            <p className="mt-3 max-w-md text-[14px] leading-[1.65] text-muted sm:mt-3.5 sm:text-base">
              {heroSupport}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-5">
              <div
                className="flex items-center gap-0.5"
                aria-label={`${SITE_RATING_DISPLAY} de 5 estrellas`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="text-rose-400" size={14} />
                ))}
              </div>
              <span className="text-sm font-semibold text-ink">
                {SITE_RATING_DISPLAY}
              </span>
              <span className="text-sm text-muted">
                · {reviewCount}+ reseñas
              </span>
            </div>

            <ul className="mt-4 w-full max-w-md space-y-2 sm:mt-5 sm:space-y-2.5">
              {heroBenefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-[13px] text-ink/80 sm:text-[15px]"
                >
                  <CheckCircleIcon
                    className="mt-0.5 shrink-0 text-rose-500"
                    size={17}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:mt-6">
              <span className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {product.price}
              </span>
              {originalNum > priceNum && (
                <span className="text-lg text-muted/40 line-through">
                  {product.originalPrice}
                </span>
              )}
              {discount >= 40 && (
                <span className="rounded-full bg-rose-100/80 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
                  −{discount}% hoy
                </span>
              )}
            </div>
            {savingsLabel && (
              <p className="mt-1.5 text-xs font-medium text-rose-700/90">
                {savingsLabel}
                <span className="font-normal text-muted">
                  {" "}
                  · antes {product.originalPrice} · actualizaciones de por vida
                </span>
              </p>
            )}

            <div className="mt-5 w-full max-w-md sm:mt-7">
              <BuyBlock buyProps={buyProps} buyLabel={buyLabel} align="start" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-rose-100/70 bg-white">
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
      <section className="section-padding bg-[var(--surface-blush)]/50">
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

      <BeginnerCallout />

      <Testimonials
        reviews={reviews}
        limit={3}
        showForm={false}
        showMoreLink={false}
      />
      <Guarantee />
      <FAQ />

      {/* Final close */}
      <section className="section-premium-dark section-padding">
        <div className="section">
          <ScrollReveal>
            <div className="mx-auto flex max-w-lg flex-col items-center text-center">
              <p className="font-script text-[1.85rem] leading-none text-rose-400 sm:text-[2.1rem]">
                Manos Creativas Bynmw
              </p>
              <h2 className={`mt-5 ${sectionHeading}`}>
                Empieza a tejer{" "}
                <span className="gradient-text-rose italic">hoy</span>
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                {product.shortTitle} · {product.price}
                {discount >= 40 ? ` (−${discount}%)` : ""}
                {savingsLabel ? ` · ${savingsLabel}` : ""} · acceso inmediato ·
                garantía 7 días
              </p>
              <div className="mt-8 w-full">
                <BuyBlock buyProps={buyProps} buyLabel={buyLabel} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
