import type { Metadata } from "next"
import Testimonials from "@/components/Testimonials"
import ImageCarousel from "@/components/ImageCarousel"

export const metadata: Metadata = {
  title: "Testimonios",
  description:
    "Lo que dicen nuestras clientas sobre las colecciones de patrones de crochet de Manos Creativas Bynmw.",
}

const reviewScreenshots = [
  "imagen-18.webp",
  "imagen-18-1.webp",
  "imagen-18-2.webp",
  "imagen-18-3.webp",
  "imagen-18-4.webp",
  "imagen-18-5.webp",
]

export default function TestimonialsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-wine-50/80 to-white pt-28 pb-12">
        <div className="section text-center">
          <span className="badge">Testimonios</span>
          <h1 className="mt-4 font-display text-6xl font-bold text-ink sm:text-7xl lg:text-8xl">
            +500 Artesanas{" "}
            <span className="gradient-text">confían en nosotros</span>
          </h1>
          <p className="mt-4 text-lg text-ink/50 max-w-2xl mx-auto">
            Cada semana nos llegan mensajes de clientas que han dado un buen uso
            a nuestros patrones. Aquí van algunas de sus historias.
          </p>
        </div>
      </section>

      <div className="scallop-divider" />

      <section className="relative overflow-hidden bg-white section-padding pt-0">
        <div className="section">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl2 bg-gradient-to-br from-wine-50/50 to-white border border-wine-100/30 shadow-card p-6 md:p-8">
              <div className="text-center mb-6">
                <span className="badge bg-rose-100 text-rose-700">Capturas Reales</span>
                <h2 className="mt-3 font-display text-4xl font-bold text-ink">
                  Lo que dicen nuestras clientas
                </h2>
                <p className="mt-1 text-sm text-ink/50">
                  Desliza para ver más testimonios
                </p>
              </div>
              <ImageCarousel images={reviewScreenshots} interval={3000} alt="Captura de testimonio de cliente" />
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="relative overflow-hidden bg-gradient-to-b from-white to-wine-50/30 section-padding pt-0">
        <div className="section">
          <div className="mx-auto max-w-2xl text-center">
            <div className="rounded-2xl2 bg-white border border-wine-100/30 shadow-card p-8 md:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-xs font-bold text-rose-700 mb-4">
                <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                Comparte tu experiencia
              </span>
              <h2 className="font-display text-4xl font-bold text-ink">
                ¿Ya compraste alguna colección?
              </h2>
              <p className="mt-3 text-ink/50">
            Cuéntanos cómo te fue y ayuda a otras artesanas a decidirse.
            Tu opinión nos viene de perlas.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/573008504709"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-base px-8 py-4"
                >
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Enviar mi opinión
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
