"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  buildHotmartEmbedUrl,
  buildHotmartPayUrl,
  isInAppBrowser,
} from "@/lib/hotmart"
import {
  androidChromeIntentUrl,
  isAndroidUa,
} from "@/lib/in-app-browser"
import { formatDiscountBadge, getDiscountPercent } from "@/lib/offer"
import { WHATSAPP_URL } from "@/lib/site"
import type { Product } from "@/lib/products"
import PaymentLogos from "@/components/PaymentLogos"
import PetiteOrnament from "@/components/PetiteOrnament"
import MetaInitiateCheckout from "@/components/MetaInitiateCheckout"

type Props = {
  product: Product
}

const TRUST = [
  "Acceso inmediato por correo al confirmar el pago",
  "Garantía 7 días · sin preguntas",
  "Pago seguro con tarjeta, PayPal o Klarna vía Hotmart",
] as const

export default function CheckoutShell({ product }: Props) {
  const [inApp, setInApp] = useState(false)
  const [androidInApp, setAndroidInApp] = useState(false)
  const [iframeSrc, setIframeSrc] = useState<string | null>(null)
  const [fullPageUrl, setFullPageUrl] = useState(() =>
    buildHotmartPayUrl(product.buyUrl)
  )
  const [payHref, setPayHref] = useState(() =>
    buildHotmartPayUrl(product.buyUrl)
  )

  useEffect(() => {
    const search = window.location.search
    const fbIab = isInAppBrowser()
    const android = fbIab && isAndroidUa()
    const payUrl = buildHotmartPayUrl(product.buyUrl, search)
    setInApp(fbIab)
    setAndroidInApp(android)
    setFullPageUrl(payUrl)
    setPayHref(android ? androidChromeIntentUrl(payUrl) : payUrl)
    if (!fbIab) {
      setIframeSrc(buildHotmartEmbedUrl(product.buyUrl, search))
    }
  }, [product.buyUrl])

  const discount = getDiscountPercent(product.price, product.originalPrice)
  const discountBadge = formatDiscountBadge(discount)

  const payButton = (opts?: { sticky?: boolean }) => (
    <a
      href={payHref}
      target={inApp ? (androidInApp ? undefined : "_blank") : "_top"}
      rel={inApp && !androidInApp ? "noopener noreferrer" : undefined}
      className={`btn-collection-buy btn-collection-buy--lg ${
        opts?.sticky ? "w-full" : "w-full max-w-sm"
      }`}
    >
      <span className="btn-label">Pagar {product.price}</span>
    </a>
  )

  return (
    <div
      className={`checkout-shell section-premium-dark${inApp ? " checkout-shell--in-app" : ""}`}
    >
      <MetaInitiateCheckout
        contentId={product.id}
        contentName={product.seoTitle}
        price={product.price}
      />

      <div className="checkout-shell__mobile-bar lg:hidden">
        <div className="checkout-shell__thumb">
          <Image
            src={`/images/${product.images[0]}`}
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
              src={`/images/${product.images[0]}`}
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

          {!inApp && (
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
                className="text-sm font-medium text-rose-600 transition-colors hover:text-rose-700"
              >
                ¿Dudas? Escríbenos por WhatsApp
              </a>
            </div>
          )}
        </aside>

        <div className="checkout-shell__pay">
          {inApp ? (
            <div className="checkout-pay-card">
              <p className="font-display text-xl font-semibold text-ink sm:text-2xl">
                Un paso más: pago seguro
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Pulsa el botón para pagar{" "}
                <span className="font-medium text-ink">{product.shortTitle}</span>
                {" · "}
                {product.price} en Hotmart (tarjeta, PayPal o Klarna). El PDF llega al
                correo al confirmar.
              </p>
              <p className="checkout-pay-card__hint">
                El pago se abre en Safari o Chrome — Facebook e Instagram bloquean
                tarjetas y PayPal dentro de su navegador. Si no abre, pulsa{" "}
                <strong>⋯</strong> y elige <strong>Abrir en el navegador</strong>.
                Si Hotmart muestra dólares, pulsa <strong>Cambiar país</strong> y
                elige el tuyo. En España el precio es {product.price}.
              </p>
              <div className="mt-6 flex justify-center lg:justify-start">
                {payButton()}
              </div>
              <div className="mt-6 flex flex-col items-center gap-2 lg:items-start">
                <PaymentLogos className="h-[1.2rem] opacity-80" />
                <p className="text-[11px] tracking-wide text-muted/70">
                  Tarjeta, PayPal o Klarna · Socio oficial Hotmart
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 lg:justify-start">
                  <Link
                    href="/refund-policy"
                    className="text-sm font-medium text-ink/65 underline-offset-2 hover:text-rose-600 hover:underline"
                  >
                    Garantía 7 días
                  </Link>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-whatsapp-click="checkout_help"
                    className="text-sm font-medium text-rose-600"
                  >
                    ¿Dudas? WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="checkout-hotmart-wrap">
                {iframeSrc ? (
                  <iframe
                    title={`Pago seguro — ${product.shortTitle}`}
                    src={iframeSrc}
                    className="checkout-hotmart-frame"
                    allow="payment *"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <div className="checkout-hotmart-frame checkout-hotmart-frame--pending" />
                )}
              </div>
              <p className="checkout-shell__fallback">
                Si el pago no carga,{" "}
                <a href={fullPageUrl} target="_top">
                  abre el checkout seguro
                </a>
                . Si ves dólares, pulsa Cambiar país y elige el tuyo.
              </p>
            </>
          )}
        </div>
      </div>

      {inApp && (
        <>
          <div className="checkout-shell__sticky-spacer lg:hidden" aria-hidden="true" />
          <div className="checkout-shell__sticky lg:hidden">
            <div className="checkout-shell__sticky-panel">{payButton({ sticky: true })}</div>
          </div>
        </>
      )}
    </div>
  )
}
