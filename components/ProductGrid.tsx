"use client"

import Link from "next/link"
import ProductCard from "./ProductCard"
import ScrollReveal from "@/components/ScrollReveal"
import { products } from "@/lib/products"
import { ShoppingBagIcon } from "@/lib/icons"

export default function ProductGrid() {
  return (
    <section className="section-pink section-padding overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <ShoppingBagIcon className="absolute top-8 left-[10%] text-rose-300/20 animate-breathe hidden sm:block" size={34} style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="section relative">
        <ScrollReveal>
          <div className="section-header">
            <span className="badge mb-3">Colecciones</span>
            <h2>
              Elige tu colección{" "}
              <span className="gradient-text-rose italic">favorita</span>
            </h2>
            <p>
              Cada colección incluye patrones detallados en PDF con fotos paso a paso.
            </p>
            <div className="section-divider mt-6" />
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 120}>
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="mt-10 flex justify-center sm:mt-12">
            <Link
              href="/shop"
              className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4"
            >
              Ver todas las colecciones
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
