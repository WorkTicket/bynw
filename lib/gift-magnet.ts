export const GIFT_MAGNET = {
  title: "Patrón de las Guerreras K-POP",
  subtitle: "Amigurumi en crochet — muestra gratuita",
  description:
    "Un patrón completo en PDF para que pruebes la calidad de nuestros diseños antes de comprar una colección.",
  features: [
    "Patrón paso a paso con instrucciones claras",
    "Ilustraciones y esquemas incluidos",
    "Lista de materiales y puntadas necesarias",
    "Formato PDF — listo para imprimir o ver en el móvil",
  ],
  filePath: "/gift/patron-guerreras-kpop.pdf",
  downloadPath: "/api/gift",
  fileName: "Patron-Guerreras-KPOP-Manos-Creativas-Bynmw.pdf",
  iosDriveUrl: "https://drive.google.com/drive/folders/1rHI7QJ7TB8pQPHBI_jdsy5iOdx8Q2ahf",
} as const

export function getGiftDownloadUrl(origin?: string): string {
  const base = origin || process.env.NEXT_PUBLIC_SITE_URL || "https://bynmwcreative.com"
  return `${base.replace(/\/$/, "")}${GIFT_MAGNET.downloadPath}`
}
