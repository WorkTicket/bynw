export type Product = {
  id: string
  slug: string
  title: string
  price: string
  originalPrice: string
  buyUrl: string
  buyText: string
  description: string
  specs: string
  caption: string
  images: string[]
  bonusImage: string
  bonusDescription: string
  bonusItems: string[]
  extraGiftTitle: string
  extraGiftItems: string[]
  deliveryImages: string[]
  qualityImages: string[]
  paymentImage: string
}

export const products: Product[] = [
  {
    id: "princesas-disney",
    slug: "princesas-disney",
    title:
      "Colección de más de 200 Patrones de Princesas Disney + 16 bonos de regalo",
    price: "11€",
    originalPrice: "60€",
    buyUrl: "https://pay.hotmart.com/L104751068L?checkoutMode=2&off=8o21yf1f",
    buyText: "OBTENER ACCESO INMEDIATO",
    description:
      "Más de 200 patrones de princesas Disney en PDF, con instrucciones claras y fotos en cada paso. Para artesanas que buscan resultados bonitos y uniformes.",
    specs:
      "Contenido: más de 200 patrones de Princesas Disney.\nIdioma: español.\nFormato: PDF descargable e imprimible.\nGuía paso a paso con fotos en alta resolución.\nEntrega: acceso inmediato por correo en cuanto se confirme el pago.",
    caption: "Y muchos diseños exclusivos más…",
    images: [
      "imagen-2.jpeg",
      "imagen-2-1.jpeg",
      "imagen-2-2.jpeg",
      "imagen-2-3.jpeg",
    ],
    bonusImage: "imagen-3.jpeg",
    bonusDescription:
      "9 bonos exclusivos: Amigurumis bebés, Amigurumis, patrones día del niño, muñecos para abrazar, sonajero y mantas, bolsas, mantas, almohadones, animalitos + extras: muñecas reversibles, guía de empaque, guía de fotografía, 50 llaveros, Stitch y novia, Virgen del Carmen, Virgen de Guadalupe, guía de abreviaturas, 16 patrones de animalitos, 100 patrones amigurumis.",
    bonusItems: [
      "Crochet Amigurumis bebés",
      "Crochet Amigurumis",
      "Patrones en crochet día del niño",
      "Amigurumis muñecos para abrazar",
      "Sonajero y mantas en crochet",
      "Bolsas en crochet",
      "Mantas en crochet",
      "Crochet almohadones",
      "Animalitos amigurumis",
    ],
    extraGiftTitle: "Regalos extra si compras hoy",
    extraGiftItems: [
      "Muñecas Reversibles (Muñeca Rosa, Virgen de Guadalupe y Rapunzel)",
      "Guía para tejer desde cero",
      "Guía básica de empaque",
      "Guía básica de fotografía",
      "50 patrones de llaveros",
      "Patrón de Stitch y su novia Ángel",
      "Patrón de Virgen del Carmen",
      "Patrón de Virgen de Guadalupe",
      "Guía de abreviaturas amigurumis",
      "16 patrones de animalitos",
      "100 patrones amigurumis",
    ],
    deliveryImages: [
      "imagen-5.jpeg",
      "imagen-5-1.jpeg",
      "imagen-5-2.jpeg",
      "imagen-5-3.jpeg",
      "imagen-5-4.jpeg",
      "imagen-5-5.jpeg",
      "imagen-5-6.jpeg",
      "imagen-5-7.jpeg",
      "imagen-5-8.jpeg",
      "imagen-5-9.jpeg",
    ],
    qualityImages: [
      "imagen-6.jpeg",
      "imagen-6-1.jpeg",
      "imagen-6-2.jpeg",
      "imagen-6-3.jpeg",
    ],
    paymentImage: "imagen-7.jpeg",
  },
  {
    id: "flores-eternas",
    slug: "flores-eternas",
    title:
      "Colección de más de 200 Patrones de Flores Eternas en Crochet",
    price: "12€",
    originalPrice: "60€",
    buyUrl: "https://pay.hotmart.com/O106393812M?checkoutMode=2&off=nfyomffe",
    buyText: "OBTENER ACCESO INMEDIATO",
    description:
      "Más de 200 patrones de flores en crochet: tulipanes, girasoles, rosas, cactus y muchas más. Con fotos paso a paso, listos para tejer o vender.",
    specs:
      "Contenido: más de 200 patrones (tulipanes, girasoles, margaritas, rosas, cactus, azucenas, claveles, lirios, orquídeas, macetas y más).\nFormato: PDF descargable e imprimible.\nGuía visual paso a paso con fotos.\nIdioma: español.\nIncluye vídeo para montar ramos con papel coreano.\nIncluye vídeos para principiantes (abreviaturas e interpretación de patrones).",
    caption: "Y muchos diseños exclusivos más…",
    images: [
      "imagen-8.jpeg",
      "imagen-8-1.jpeg",
      "imagen-8-2.jpeg",
    ],
    bonusImage: "imagen-9.jpeg",
    bonusDescription:
      "14 bonos exclusivos: Amigurumis religiosos, Mochi, Rosita Fresita, Harry Potter, Frozen, muñecas de flores reversibles, Chavo del 8, Caperucita Roja, Eva y Wall-e, Lilo y Stitch.",
    bonusItems: [
      "Amigurumis religiosos",
      "Mochi",
      "Rosita Fresita",
      "Colección Harry Potter",
      "Colección Frozen",
      "Muñecas de flores reversibles",
      "Colección Chavo del 8",
      "Colección Caperucita Roja",
      "Eva y Wall-e",
      "Lilo y Stitch",
    ],
    extraGiftTitle: "Regalos extra si compras hoy",
    extraGiftItems: [],
    deliveryImages: [
      "imagen-10.jpeg",
      "imagen-10-1.jpeg",
      "imagen-10-2.jpeg",
      "imagen-10-3.jpeg",
      "imagen-10-4.jpeg",
      "imagen-10-5.jpeg",
      "imagen-10-6.jpeg",
      "imagen-10-7.jpeg",
      "imagen-10-8.jpeg",
    ],
    qualityImages: [
      "imagen-11.jpeg",
      "imagen-11-1.jpeg",
      "imagen-11-2.jpeg",
      "imagen-11-3.jpeg",
      "imagen-11-4.jpeg",
    ],
    paymentImage: "imagen-7.jpeg",
  },
  {
    id: "amigurumis-chenille",
    slug: "amigurumis-chenille",
    title:
      "Colección de más de 100 Patrones de Amigurumis en Chenille",
    price: "8€",
    originalPrice: "60€",
    buyUrl: "https://pay.hotmart.com/A104843589W?checkoutMode=2&off=a9plv7ym",
    buyText: "OBTENER ACCESO INMEDIATO",
    description:
      "Más de 100 patrones de amigurumis en chenille, con acabados cuidados y explicaciones claras. Para tejer en casa o preparar piezas para vender.",
    specs:
      "Contenido: más de 100 patrones únicos.\nFormato: PDF descargable e imprimible.\nGuía visual paso a paso con fotos.\nIdioma: español.",
    caption: "Y muchos diseños exclusivos más…",
    images: [
      "imagen-12.jpeg",
      "imagen-12-1.jpeg",
    ],
    bonusImage: "imagen-13.jpeg",
    bonusDescription:
      "11+ bonos exclusivos: mini amigurumis, conejo orejas largas, 2 abejitas, Stitch en chenille, tulipán, 50 amigurumis adicionales, rosa Antonella, Piggy, guía de ejercicios, princesa Ariel.",
    bonusItems: [
      "Patrones de mini amigurumis",
      "Patrón de conejo orejas largas",
      "2 patrones de abejitas",
      "Patrón de Stitch en chenille",
      "Patrón de tulipán",
      "50 patrones de amigurumis adicionales",
      "Patrón de rosa Antonella",
      "Patrón Piggy",
      "Guía de ejercicios para tejedoras",
      "Patrón de la princesa Ariel",
    ],
    extraGiftTitle: "Regalos extra si compras hoy",
    extraGiftItems: [],
    deliveryImages: [
      "imagen-14.jpeg",
      "imagen-14-1.jpeg",
      "imagen-14-2.jpeg",
      "imagen-14-3.jpeg",
      "imagen-14-4.jpeg",
      "imagen-14-5.jpeg",
    ],
    qualityImages: [
      "imagen-15.jpeg",
      "imagen-15-1.jpeg",
      "imagen-15-2.jpeg",
      "imagen-15-3.jpeg",
    ],
    paymentImage: "imagen-7.jpeg",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
