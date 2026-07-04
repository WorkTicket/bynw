"use client"

import {
  FileTextIcon,
  BookOpenIcon,
  DownloadIcon,
  InfinityIcon,
  ScissorsIcon,
  FlowerIcon,
} from "@/lib/icons"
import ScrollReveal from "@/components/ScrollReveal"

const features = [
  {
    icon: (cls: string) => <FileTextIcon className={cls} size={28} />,
    title: "Patrones propios",
    desc: "Diseños de Manos Creativas Bynmw que no verás en otro sitio.",
  },
  {
    icon: (cls: string) => <BookOpenIcon className={cls} size={28} />,
    title: "Fáciles de Seguir",
    desc: "Instrucciones paso a paso con fotos de apoyo. Válidos si empiezas o si ya tienes experiencia.",
  },
  {
    icon: (cls: string) => <DownloadIcon className={cls} size={28} />,
    title: "Descarga Inmediata",
    desc: "Recibe tu PDF al instante después del pago. Sin esperas, sin complicaciones.",
  },
  {
    icon: (cls: string) => <InfinityIcon className={cls} size={28} />,
    title: "Acceso Vitalicio",
    desc: "Compra una vez y accede a tus patrones para siempre. Incluye actualizaciones gratuitas.",
  },
]

export default function FeatureGrid() {
  return (
    <section className="section-white section-padding overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <ScissorsIcon className="absolute top-8 left-[8%] text-rose-200/25 animate-breathe hidden sm:block" size={36} style={{ animationDelay: "0.5s" }} />
        <FlowerIcon className="absolute bottom-20 right-[10%] text-rose-200/20 animate-sway hidden sm:block" size={32} style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="section relative">
        <ScrollReveal>
          <div className="section-header">
            <span className="badge mb-3">Por qué nosotras</span>
            <h2>
              Todo lo que necesitas para{" "}
              <span className="gradient-text-rose italic">crear</span>
            </h2>
            <p>
              Más de <span className="text-rose-600 font-semibold">500 clientas</span> confían en nosotras para sus proyectos de crochet.
              Patrones en PDF con fotos, vídeos y bonos incluidos.
            </p>
            <div className="section-divider mt-6" />
          </div>
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 80}>
              <div className="cute-card-static group h-full p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 cursor-default text-center">
              <div className="mb-5 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-pink-100 text-rose-500 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:shadow-rose-glow">
                  {f.icon("text-rose-500")}
                </div>
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-ink">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
