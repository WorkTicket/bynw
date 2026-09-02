"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Image from "next/image"
import { buildHotmartEmbedUrl, buildHotmartPayUrl } from "@/lib/hotmart"
import { formatDiscountBadge, getDiscountPercent } from "@/lib/offer"
import { WHATSAPP_URL } from "@/lib/site"
import type { Product } from "@/lib/products"
import PaymentLogos from "@/components/PaymentLogos"
import PetiteOrnament from "@/components/PetiteOrnament"
import MetaInitiateCheckout from "@/components/MetaInitiateCheckout"
import {
  canEmbedHotmartCheckout,
  checkoutPayHref,
} from "@/lib/in-app-browser"

type Props = {
  product: Product
  payUrl: string
}

const TRUST = [
  "Acceso inmediato por correo al confirmar el pago",
  "Garantía 7 días · sin preguntas",
  "Pago seguro con tarjeta, PayPal o Klarna vía Hotmart",
] as const

function PayCta({
  href,
  price,
  className = "",
}: {
  href: string
  price: string
  className?: string
}) {
  const intent = href.startsWith("intent:")
  return (
    <a
      href={href}
      target={intent ? undefined : "_top"}
      rel="noopener"
      data-buy-cta="true"
      className={`btn-collection-buy btn-collection-buy--lg ${className}`.trim()}
    >
      <span className="btn-label">Pagar {price}</span>
    </a>
  )
}

