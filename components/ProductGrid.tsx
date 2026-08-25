import ProductCard from "./ProductCard"
import PetiteOrnament from "./PetiteOrnament"
import ScrollReveal from "@/components/ScrollReveal"
import PurchaseTrustStrip from "@/components/PurchaseTrustStrip"
import { products, isBestseller } from "@/lib/products"
import { SALE_PERCENT } from "@/lib/offer"

type Props = {
  /** Paid home catalog keeps UTMs by linking to /ads/{slug}?… */
  hrefBase?: "/shop" | "/ads"
  hrefQuery?: string
}

export default function ProductGrid({
  hrefBase = "/shop",
  hrefQuery,
}: Props) {
  return (
    <section id="colecciones" className="section-pink section-padding scroll-mt-24">
      <div className="section">
        <ScrollReveal>
          <div className="section-header">
            <span className="eyebrow">−{SALE_PERCENT}% esta semana</span>
            <PetiteOrnament className="mb-5 mt-1" />
            <h2>
              Elige tu colección{" "}
              <span className="gradient-text-rose italic">favorita</span>
            </h2>
            <p>
              Patrones en PDF con fotos paso a paso, para tejer, regalar o
              vender. Compra una vez y descarga al momento.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-14">
          {products.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 45}>
              <ProductCard
                product={p}
                hrefBase={hrefBase}
                hrefQuery={hrefQuery}
                priority={i < 2}
                featured={isBestseller(p.slug)}
                badge={isBestseller(p.slug) ? "Más vendida" : undefined}
              />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 sm:mt-14">
          <PurchaseTrustStrip />
        </div>
      </div>
    </section>
  )
}
