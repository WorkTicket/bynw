/** Types + seeded reviews for UI, schema, and KV storage. */

export type Review = {
  id: string
  name: string
  text: string
  rating: number
  location?: string
  /**
   * Single finished-work photo.
   * - Seed/static: filename under /images (e.g. "n2-23.webp")
   * - Uploaded: absolute path like "/api/reviews/image/{id}"
   */
  image?: string
  /** @deprecated Prefer `image`. Kept for older stored reviews. */
  productImages?: string[]
  createdAt: string
  /** Seeded editorial reviews vs visitor-submitted. */
  source: "seed" | "site"
}

export type ReviewInput = {
  name: string
  text: string
  rating: number
  location?: string
  /** Honeypot — must stay empty. */
  website?: string
}

export type AggregateRating = {
  ratingValue: number
  reviewCount: number
  bestRating: number
  worstRating: number
  display: string
}

/** Resolve a review photo URL, or undefined when text-only. */
export function reviewImageSrc(review: Review): string | undefined {
  const raw = review.image || review.productImages?.[0]
  if (!raw) return undefined
  if (raw.startsWith("/") || raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw
  }
  return `/images/${raw}`
}

/** Deterministic PRNG shuffle (SSR-safe when seed matches on client). */
export function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  const arr = items.slice()
  let s = 2166136261
  for (let i = 0; i < seed.length; i++) {
    s ^= seed.charCodeAt(i)
    s = Math.imul(s, 16777619)
  }
  for (let i = arr.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    const j = s % (i + 1)
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  return arr
}

/** Daily seed so photo order feels fresh without hydration mismatch. */
export function dailyShuffleSeed(prefix = "testimonials") {
  return `${prefix}-${new Date().toISOString().slice(0, 10)}`
}

/**
 * Weave photo + text reviews; shuffle photo order so the gallery feels alive.
 */
export function interleaveReviews(reviews: readonly Review[], seed?: string): Review[] {
  const withPhoto = reviews.filter((r) => Boolean(reviewImageSrc(r)))
  const textOnly = reviews.filter((r) => !reviewImageSrc(r))
  const photos = seed ? seededShuffle(withPhoto, seed) : withPhoto.slice()
  const list: Review[] = []
  let p = 0
  let t = 0
  while (p < photos.length || t < textOnly.length) {
    if (p < photos.length) list.push(photos[p++])
    const textBurst = p % 2 === 0 ? 2 : 1
    for (let n = 0; n < textBurst && t < textOnly.length; n++) {
      list.push(textOnly[t++])
    }
  }
  return list
}

/**
 * Editorial seed reviews (Spain Spanish).
 * Varied voices/lengths; some include a single finished-product photo.
 */
