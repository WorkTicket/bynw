import Link from "next/link"
import ProductCard from "./ProductCard"
import PetiteOrnament from "./PetiteOrnament"
import ScrollReveal from "@/components/ScrollReveal"
import { products } from "@/lib/products"

export default function ProductGrid() {
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
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={180}>
          <div className="mt-14 flex justify-center sm:mt-16">
            <Link href="/shop" className="btn-secondary min-h-[3.15rem] px-9 py-3.5">
              Explorar la tienda
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
