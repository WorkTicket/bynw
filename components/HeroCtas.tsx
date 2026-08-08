import PrimaryCTA from "@/components/PrimaryCTA"

/** Hero CTA — scroll to collections, centered under hero copy. */
export default function HeroCtas() {
  return (
    <div className="mt-6 flex justify-center sm:mt-8 lg:justify-start">
      <PrimaryCTA href="/#colecciones" size="lg">
        Ver colecciones
      </PrimaryCTA>
    </div>
  )
}
