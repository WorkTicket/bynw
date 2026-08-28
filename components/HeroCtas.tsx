import PrimaryCTA from "@/components/PrimaryCTA"

/** Hero CTA — scroll to collections, centered under hero copy. */
export default function HeroCtas() {
  return (
    <div className="mt-8 flex justify-center md:justify-start">
      <PrimaryCTA href="#colecciones" size="lg">
        Ver colecciones
      </PrimaryCTA>
    </div>
  )
}
