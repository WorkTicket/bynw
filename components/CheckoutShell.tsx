"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  buildHotmartEmbedUrl,
  buildHotmartPayUrl,
} from "@/lib/hotmart"
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
  "Pago seguro con tarjeta o PayPal vía Hotmart",
] as const

export default function CheckoutShell({ product }: Props) {
  const [iframeSrc, setIframeSrc] = useState<string | null>(null)
  const [fullPageUrl, setFullPageUrl] = useState(() =>
    buildHotmartPayUrl(product.buyUrl)
  )

  useEffect(() => {
    const search = window.location.search
    setFullPageUrl(buildHotmartPayUrl(product.buyUrl, search))
    setIframeSrc(buildHotmartEmbedUrl(product.buyUrl, search))
  }, [product.buyUrl])

  const discount = getDiscountPercent(product.price, product.originalPrice)
  const discountBadge = formatDiscountBadge(discount)

  return (
    <div className="checkout-shell section-premium-dark">
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
        </aside>

        <div className="checkout-shell__pay">
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
        </div>
      </div>
    </div>
  )
}
