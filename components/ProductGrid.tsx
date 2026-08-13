import ProductCard from "./ProductCard"
import PetiteOrnament from "./PetiteOrnament"
import ScrollReveal from "@/components/ScrollReveal"
import SecondaryCTA from "@/components/SecondaryCTA"
import { products } from "@/lib/products"

type Props = {
  /** Paid home catalog keeps UTMs by linking to /ads/{slug}?… */
  hrefBase?: "/shop" | "/ads"
  hrefQuery?: string
}

export default function ProductGrid({
  hrefBase = "/shop",
  hrefQuery,
}: Props) {
  const paid = hrefBase === "/ads"

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
                hrefQuery={hrefQuery}
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