export default function CheckoutShell({ product, payUrl }: Props) {
  // SSR + first client paint: native pay card (works if JS is late / IAB).
  // Desktop non-IAB then mounts the Hotmart iframe.
  const [iframeSrc, setIframeSrc] = useState<string | null>(null)
  const [fullPageUrl, setFullPageUrl] = useState(payUrl)
  const [payHref, setPayHref] = useState(payUrl)
  const [showPayFallback, setShowPayFallback] = useState(false)
  const iframeLoadedRef = useRef(false)
  const iframeKeyRef = useRef(0)
  const [iframeKey, setIframeKey] = useState(0)

  useLayoutEffect(() => {
    const search = window.location.search
    const httpsPay = buildHotmartPayUrl(product.buyUrl, search)
    setFullPageUrl(httpsPay)
    setPayHref(checkoutPayHref(httpsPay))
    if (canEmbedHotmartCheckout()) {
      setIframeSrc(buildHotmartEmbedUrl(product.buyUrl, search))
    } else {
      setIframeSrc(null)
    }
  }, [product.buyUrl])

  useEffect(() => {
    if (!iframeSrc) return
    iframeLoadedRef.current = false
    setShowPayFallback(false)
    const t = window.setTimeout(() => {
      if (!iframeLoadedRef.current) setShowPayFallback(true)
    }, 8000)
    return () => window.clearTimeout(t)
  }, [iframeSrc, iframeKey])

  const retryIframe = () => {
    iframeKeyRef.current += 1
    setIframeKey(iframeKeyRef.current)
    iframeLoadedRef.current = false
    setShowPayFallback(false)
  }

  const discount = getDiscountPercent(product.price, product.originalPrice)
  const discountBadge = formatDiscountBadge(discount)
  const embed = Boolean(iframeSrc)
  const imageSrc = `/images/${product.images[0]}`

  return (
    <div
      className={`checkout-shell section-premium-dark${embed ? " checkout-shell--embed" : " checkout-shell--in-app"}`}
    >
      <MetaInitiateCheckout
        contentId={product.id}
        contentName={product.seoTitle}
        price={product.price}
      />

      <div className="checkout-shell__mobile-bar lg:hidden">
        <div className="checkout-shell__thumb">
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="56px"
            className="object-contain p-0.5"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-[1.05rem] font-semibold leading-tight tracking-tight text-ink">
            {product.shortTitle}
          </h1>
          <p className="mt-0.5 flex flex-wrap items-baseline gap-1.5 text-[1.05rem]">
            <span className="font-display font-semibold tracking-tight text-ink">
              {product.price}
            </span>
            {product.originalPrice && product.originalPrice !== product.price ? (
              <span className="text-xs text-muted/45 line-through">
                {product.originalPrice}
              </span>
            ) : null}
            {discountBadge ? (
              <span className="text-xs font-medium text-rose-600">
                {discountBadge}
              </span>
            ) : null}
          </p>
        </div>
      </div>

      <div className="checkout-shell__layout">
        <aside className="checkout-shell__summary hidden lg:block">
          <p className="font-script text-[2.1rem] leading-[1.1] text-rose-500">
            Manos Creativas Bynmw
          </p>
          <PetiteOrnament className="mt-4" tone="mid" />

          <div className="product-media relative mt-6 aspect-square overflow-hidden rounded-2xl">
            <Image
              src={imageSrc}
              alt={product.shortTitle}
              fill
              sizes="22rem"
              className="object-contain p-3"
            />
          </div>

          <h1 className="mt-6 font-display text-[2rem] font-semibold leading-[1.12] tracking-[-0.03em] text-ink">
            {product.shortTitle}
          </h1>

          <p className="mt-3 flex flex-wrap items-baseline gap-2.5">
            <span className="font-display text-3xl font-semibold tracking-tight text-ink">
              {product.price}
            </span>
            {discountBadge ? (
              <span className="text-sm font-medium text-rose-600">
                {discountBadge}
              </span>
            ) : null}
            {product.originalPrice && product.originalPrice !== product.price ? (
              <span className="text-sm text-muted/45 line-through">
                {product.originalPrice}
              </span>
            ) : null}
          </p>

          <ul className="mt-6 space-y-2.5">
            {TRUST.map((line) => (
              <li
                key={line}
                className="flex items-start gap-2 text-[13.5px] leading-relaxed text-ink/70"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col items-start gap-3">
            <PaymentLogos className="h-[1.2rem] opacity-80" />
            <p className="text-[11px] tracking-wide text-muted/70">
              Pago 100% seguro · Socio oficial Hotmart
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-track-whatsapp-click="checkout_help"
              className="checkout-shell__desktop-help text-sm font-medium text-rose-600 transition-colors hover:text-rose-700"
            >
              ¿Dudas? Escríbenos por WhatsApp
            </a>
          </div>
        </aside>

        <div className="checkout-shell__pay">
          {iframeSrc ? (
            <div className="checkout-hotmart-wrap">
              <iframe
                key={iframeKey}
                title={`Pago seguro — ${product.shortTitle}`}
                src={iframeSrc}
                className="checkout-hotmart-frame"
                allow="payment *; publickey-credentials-get *; clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => {
                  iframeLoadedRef.current = true
                  setShowPayFallback(false)
                }}
              />
            </div>
          ) : null}

          <div className="checkout-pay-card">
            <p className="checkout-pay-card__kicker">Pago seguro en euros</p>
            <ul className="checkout-pay-card__trust">
              {TRUST.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className="checkout-pay-card__cta">
              <PayCta href={payHref} price={product.price} className="w-full" />
            </div>
            <div className="mt-4 flex justify-center lg:justify-start">
              <PaymentLogos />
            </div>
            <p className="checkout-pay-card__hint checkout-pay-card__hint--default">
              Te llevamos al pago seguro de Hotmart. Tarjeta, PayPal o Klarna.
            </p>
            <p className="checkout-pay-card__hint checkout-pay-card__hint--ios">
              Si Apple Pay o PayPal no aparecen, pulsa <strong>⋯</strong> y{" "}
              <strong>Abrir en Safari</strong>.
            </p>
            <p className="checkout-pay-card__hint checkout-pay-card__hint--android">
              Se abre en Chrome para que tarjeta, PayPal y Klarna funcionen.
            </p>
            <p className="checkout-pay-card__alt checkout-pay-card__alt--android">
              <a href={fullPageUrl} target="_top" rel="noopener" data-buy-cta="true">
                Continuar aquí si Chrome no abre
              </a>
            </p>
          </div>

          {showPayFallback ? (
            <div className="checkout-shell__embed-retry mt-4 flex justify-center px-4 lg:justify-start">
              <button
                type="button"
                className="btn-collection-buy btn-collection-buy--lg w-full max-w-sm"
                onClick={retryIframe}
              >
                <span className="btn-label">Cargar el pago {product.price}</span>
              </button>
            </div>
          ) : null}

          <p className="checkout-shell__fallback checkout-shell__fallback--embed">
            Si el pago no carga,{" "}
            <button
              type="button"
              className="font-semibold text-rose-600 underline-offset-4 hover:underline"
              onClick={retryIframe}
            >
              recárgalo aquí
            </button>
            {" · "}
            <a href={fullPageUrl} target="_top" rel="noopener" data-buy-cta="true">
              abrir pantalla completa
            </a>
            .
          </p>
        </div>
      </div>

      <div className="checkout-shell__sticky-spacer" aria-hidden="true" />
      <div className="checkout-shell__sticky">
        <div className="checkout-shell__sticky-panel">
          <PayCta href={payHref} price={product.price} className="w-full" />
        </div>
      </div>
    </div>
  )
}
