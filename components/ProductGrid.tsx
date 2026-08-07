"use client"

import { Suspense, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "./ProductCard"
import PetiteOrnament from "./PetiteOrnament"
import ScrollReveal from "@/components/ScrollReveal"
import SecondaryCTA from "@/components/SecondaryCTA"
import { products } from "@/lib/products"
import { isMetaPaidTraffic } from "@/lib/paid-traffic"

function ProductGridInner() {
  const searchParams = useSearchParams()
  const paid = useMemo(
    () => isMetaPaidTraffic(searchParams),
    [searchParams]
  )
  const hrefQuery = paid ? searchParams.toString() : ""
  const hrefBase = paid ? "/ads" : "/shop"

  return (
    <section id="colecciones" className="section-pink section-padding scroll-mt-24">
      <div className="section">
        <ScrollReveal>
          <div className="section-header">
            <span className="eyebrow">Colecciones</span>
            <PetiteOrnament className="mb-5 mt-1" />
            <h2>
              Elige tu colección{" "}
              <span className="gradient-text-rose italic">favorita</span>
            </h2>
            <p>
              Patrones en PDF con fotos paso a paso. Compra una vez, descarga al
              momento y teje cuando quieras.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-14">
          {products.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 45}>
              <ProductCard
                product={p}
                hrefBase={hrefBase}
                hrefQuery={hrefQuery || undefined}
                ctaLabel="Comprar ahora"
                priority={i < 2}
              />
            </ScrollReveal>
          ))}
        </div>

        {!paid && (
          <ScrollReveal delay={180}>
            <div className="mt-14 flex justify-center sm:mt-16">
              <SecondaryCTA href="/shop">Explorar la tienda</SecondaryCTA>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}

export default function ProductGrid() {
  return (
    <Suspense
      fallback={
        <section id="colecciones" className="section-pink section-padding scroll-mt-24">
          <div className="section">
            <div className="section-header">
              <span className="eyebrow">Colecciones</span>
              <PetiteOrnament className="mb-5 mt-1" />
              <h2>
                Elige tu colección{" "}
                <span className="gradient-text-rose italic">favorita</span>
              </h2>
              <p>
                Patrones en PDF con fotos paso a paso. Compra una vez, descarga al
                momento y teje cuando quieras.
              </p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-14">
              {products.map((p) => (
                <ProductCard
                  key={p.slug}
                  product={p}
                  ctaLabel="Comprar ahora"
                />
              ))}
            </div>
          </div>
        </section>
      }
    >
      <ProductGridInner />
    </Suspense>
  )
}
