export type Product = {
  id: string
  slug: string
  title: string
  /** Short display title for cards and PDP H1. */
  shortTitle: string
  /** Shorter title for <title> / OG / Product schema (≤ ~60 chars). */
  seoTitle: string
  category: string
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
      "Colección de más de 200 Patrones de Princesas Disney + 20 bonos y obsequios",
    shortTitle: "Patrones de Princesas Disney",
    seoTitle: "Patrones Princesas Disney en Crochet o Ganchillo PDF",
    category: "Patrones de crochet o ganchillo digitales",
    price: "15€",
    originalPrice: "30€",
    buyUrl: "https://pay.hotmart.com/L104751068L?checkoutMode=2&off=8o21yf1f",
    buyText: "Comprar ahora",
    description:
      "Más de 200 patrones de princesas Disney en PDF, con instrucciones claras y fotos en cada paso. Para artesanas que buscan resultados bonitos y uniformes.",
    specs:
      "Contenido: más de 200 patrones de Princesas Disney.\nIdioma: español.\nFormato: PDF descargable e imprimible.\nGuía paso a paso con fotos en alta resolución.\nEntrega: acceso inmediato por correo electrónico (e-mail) en cuanto se confirme el pago.\nIncluye vídeos para principiantes (abreviaturas e interpretación de patrones).",
    caption: "Y muchos diseños exclusivos más…",
    images: [
      "imagen-2.webp",
      "imagen-2-1.webp",
      "imagen-2-2.webp",
      "imagen-2-3.webp",
    ],
    bonusImage: "imagen-3.webp",
    bonusDescription:
      "9 bonos exclusivos + 11 obsequios (20 en total): Amigurumis bebés, Amigurumis, patrones día del niño, muñecos para abrazar, sonajero y mantas, bolsas, mantas, almohadones, animalitos + extras: muñecas reversibles, guía de empaque, guía de fotografía, 50 llaveros, Stitch y novia, Virgen del Carmen, Virgen de Guadalupe, guía de abreviaturas, 16 patrones de animalitos, 100 patrones amigurumis.",
    bonusItems: [
      "Crochet o Ganchillo Amigurumis bebés",
      "Crochet o Ganchillo Amigurumis",
      "Patrones en crochet o ganchillo día del niño",
      "Amigurumis muñecos para abrazar",
      "Sonajero y mantas en crochet o ganchillo",
      "Bolsas en crochet o ganchillo",
      "Mantas en crochet o ganchillo",
      "Crochet o Ganchillo almohadones",
      "Animalitos amigurumis",
    ],
    extraGiftTitle: "Obsequios incluidos con tu colección",
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
      "imagen-5.webp",
      "imagen-5-1.webp",
      "imagen-5-2.webp",
      "imagen-5-3.webp",
      "imagen-5-4.webp",
      "imagen-5-5.webp",
      "imagen-5-6.webp",
      "imagen-5-7.webp",
      "imagen-5-8.webp",
      "imagen-5-9.webp",
    ],
    qualityImages: [
      "imagen-6.webp",
      "imagen-6-1.webp",
      "imagen-6-2.webp",
      "imagen-6-3.webp",
    ],
    paymentImage: "imagen-7.webp",
  },
  {
    id: "flores-eternas",
    slug: "flores-eternas",
    title:
      "Colección de más de 200 Patrones de Flores Eternas en Crochet o Ganchillo",
    shortTitle: "Patrones de Flores Eternas",
    seoTitle: "Patrones Flores Eternas en Crochet o Ganchillo PDF",
    category: "Patrones de crochet o ganchillo digitales",
    price: "15€",
    originalPrice: "30€",
    buyUrl: "https://pay.hotmart.com/O106393812M?checkoutMode=2&off=nfyomffe",
    buyText: "Comprar ahora",
    description:
      "Más de 200 patrones de flores en crochet o ganchillo: tulipanes, girasoles, rosas, cactus y muchas más. Con fotos paso a paso, listos para tejer o vender.",
    specs:
      "Contenido: más de 200 patrones (tulipanes, girasoles, margaritas, rosas, cactus, azucenas, claveles, lirios, orquídeas, macetas y más).\nFormato: PDF descargable e imprimible.\nGuía visual paso a paso con fotos.\nIdioma: español.\nIncluye vídeo para montar ramos con papel coreano.\nIncluye vídeos para principiantes (abreviaturas e interpretación de patrones).",
    caption: "Y muchos diseños exclusivos más…",
    images: [
      "imagen-8.webp",
      "imagen-8-1.webp",
      "imagen-8-2.webp",
    ],
    bonusImage: "imagen-9.webp",
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
    extraGiftTitle: "Obsequios incluidos con tu colección",
    extraGiftItems: [],
    deliveryImages: [
      "imagen-10.webp",
      "imagen-10-1.webp",
      "imagen-10-2.webp",
      "imagen-10-3.webp",
      "imagen-10-4.webp",
      "imagen-10-5.webp",
      "imagen-10-6.webp",
      "imagen-10-7.webp",
      "imagen-10-8.webp",
    ],
    qualityImages: [
      "imagen-11.webp",
      "imagen-11-1.webp",
      "imagen-11-2.webp",
      "imagen-11-3.webp",
      "imagen-11-4.webp",
    ],
    paymentImage: "imagen-7.webp",
  },
  {
    id: "amigurumis-chenille",
    slug: "amigurumis-chenille",
    title:
      "Colección de más de 100 Patrones de Amigurumis en Chenille",
    shortTitle: "Patrones de Amigurumis Chenille",
    seoTitle: "Patrones Amigurumis Chenille en Crochet o Ganchillo PDF",
    category: "Patrones de crochet o ganchillo digitales",
    price: "8€",
    originalPrice: "16€",
    buyUrl: "https://pay.hotmart.com/A104843589W?checkoutMode=2&off=a9plv7ym",
    buyText: "Comprar ahora",
    description:
      "Más de 100 patrones de amigurumis en chenille, con acabados cuidados y explicaciones claras. Para tejer en casa o preparar piezas para vender.",
    specs:
      "Contenido: más de 100 patrones únicos.\nFormato: PDF descargable e imprimible.\nGuía visual paso a paso con fotos.\nIdioma: español.\nIncluye vídeos para principiantes (abreviaturas e interpretación de patrones).",
    caption: "Y muchos diseños exclusivos más…",
    images: [
      "imagen-12.webp",
      "imagen-12-1.webp",
    ],
    bonusImage: "imagen-13.webp",
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
    extraGiftTitle: "Obsequios incluidos con tu colección",
    extraGiftItems: [],
    deliveryImages: [
      "imagen-14.webp",
      "imagen-14-1.webp",
      "imagen-14-2.webp",
      "imagen-14-3.webp",
      "imagen-14-4.webp",
      "imagen-14-5.webp",
    ],
    qualityImages: [
      "imagen-15.webp",
      "imagen-15-1.webp",
      "imagen-15-2.webp",
      "imagen-15-3.webp",
    ],
    paymentImage: "imagen-7.webp",
  },
  {
    id: "munecas-premium",
    slug: "munecas-premium",
    title: "Colección de 25 Patrones de Muñecas Premium en Crochet o Ganchillo",
    shortTitle: "Patrones de Muñecas Premium",
    seoTitle: "Patrones Muñecas Premium en Crochet o Ganchillo PDF",
    category: "Patrones de crochet o ganchillo digitales",
    price: "5€",
    originalPrice: "10€",
    buyUrl: "https://pay.hotmart.com/C106728848V?checkoutMode=2&off=gksd63ag",
    buyText: "Comprar ahora",
    description:
      "La Colección Maestra de Muñecas Premium es un compendio digital diseñado para artesanas que buscan elevar la calidad de sus creaciones en crochet o ganchillo. Con 25 patrones únicos, este material técnico proporciona instrucciones detalladas para la elaboración de personajes icónicos, garantizando acabados de alta gama y resultados consistentes.",
    specs:
      "Contenido: 25 patrones digitales de Muñecas Premium.\nIdioma: Español.\nFormato: Archivos PDF descargables e imprimibles.\nMetodología: Guía paso a paso con soporte visual de alta resolución, diseñada para facilitar la ejecución de cada punto y detalle.\nEntrega: Acceso inmediato a tu correo electrónico (e-mail) tras la confirmación de pago.\nIncluye vídeos para principiantes (abreviaturas e interpretación de patrones).",
    caption: "Y muchos diseños exclusivos más…",
    images: ["n2-1.webp", "n2-1-2.webp", "n2-1-3.webp"],
    bonusImage: "n2-2.webp",
    bonusDescription:
      "8 bonos exclusivos: Cuerpo base mini, Muñeca de Novia, Rosita Fresita, Gato Corazón, Colección Scooby doo, Muñecas de Quinceañera, Amigurumi de Policía, Amigurumi Globo aerostático con osito.",
    bonusItems: [
      "Bono 1: Cuerpo base mini",
      "Bono 2: Muñeca de Novia",
      "Bono 3: Rosita Fresita",
      "Bono 4: Gato Corazón",
      "Bono 5: Colección Scooby doo",
      "Bono 6: Muñecas de Quinceañera (15 años)",
      "Bono 7: Amigurumi de Policía",
      "Bono 8: Amigurumi Globo aerostático con osito",
    ],
    extraGiftTitle: "Obsequios incluidos con tu colección",
    extraGiftItems: [],
    deliveryImages: [
      "n2-3.webp",
      "n2-3-1.webp",
      "n2-3-2.webp",
      "n2-3-3.webp",
      "n2-3-4.webp",
    ],
    qualityImages: ["n2-4.webp", "n2-4-1.webp"],
    paymentImage: "imagen-7.webp",
  },
  {
    id: "santos-angeles",
    slug: "santos-angeles",
    title: "Colección Premium de Patrones de Santos y Ángeles en Crochet o Ganchillo",
    shortTitle: "Patrones de Santos y Ángeles",
    seoTitle: "Patrones Santos y Ángeles en Crochet o Ganchillo PDF",
    category: "Patrones de crochet o ganchillo digitales",
    price: "4€",
    originalPrice: "8€",
    buyUrl: "https://pay.hotmart.com/A106745099O?checkoutMode=2&off=lpyfmlhr",
    buyText: "Comprar ahora",
    description:
      "La Colección Premium de Patrones de Santos y Ángeles en Crochet o Ganchillo es un compendio digital diseñado para artesanas que buscan elevar la calidad de sus creaciones en crochet o ganchillo. Con más de 18 patrones únicos, este material técnico proporciona instrucciones detalladas para la elaboración de personajes icónicos, garantizando acabados de alta gama y resultados consistentes.",
    specs:
      "Contenido: Más de 18 patrones digitales de Santos y Ángeles Premium en crochet o ganchillo.\nIdioma: Español.\nFormato: Archivos PDF descargables e imprimibles.\nMetodología: Guía paso a paso con soporte visual de alta resolución, diseñada para facilitar la ejecución de cada punto y detalle.\nEntrega: Acceso inmediato a tu correo electrónico (e-mail) tras la confirmación de pago.\nIncluye vídeos para principiantes (abreviaturas e interpretación de patrones).",
    caption: "Y muchos diseños exclusivos más…",
    images: ["n2-5.webp", "n2-5-1.webp"],
    bonusImage: "n2-6.webp",
    bonusDescription:
      "6 bonos exclusivos: Cuerpo base, Amigurumis de Intensamente, Vaquita, Ovejita rosa, Maestra o Profesora, Snoopy.",
    bonusItems: [
      "Bono 1: Cuerpo base",
      "Bono 2: Amigurumis de Intensamente",
      "Bono 3: Vaquita",
      "Bono 4: Ovejita rosa",
      "Bono 5: Maestra o Profesora",
      "Bono 6: Snoopy",
    ],
    extraGiftTitle: "Obsequios incluidos con tu colección",
    extraGiftItems: [],
    deliveryImages: [
      "n2-7.webp",
      "n2-7-1.webp",
      "n2-7-2.webp",
      "n2-7-3.webp",
      "n2-7-4.webp",
    ],
    qualityImages: ["n2-8.webp", "n2-8-1.webp"],
    paymentImage: "imagen-7.webp",
  },
  {
    id: "navidad",
    slug: "navidad",
    title: "Colección Premium de Patrones de Navidad en Crochet o Ganchillo",
    shortTitle: "Patrones de Navidad",
    seoTitle: "Patrones Navidad en Crochet o Ganchillo PDF",
    category: "Patrones de crochet o ganchillo digitales",
    price: "10€",
    originalPrice: "20€",
    buyUrl: "https://pay.hotmart.com/K106843734P?checkoutMode=2&off=5q9idyvg",
    buyText: "Comprar ahora",
    description:
      "La Colección Premium de Patrones de Navidad en Crochet o Ganchillo es un compendio digital diseñado para artesanas que buscan elevar la calidad de sus creaciones en crochet o ganchillo. Con más de 145 patrones únicos, este material técnico proporciona instrucciones detalladas para la elaboración de personajes icónicos, garantizando acabados de alta gama y resultados consistentes.",
    specs:
      "Contenido: Más de 145 patrones digitales de Navidad Premium en crochet o ganchillo.\nIdioma: Español.\nFormato: Archivos PDF descargables e imprimibles.\nMetodología: Guía paso a paso con soporte visual de alta resolución, diseñada para facilitar la ejecución de cada punto y detalle.\nEntrega: Acceso inmediato a tu correo electrónico (e-mail) tras la confirmación de pago.\nIncluye vídeos para principiantes (abreviaturas e interpretación de patrones).",
    caption: "Y muchos diseños exclusivos más…",
    images: ["n2-9.webp", "n2-9-1.webp", "n2-9-2.webp"],
    bonusImage: "",
    bonusDescription: "",
    bonusItems: [],
    extraGiftTitle: "Obsequios incluidos con tu colección",
    extraGiftItems: [],
    deliveryImages: [
      "n2-10.webp",
      "n2-10-1.webp",
      "n2-10-2.webp",
      "n2-10-3.webp",
      "n2-10-4.webp",
      "n2-10-5.webp",
      "n2-10-6.webp",
      "n2-10-8.webp",
    ],
    qualityImages: [
      "n2-11.webp",
      "n2-11-1.webp",
      "n2-11-2.webp",
      "n2-11-3.webp",
    ],
    paymentImage: "imagen-7.webp",
  },
  {
    id: "halloween",
    slug: "halloween",
    title: "Colección Premium de Patrones de Halloween en Crochet o Ganchillo",
    shortTitle: "Patrones de Halloween",
    seoTitle: "Patrones Halloween en Crochet o Ganchillo PDF",
    category: "Patrones de crochet o ganchillo digitales",
    price: "7€",
    originalPrice: "14€",
    buyUrl: "https://pay.hotmart.com/Q106849178O?checkoutMode=2&off=qvysr7ub",
    buyText: "Comprar ahora",
    description:
      "La Colección Premium de Patrones de Halloween en Crochet o Ganchillo es un compendio digital diseñado para artesanas que buscan elevar la calidad de sus creaciones en crochet o ganchillo. Con 98 patrones únicos, este material técnico proporciona instrucciones detalladas para la elaboración de personajes icónicos, garantizando acabados de alta gama y resultados consistentes.",
    specs:
      "Contenido: 98 patrones digitales de Halloween Premium en crochet o ganchillo.\nIdioma: Español.\nFormato: Archivos PDF descargables e imprimibles.\nMetodología: Guía paso a paso con soporte visual de alta resolución, diseñada para facilitar la ejecución de cada punto y detalle.\nEntrega: Acceso inmediato a tu correo electrónico (e-mail) tras la confirmación de pago.\nIncluye vídeos para principiantes (abreviaturas e interpretación de patrones).",
    caption: "Y muchos diseños exclusivos más…",
    images: ["n2-12.webp", "n2-12-1.webp", "n2-12-2.webp"],
    bonusImage: "",
    bonusDescription: "",
    bonusItems: [],
    extraGiftTitle: "Obsequios incluidos con tu colección",
    extraGiftItems: [],
    deliveryImages: [
      "n2-13.webp",
      "n2-13-1.webp",
      "n2-13-2.webp",
      "n2-13-3.webp",
    ],
    qualityImages: ["n2-14.webp", "n2-14-1.webp", "n2-14-2.webp"],
    paymentImage: "imagen-7.webp",
  },
  {
    id: "flores-reversibles",
    slug: "flores-reversibles",
    title: "Colección Exclusiva de Muñecas de Flores Reversibles en Crochet o Ganchillo",
    shortTitle: "Patrones de Muñecas de Flores Reversibles",
    seoTitle: "Patrones Muñecas Flores Reversibles PDF",
    category: "Patrones de crochet o ganchillo digitales",
    price: "9€",
    originalPrice: "18€",
    buyUrl: "https://pay.hotmart.com/Y106877716H?checkoutMode=2&off=04lt0mna",
    buyText: "Comprar ahora",
    description:
      "La Colección Maestra de Muñecas de Flores Reversibles Premium es un compendio digital diseñado para artesanas que buscan elevar la calidad de sus creaciones en crochet o ganchillo. Con 57 patrones únicos, este material técnico proporciona instrucciones detalladas para la elaboración de personajes icónicos, garantizando acabados de alta gama y resultados consistentes.",
    specs:
      "Contenido: 57 patrones digitales de Muñecas de Flores Reversibles Premium.\nIdioma: Español.\nFormato: Archivos PDF descargables e imprimibles.\nMetodología: Guía paso a paso con soporte visual de alta resolución, diseñada para facilitar la ejecución de cada punto y detalle.\nEntrega: Acceso inmediato a tu correo electrónico (e-mail) tras la confirmación de pago.\nIncluye vídeos para principiantes (abreviaturas e interpretación de patrones).",
    caption: "Y muchos diseños exclusivos más…",
    images: ["n2-15.webp", "n2-15-1.webp", "n2-15-2.webp"],
    bonusImage: "n2-18.webp",
    bonusDescription:
      "5 bonos exclusivos: Jessy de Toy Story, Woody de Toy Story, Colección de princesas mini, Colección de BTS, Colección de la Princesa Tiana.",
    bonusItems: [
      "Bono 1: Patrón de Jessy de Toy Story",
      "Bono 2: Patrón de Woody de Toy Story",
      "Bono 3: Colección de princesas mini",
      "Bono 4: Colección de BTS",
      "Bono 5: Colección de la Princesa Tiana",
    ],
    extraGiftTitle: "Obsequios incluidos con tu colección",
    extraGiftItems: [],
    deliveryImages: [
      "n2-16.webp",
      "n2-16-1.webp",
      "n2-16-2.webp",
      "n2-16-3.webp",
      "n2-16-4.webp",
    ],
    qualityImages: ["n2-19.webp", "n2-19-1.webp", "n2-19-2.webp"],
    paymentImage: "imagen-7.webp",
  },
  {
    id: "profesiones",
    slug: "profesiones",
    title: "Colección de Patrones de Profesiones en Crochet o Ganchillo",
    shortTitle: "Patrones de Profesiones",
    seoTitle: "Patrones Profesiones en Crochet o Ganchillo PDF",
    category: "Patrones de crochet o ganchillo digitales",
    price: "5€",
    originalPrice: "10€",
    buyUrl: "https://pay.hotmart.com/H106878303R?checkoutMode=2&off=kad7djg6",
    buyText: "Comprar ahora",
    description:
      "La Colección Premium de Patrones de Profesiones en Crochet o Ganchillo es un compendio digital diseñado para artesanas que buscan elevar la calidad de sus creaciones en crochet o ganchillo. Con más de 40 patrones únicos, este material técnico proporciona instrucciones detalladas para la elaboración de personajes icónicos, garantizando acabados de alta gama y resultados consistentes.",
    specs:
      "Contenido: 40 patrones digitales de Profesiones Premium en crochet o ganchillo.\nIdioma: Español.\nFormato: Archivos PDF descargables e imprimibles.\nMetodología: Guía paso a paso con soporte visual de alta resolución, diseñada para facilitar la ejecución de cada punto y detalle.\nEntrega: Acceso inmediato a tu correo electrónico (e-mail) tras la confirmación de pago.\nIncluye vídeos para principiantes (abreviaturas e interpretación de patrones).",
    caption: "Y muchos diseños exclusivos más…",
    images: ["n2-20.webp", "n2-20-1.webp"],
    bonusImage: "",
    bonusDescription: "",
    bonusItems: [],
    extraGiftTitle: "Obsequios incluidos con tu colección",
    extraGiftItems: [],
    deliveryImages: ["n2-21.webp", "n2-21-1.webp", "n2-21-2.webp"],
    qualityImages: ["n2-22.webp", "n2-22-1.webp"],
    paymentImage: "imagen-7.webp",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
