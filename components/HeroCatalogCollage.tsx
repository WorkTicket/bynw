import Image from "next/image"

const SHOTS = [
  {
    src: "/images/imagen-2.webp",
    alt: "Princesas de cuento en crochet o ganchillo",
  },
  {
    src: "/images/imagen-8.webp",
    alt: "Flores eternas tejidas en crochet",
  },
  {
    src: "/images/imagen-12.webp",
    alt: "Amigurumis en chenille",
  },
  {
    src: "/images/n2-15.webp",
    alt: "Muñecas de flores reversibles",
  },
  {
    src: "/images/n2-9.webp",
    alt: "Patrones de Navidad en crochet",
  },
  {
    src: "/images/n2-12.webp",
    alt: "Patrones de Halloween en crochet",
  },
] as const

/** Equal mosaic so a many-options ad matches the hero — not one princess photo. */
export default function HeroCatalogCollage() {
  return (
    <div className="hero-catalog-collage grid aspect-[3/2] w-full grid-cols-3 grid-rows-2 gap-1.5 sm:gap-2 lg:gap-2.5">
      {SHOTS.map((shot, i) => (
        <div
          key={shot.src}
          className="relative h-full min-h-0 overflow-hidden rounded-xl bg-rose-50/60 ring-1 ring-rose-100/70 sm:rounded-2xl"
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            priority={i < 3}
            fetchPriority={i === 0 ? "high" : "auto"}
            unoptimized
            sizes="(max-width: 1024px) 33vw, 16vw"
            className="object-cover object-center"
          />
        </div>
      ))}
    </div>
  )
}