export const SEED_REVIEWS: Review[] = [
  {
    id: "seed-01-ines-ruiz",
    name: "Inés Ruiz",
    text: "El patrón de Blancanieves se entiende a la primera. Mi hija no suelta la muñeca.",
    rating: 5,
    location: "Madrid",
    image: "n2-23-1.webp",
    createdAt: "2026-07-22T09:14:00.000Z",
    source: "seed",
  },
  {
    id: "seed-02-carmen-vega",
    name: "Carmen Vega",
    text: "cinco estrellas y punto",
    rating: 5,
    location: "Sevilla",
    createdAt: "2026-07-18T16:40:00.000Z",
    source: "seed",
  },
  {
    id: "seed-03-lucia-moreno",
    name: "Lucía Moreno",
    text: "Llevo años tejiendo y me sorprendió lo claro que está todo. Terminé el ramo en un fin de semana.",
    rating: 5,
    location: "Valencia",
    createdAt: "2026-07-14T11:05:00.000Z",
    source: "seed",
  },
  {
    id: "seed-04-beatriz-alonso",
    name: "Beatriz Alonso",
    text: "me ha encantado muy recomendable",
    rating: 5,
    location: "Zaragoza",
    createdAt: "2026-07-11T19:22:00.000Z",
    source: "seed",
  },
  {
    id: "seed-05-nuria-castillo",
    name: "Nuria Castillo",
    text: "Compré las princesas para regalar y acabé tejiéndolas yo. La Bella quedó preciosa.",
    rating: 5,
    location: "Barcelona",
    createdAt: "2026-07-08T08:33:00.000Z",
    source: "seed",
  },
  {
    id: "seed-06-elena-prieto",
    name: "Elena Prieto",
    text: "Soy principiante y me daba miedo. Los pasos con foto ayudan mucho.",
    rating: 5,
    location: "Málaga",
    createdAt: "2026-07-03T21:10:00.000Z",
    source: "seed",
  },
  {
    id: "seed-07-patricia-gil",
    name: "Patricia Gil",
    text: "El conejito de chenille quedó blandito. Lo hice en dos tardes.",
    rating: 5,
    location: "Bilbao",
    image: "n2-23-5.webp",
    createdAt: "2026-06-28T14:55:00.000Z",
    source: "seed",
  },
  {
    id: "seed-08-raquel-sanz",
    name: "Raquel Sanz",
    text: "calidad brutal",
    rating: 5,
    location: "Valladolid",
    createdAt: "2026-06-25T10:02:00.000Z",
    source: "seed",
  },
  {
    id: "seed-09-marina-ortega",
    name: "Marina Ortega",
    text: "Las flores eternas quedaron muy bonitas en el salón. Parecen de floristería.",
    rating: 5,
    location: "Alicante",
    image: "n2-23-8.webp",
    createdAt: "2026-06-21T17:48:00.000Z",
    source: "seed",
  },
  {
    id: "seed-10-silvia-ramos",
    name: "Silvia Ramos",
    text: "Descarga al momento y PDFs bien ordenados. Tejí tres muñecas de graduación para mis sobrinas.",
    rating: 5,
    location: "Granada",
    image: "n2-23-3.webp",
    createdAt: "2026-06-17T12:30:00.000Z",
    source: "seed",
  },
  {
    id: "seed-11-clara-mendez",
    name: "Clara Méndez",
    text: "No suelo dejar reseñas, pero aquí se nota el cariño.",
    rating: 5,
    location: "Murcia",
    createdAt: "2026-06-12T09:18:00.000Z",
    source: "seed",
  },
  {
    id: "seed-12-aitana-lopez",
    name: "Aitana López",
    text: "La fresita con sombrero tiene un montón de detalle. Me costó un poco, pero mereció la pena.",
    rating: 5,
    location: "Pamplona",
    image: "n2-23-10.webp",
    createdAt: "2026-06-08T20:05:00.000Z",
    source: "seed",
  },
  {
    id: "seed-13-marta-iglesias",
    name: "Marta Iglesias",
    text: "genial para regalar queda muy profesional",
    rating: 5,
    location: "Santander",
    createdAt: "2026-06-04T15:41:00.000Z",
    source: "seed",
  },
  {
    id: "seed-14-rocio-navarro",
    name: "Rocío Navarro",
    text: "Empecé la Virgen un martes y el domingo ya la tenía. Instrucciones claras.",
    rating: 5,
    location: "Córdoba",
    createdAt: "2026-05-30T08:12:00.000Z",
    source: "seed",
  },
  {
    id: "seed-15-eva-herrero",
    name: "Eva Herrero",
    text: "Mola muchísimo. Volveré a comprar sin pensarlo.",
    rating: 5,
    location: "Gijón",
    createdAt: "2026-05-26T18:27:00.000Z",
    source: "seed",
  },
  {
    id: "seed-16-paula-campos",
    name: "Paula Campos",
    text: "Hice el ramo de graduación para una amiga. Pensaba que lo había comprado en una tienda.",
    rating: 5,
    location: "Salamanca",
    image: "n2-23-7.webp",
    createdAt: "2026-05-22T13:50:00.000Z",
    source: "seed",
  },
  {
    id: "seed-17-irene-duarte",
    name: "Irene Duarte",
    text: "patrones claros precio justo y resultado bonito que mas se puede pedir",
    rating: 5,
    location: "Toledo",
    createdAt: "2026-05-18T10:36:00.000Z",
    source: "seed",
  },
  {
    id: "seed-18-sofia-blanco",
    name: "Sofía Blanco",
    text: "La muñeca de girasoles me encantó. Aquí no me perdí con los aumentos.",
    rating: 5,
    location: "A Coruña",
    image: "n2-23-9.webp",
    createdAt: "2026-05-14T16:09:00.000Z",
    source: "seed",
  },
  {
    id: "seed-19-laura-ferrer",
    name: "Laura Ferrer",
    text: "ya van dos colecciones adictivo aviso",
    rating: 5,
    location: "Castellón",
    createdAt: "2026-05-10T07:55:00.000Z",
    source: "seed",
  },
  {
    id: "seed-20-andrea-molina",
    name: "Andrea Molina",
    text: "Suelo dejar proyectos a medias. Con estos patrones terminé la fresita.",
    rating: 5,
    location: "Logroño",
    createdAt: "2026-05-06T19:44:00.000Z",
    source: "seed",
  },
  {
    id: "seed-21-cristina-pardo",
    name: "Cristina Pardo",
    text: "Perfecto para tejer de noche, con sueño y poca paciencia.",
    rating: 5,
    location: "Badajoz",
    createdAt: "2026-05-02T22:18:00.000Z",
    source: "seed",
  },
  {
    id: "seed-22-alba-serrano",
    name: "Alba Serrano",
    text: "El PDF llega al momento. Lo abrí en el móvil y en casa todo cuadraba.",
    rating: 5,
    location: "Madrid",
    createdAt: "2026-04-28T12:01:00.000Z",
    source: "seed",
  },
  {
    id: "seed-23-miriam-leon",
    name: "Miriam León",
    text: "Hice un ramo mixto para el Día de la Madre. Mi madre no se lo creía.",
    rating: 5,
    location: "Jaén",
    image: "n2-23-6.webp",
    createdAt: "2026-04-24T09:47:00.000Z",
    source: "seed",
  },
  {
    id: "seed-24-nerea-vidal",
    name: "Nerea Vidal",
    text: "una pasada se nota que estan hechos por alguien que teje de verdad",
    rating: 5,
    location: "Tarragona",
    createdAt: "2026-04-20T15:33:00.000Z",
    source: "seed",
  },
  {
    id: "seed-25-julia-cabrera",
    name: "Julia Cabrera",
    text: "Quería algo blandito para el bebé de mi prima. En una semana tenía dos hechos.",
    rating: 5,
    location: "Vigo",
    createdAt: "2026-04-16T11:20:00.000Z",
    source: "seed",
  },
  {
    id: "seed-26-olga-fuentes",
    name: "Olga Fuentes",
    text: "Buen material, buen precio. Poco más que decir.",
    rating: 5,
    location: "León",
    createdAt: "2026-04-12T18:06:00.000Z",
    source: "seed",
  },
  {
    id: "seed-27-sara-benitez",
    name: "Sara Benítez",
    text: "Diez princesas en dos meses. Cada patrón explica bien sin aburrir.",
    rating: 5,
    location: "Cádiz",
    image: "n2-23-11.webp",
    createdAt: "2026-04-08T08:58:00.000Z",
    source: "seed",
  },
  {
    id: "seed-28-veronica-soler",
    name: "Verónica Soler",
    text: "Tejí a Bella en el coche, de copiloto. Llegamos y casi tenía el vestido.",
    rating: 5,
    location: "Burgos",
    image: "n2-23-2.webp",
    createdAt: "2026-04-04T14:15:00.000Z",
    source: "seed",
  },
  {
    id: "seed-29-diana-reyes",
    name: "Diana Reyes",
    text: "recomiendo sin dudar sobre todo si vendes o regalas",
    rating: 5,
    location: "Almería",
    createdAt: "2026-03-31T20:42:00.000Z",
    source: "seed",
  },
  {
    id: "seed-30-ines-perez",
    name: "Inés Pérez",
    text: "Antes probaba patrones gratis y siempre faltaba algo. Aquí va todo claro.",
    rating: 5,
    location: "Huelva",
    createdAt: "2026-03-27T10:29:00.000Z",
    source: "seed",
  },
  {
    id: "seed-31-carla-montero",
    name: "Carla Montero",
    text: "Guay, la verdad. No esperaba tanto por ese precio.",
    rating: 5,
    location: "Ourense",
    createdAt: "2026-03-23T16:51:00.000Z",
    source: "seed",
  },
  {
    id: "seed-32-elena-vazquez",
    name: "Elena Vázquez",
    text: "Las muñecas de graduación quedaron preciosas para la mesa de la celebración.",
    rating: 5,
    location: "Oviedo",
    createdAt: "2026-03-19T09:07:00.000Z",
    source: "seed",
  },
  {
    id: "seed-33-natalia-romero",
    name: "Natalia Romero",
    text: "Soporte rápido, patrón limpio y descarga sin líos.",
    rating: 5,
    location: "Palencia",
    createdAt: "2026-03-15T13:24:00.000Z",
    source: "seed",
  },
  {
    id: "seed-34-paula-delgado",
    name: "Paula Delgado",
    text: "Tejí la Virgen para mi abuela. El patrón es difícil, pero se puede seguir.",
    rating: 5,
    location: "Ávila",
    image: "n2-23.webp",
    createdAt: "2026-03-11T17:38:00.000Z",
    source: "seed",
  },
  {
    id: "seed-35-lidia-aguilar",
    name: "Lidia Aguilar",
    text: "corto y al pie funciona",
    rating: 5,
    location: "Ciudad Real",
    createdAt: "2026-03-07T11:12:00.000Z",
    source: "seed",
  },
  {
    id: "seed-36-marina-cruz",
    name: "Marina Cruz",
    text: "Usé el ramo con lazo rosa en una comunión. Varias señoras pensaban que era de floristería.",
    rating: 5,
    location: "Segovia",
    createdAt: "2026-03-03T19:55:00.000Z",
    source: "seed",
  },
  {
    id: "seed-37-blanca-torres",
    name: "Blanca Torres",
    text: "me gusta que no hinchen el pdf con mil paginas vacias vas a lo que importa tejer",
    rating: 5,
    location: "Cuenca",
    createdAt: "2026-02-27T08:40:00.000Z",
    source: "seed",
  },
  {
    id: "seed-38-ainhoa-martin",
    name: "Ainhoa Martín",
    text: "Blancanieves para el dormitorio de mi sobrina. La abraza todas las noches.",
    rating: 5,
    location: "San Sebastián",
    createdAt: "2026-02-22T14:03:00.000Z",
    source: "seed",
  },
  {
    id: "seed-39-teresa-nieto",
    name: "Teresa Nieto",
    text: "lo compre un poco a ciegas acierto total",
    rating: 5,
    location: "Lugo",
    createdAt: "2026-02-18T21:16:00.000Z",
    source: "seed",
  },
  {
    id: "seed-40-claudia-ibanez",
    name: "Claudia Ibáñez",
    text: "Patrones que te guían paso a paso. Acabé un ramo entero sin atascarme.",
    rating: 5,
    location: "Teruel",
    createdAt: "2026-02-14T10:28:00.000Z",
    source: "seed",
  },
  {
    id: "seed-41-yolanda-soto",
    name: "Yolanda Soto",
    text: "ideal si te aburre tejer siempre lo mismo aqui hay variedad de sobra",
    rating: 5,
    location: "Zamora",
    createdAt: "2026-02-10T15:49:00.000Z",
    source: "seed",
  },
  {
    id: "seed-42-elisa-cano",
    name: "Elisa Cano",
    text: "La muñeca girasol la hice en cuatro pódcasts. El vestido con relieve quedó muy bonito.",
    rating: 5,
    location: "Albacete",
    createdAt: "2026-02-06T09:31:00.000Z",
    source: "seed",
  },
  {
    id: "seed-43-pilar-rubio",
    name: "Pilar Rubio",
    text: "despues de años tejiendo a ojo me vino bien un patron bien escrito se agradece el rigor",
    rating: 5,
    location: "Soria",
    createdAt: "2026-02-02T18:07:00.000Z",
    source: "seed",
  },
  {
    id: "seed-44-gema-pastor",
    name: "Gema Pastor",
    text: "La Rosita con cestita es la que más me piden en el mercadillo.",
    rating: 5,
    location: "Elche",
    createdAt: "2026-01-28T12:44:00.000Z",
    source: "seed",
  },
  {
    id: "seed-45-lorena-moya",
    name: "Lorena Moya",
    text: "En serio, si dudáis, comprad. Luego me dais las gracias.",
    rating: 5,
    location: "Girona",
    createdAt: "2026-01-24T20:19:00.000Z",
    source: "seed",
  },
  {
    id: "seed-46-susana-vega",
    name: "Susana Vega",
    text: "Tejí tres flores del pack y no quedaron iguales, pero la base del patrón es sólida.",
    rating: 5,
    location: "Manresa",
    createdAt: "2026-01-20T08:53:00.000Z",
    source: "seed",
  },
  {
    id: "seed-47-rita-camacho",
    name: "Rita Camacho",
    text: "bonito util y sin letra pequeña rara me gusta",
    rating: 5,
    location: "Jerez de la Frontera",
    createdAt: "2026-01-16T14:27:00.000Z",
    source: "seed",
  },
  {
    id: "seed-48-marta-quintero",
    name: "Marta Quintero",
    text: "La fresita con delantal la hice para una profesora. Los peques la tocan todo el día.",
    rating: 5,
    location: "Mérida",
    image: "n2-23-4.webp",
    createdAt: "2026-01-12T11:05:00.000Z",
    source: "seed",
  },
  {
    id: "seed-49-angela-rios",
    name: "Ángela Ríos",
    text: "Cinco estrellas. Volvería a comprar sin dudarlo.",
    rating: 5,
    location: "Ponferrada",
    createdAt: "2026-01-08T19:40:00.000Z",
    source: "seed",
  },
  {
    id: "seed-50-belen-sastre",
    name: "Belén Sastre",
    text: "Empecé con un amigurumi sencillo y en enero ya tenía el salón lleno de princesas.",
    rating: 5,
    location: "Madrid",
    createdAt: "2026-01-04T09:16:00.000Z",
    source: "seed",
  },
  {
    id: "seed-51-lola-marquez",
    name: "Lola Márquez",
    text: "El unicornio quedó precioso. Mis sobrinas ya pelean por quedárselo.",
    rating: 5,
    location: "Málaga",
    image: "n2-23-12.webp",
    createdAt: "2026-07-29T16:20:00.000Z",
    source: "seed",
  },
  {
    id: "seed-52-celia-romano",
    name: "Celia Romano",
    text: "La Rapunzel de chenille quedó preciosa. El pelo llevó tiempo, pero mereció la pena.",
    rating: 5,
    location: "Valencia",
    image: "n2-23-13.webp",
    createdAt: "2026-07-30T11:05:00.000Z",
    source: "seed",
  },
]

/** @deprecated Prefer listPublishedReviews() — kept for sync imports. */
export const featuredTestimonials = SEED_REVIEWS

export function computeAggregate(reviews: Review[]): AggregateRating {
  if (reviews.length === 0) {
    return {
      ratingValue: 5,
      reviewCount: 0,
      bestRating: 5,
      worstRating: 1,
      display: "5.0",
    }
  }

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  const ratingValue = Math.round((sum / reviews.length) * 10) / 10

  return {
    ratingValue,
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
    display: ratingValue.toFixed(1),
  }
}

/** Sync fallback when async store is unavailable (build / static). */
export const SITE_RATING = {
  ratingValue: 5,
  reviewCount: SEED_REVIEWS.length,
  bestRating: 5,
} as const

export const SITE_RATING_DISPLAY = "5.0"
