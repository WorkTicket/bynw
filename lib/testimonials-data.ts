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

/**
 * Editorial seed reviews (Spain Spanish).
 * Varied voices/lengths; some include a single finished-product photo.
 */
export const SEED_REVIEWS: Review[] = [
  {
    id: "seed-01-ines-ruiz",
    name: "Inés Ruiz",
    text: "oye no pensaba que me saliera tan bien a la primera el patron de la blancanieves se entiende de verdad sin dar mil vueltas. mi hija se volvio loca cuando se la enseñe",
    rating: 5,
    location: "Madrid",
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
    text: "Llevo años tejiendo y aun asi me sorprendio lo limpio que esta todo. fotos claras abreviaturas en castellano y sin trampas raras a mitad de vuelta. termine el ramo en un finde y ya estoy mirando el siguiente",
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
    text: "compre la coleccion de princesas para regalar y acabe tejiendolas yo jajaja. la bella me salio preciosa el vestido amarillo tiene un movimiento que flipas. mi hermana aun no sabe que es para ella",
    rating: 5,
    location: "Barcelona",
    image: "n2-23-2.webp",
    createdAt: "2026-07-08T08:33:00.000Z",
    source: "seed",
  },
  {
    id: "seed-06-elena-prieto",
    name: "Elena Prieto",
    text: "vale soy principiante total empece con miedo y acabe enganchada. los pasos con foto te salvan la vida cuando no sabes si vas bien gracias de verdad",
    rating: 5,
    location: "Málaga",
    createdAt: "2026-07-03T21:10:00.000Z",
    source: "seed",
  },
  {
    id: "seed-07-patricia-gil",
    name: "Patricia Gil",
    text: "el conejito de chenille quedo blandito y mono lo teji en dos tardes viendo una serie. no es magia pero casi",
    rating: 5,
    location: "Bilbao",
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
    text: "pedi las flores eternas xq me canse de que se me murieran las naturales en el salon. el ramo me ha quedado de escaparate mis amigas preguntan donde lo he comprado y les digo que lo he tejido yo jaja",
    rating: 5,
    location: "Alicante",
    createdAt: "2026-06-21T17:48:00.000Z",
    source: "seed",
  },
  {
    id: "seed-10-silvia-ramos",
    name: "Silvia Ramos",
    text: "Descarga inmediata PDFs ordenados y whatsapp que responde de verdad eso ya merece la pena. luego teji tres muñecas de graduacion para mis sobrinas y lloramos las cuatro un acierto",
    rating: 5,
    location: "Granada",
    createdAt: "2026-06-17T12:30:00.000Z",
    source: "seed",
  },
  {
    id: "seed-11-clara-mendez",
    name: "Clara Méndez",
    text: "no suelo dejar reseñas pero esto si se nota el cariño",
    rating: 5,
    location: "Murcia",
    createdAt: "2026-06-12T09:18:00.000Z",
    source: "seed",
  },
  {
    id: "seed-12-aitana-lopez",
    name: "Aitana López",
    text: "la rosita fresita que os voy a contar detalles por un tubo el sombrero la cestita hasta las fresas diminutas. tarde mas de lo previsto xq me entretenia mirandola merecio cada punto",
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
    text: "empece la virgen un martes por la noche sin muchas expectativas y el domingo ya estaba hecha. las instrucciones van al grano y el resultado me dejo sin palabras la tengo en la mesilla",
    rating: 5,
    location: "Córdoba",
    createdAt: "2026-05-30T08:12:00.000Z",
    source: "seed",
  },
  {
    id: "seed-15-eva-herrero",
    name: "Eva Herrero",
    text: "mola muchisimo volvere a comprar sin pensarlo",
    rating: 5,
    location: "Gijón",
    createdAt: "2026-05-26T18:27:00.000Z",
    source: "seed",
  },
  {
    id: "seed-16-paula-campos",
    name: "Paula Campos",
    text: "hice el ramo de graduacion para una amiga que acababa la carrera el lazo las rosas la muñequita con birrete todo encaja. ella pensaba que lo habia encargado en una tienda cara mi orgullo de tejedora por las nubes",
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
    text: "la muñeca de los girasoles me tiene enamorada ese vestido con relieve yo que siempre me lio con los aumentos aqui no me perdi ni una vez. la puse delante de unas flores de papel y parece de revista",
    rating: 5,
    location: "A Coruña",
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
    text: "soy de las que abandona proyectos a mitad con estos patrones no me ha pasado quizas xq ves el avance en las fotos y te da rabia dejarlo. acabe la fresita con sombrero y ahora quiero la del delantal socorro",
    rating: 5,
    location: "Logroño",
    createdAt: "2026-05-06T19:44:00.000Z",
    source: "seed",
  },
  {
    id: "seed-21-cristina-pardo",
    name: "Cristina Pardo",
    text: "perfecto pa quien teje de noche con sueño y poca paciencia se entiende igual",
    rating: 5,
    location: "Badajoz",
    createdAt: "2026-05-02T22:18:00.000Z",
    source: "seed",
  },
  {
    id: "seed-22-alba-serrano",
    name: "Alba Serrano",
    text: "el pdf llega al momento yo lo abri en el movil en el metro y ya estaba calculando el hilo luego en casa con luz buena todo cuadra nada de paginas borrosas",
    rating: 5,
    location: "Madrid",
    createdAt: "2026-04-28T12:01:00.000Z",
    source: "seed",
  },
  {
    id: "seed-23-miriam-leon",
    name: "Miriam León",
    text: "hice un ramo mixto para el dia de la madre y mi madre no se lo creia esto lo has hecho tu?? si mama con patron y mucha fe",
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
    text: "compre amigurumis chenille xq queria algo gordito y suave pa el bebe de mi prima el resultado es adorable y lo mas importante se teje rapido. en una semana tenia dos ella flipo",
    rating: 5,
    location: "Vigo",
    createdAt: "2026-04-16T11:20:00.000Z",
    source: "seed",
  },
  {
    id: "seed-26-olga-fuentes",
    name: "Olga Fuentes",
    text: "buen material buen precio buen rollo poco mas",
    rating: 5,
    location: "León",
    createdAt: "2026-04-12T18:06:00.000Z",
    source: "seed",
  },
  {
    id: "seed-27-sara-benitez",
    name: "Sara Benítez",
    text: "la coleccion de princesas es un pozo sin fondo en el buen sentido. empiezas por una y acabas eligiendo hilos pa la siguiente las explicaciones no dan nada por supuesto que se agradece cuando llevas tiempo sin agarrar el ganchillo",
    rating: 5,
    location: "Cádiz",
    image: "n2-23-11.webp",
    createdAt: "2026-04-08T08:58:00.000Z",
    source: "seed",
  },
  {
    id: "seed-28-veronica-soler",
    name: "Verónica Soler",
    text: "teji la bella en el coche de copiloto en un viaje largo foto de prueba incluida llegamos y ya casi tenia el vestido mi pareja aun se rie",
    rating: 5,
    location: "Burgos",
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
    text: "habia probado patrones gratis de internet y siempre me faltaba algo una foto una medida un y ahora que. aqui no vas pagina a pagina y el amigurumi va saliendo solito mi primer ramo ya esta en el salon",
    rating: 5,
    location: "Huelva",
    createdAt: "2026-03-27T10:29:00.000Z",
    source: "seed",
  },
  {
    id: "seed-31-carla-montero",
    name: "Carla Montero",
    text: "guay de verdad no esperaba tanto por ese precio",
    rating: 5,
    location: "Ourense",
    createdAt: "2026-03-23T16:51:00.000Z",
    source: "seed",
  },
  {
    id: "seed-32-elena-vazquez",
    name: "Elena Vázquez",
    text: "las muñecas de graduacion las hice en tres tamaños como en la foto del patron quedaron preciosas pa la mesa de la celebracion varias madres me pidieron el enlace ahi lo teneis",
    rating: 5,
    location: "Oviedo",
    createdAt: "2026-03-19T09:07:00.000Z",
    source: "seed",
  },
  {
    id: "seed-33-natalia-romero",
    name: "Natalia Romero",
    text: "soporte rapido patron limpio descarga sin drama asi da gusto comprar online",
    rating: 5,
    location: "Palencia",
    createdAt: "2026-03-15T13:24:00.000Z",
    source: "seed",
  },
  {
    id: "seed-34-paula-delgado",
    name: "Paula Delgado",
    text: "no soy religiosa pero teji la virgen pa mi abuela y bueno se le humedecieron los ojos. el patron respeta los detalles sin volverse imposible eso vale mas que cualquier reseña larga",
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
    text: "el ramo con lazo rosa lo use en una comunion. varias señoras pensaban que era de floristeria cuando dije que era crochet me miraron raro y luego me pidieron foto del patron victoria silenciosa",
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
    text: "blancanieves pa el dormitorio de mi sobrina el lazo rojo la falda amarilla ella la abraza todas las noches si eso no es cinco estrellas no se que lo es",
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
    text: "hay patrones que te dejan a medias y otros que te cogen de la mano estos son de los segundos. empece con miedo a los petalos y acabe haciendo un ramo entero ahora el salon huele a bueno a nada son de lana pero se ven vivas",
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
    text: "la muñeca girasol la teji escuchando podcasts cuatro episodios y casi lista. el vestido con relieve da un trabajo rico de esos que entretienen sin frustrar la corona de flores es lo mas",
    rating: 5,
    location: "Albacete",
    image: "n2-23-9.webp",
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
    text: "rosita otra vez si soy esa esta vez la version con cestita. mis clientas del mercadillo se pelean por ella el patron aguanta repeticiones sin aburrirte que no es facil",
    rating: 5,
    location: "Elche",
    createdAt: "2026-01-28T12:44:00.000Z",
    source: "seed",
  },
  {
    id: "seed-45-lorena-moya",
    name: "Lorena Moya",
    text: "en serio si dudais compradlo luego me dais las gracias",
    rating: 5,
    location: "Girona",
    createdAt: "2026-01-24T20:19:00.000Z",
    source: "seed",
  },
  {
    id: "seed-46-susana-vega",
    name: "Susana Vega",
    text: "teji tres flores distintas del pack y las junte no quedaron identicas a la foto del catalogo mejor xq tienen mi toque pero la base del patron es solida eso es lo que busco yo",
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
    text: "la fresita con delantal la hice pa una profesora detalle del sombrero impecable ella la tiene en la mesa del cole y los niños la tocan todo el dia patron resistente a manitas digamos",
    rating: 5,
    location: "Mérida",
    image: "n2-23-4.webp",
    createdAt: "2026-01-12T11:05:00.000Z",
    source: "seed",
  },
  {
    id: "seed-49-angela-rios",
    name: "Ángela Ríos",
    text: "no soy de escribir mucho solo cinco estrellas volveria a comprar y mi gato ya no se come el ovillo xq estoy demasiado ocupada tejiendo",
    rating: 5,
    location: "Ponferrada",
    createdAt: "2026-01-08T19:40:00.000Z",
    source: "seed",
  },
  {
    id: "seed-50-belen-sastre",
    name: "Belén Sastre",
    text: "empece en noviembre con un amigurumi sencillo y en enero ya tenia medio salon lleno de princesas y flores culpa bonita de estos patrones. claros majos y con ese punto de puedo hacerlo que te empuja a terminar. si estas leyendo esto dudando yo tb dude luego teji luego repeti fin",
    rating: 5,
    location: "Madrid",
    createdAt: "2026-01-04T09:16:00.000Z",
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
