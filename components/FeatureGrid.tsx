import {
  FileTextIcon,
  BookOpenIcon,
  DownloadIcon,
  InfinityIcon,
} from "@/lib/icons"
import PetiteOrnament from "@/components/PetiteOrnament"
import ScrollReveal from "@/components/ScrollReveal"

const features = [
  {
    icon: (cls: string) => <FileTextIcon className={cls} size={20} />,
    title: "Patrones propios",
    desc: "Diseños de Manos Creativas Bynmw que no verás en otro sitio.",
  },
  {
    icon: (cls: string) => <BookOpenIcon className={cls} size={20} />,
    title: "Fáciles de seguir",
    desc: "Instrucciones paso a paso con fotos. Válidos si empiezas o si ya tienes experiencia.",
  },
  {
    icon: (cls: string) => <DownloadIcon className={cls} size={20} />,
    title: "Descarga inmediata",
    desc: "Recibe tu PDF al instante después del pago. Sin esperas.",
  },
  {
    icon: (cls: string) => <InfinityIcon className={cls} size={20} />,
    title: "Acceso vitalicio",
    desc: "Compra una vez y accede siempre. Incluye actualizaciones gratuitas.",
  },
]

export default function FeatureGrid() {
  return (
    <section className="section-white section-padding">
      <div className="section">
        <ScrollReveal>
          <div className="section-header">
            <span className="eyebrow">Por qué nosotras</span>
            <PetiteOrnament className="mb-5 mt-1" />
            <h2>
              Todo lo que necesitas para{" "}
              <span className="gradient-text-rose italic">crear</span>
            </h2>
            <p>
              Patrones en PDF con fotos claras, vídeos de apoyo y bonos
              incluidos — pensados para tejer con calma y confianza.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-14">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 80}>
              <div className="text-center sm:text-left">
                <div className="icon-bloom mx-auto mb-6 sm:mx-0">
                  {f.icon("text-rose-500")}
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold tracking-tight text-ink sm:text-[1.45rem]">
                  {f.title}
                </h3>
                <p className="text-sm leading-[1.75] text-muted">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
