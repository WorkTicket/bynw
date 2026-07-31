import {
  BookOpenIcon,
  PlayCircleIcon,
  ListIcon,
  MessageCircleIcon,
  DownloadIcon,
} from "@/lib/icons"

const beginnerItems = [
  { icon: PlayCircleIcon, title: "Videos explicativos", desc: "Para cada técnica y puntada" },
  { icon: ListIcon, title: "Abreviaturas claras", desc: "Todos los símbolos explicados" },
  { icon: MessageCircleIcon, title: "Soporte WhatsApp", desc: "Ayuda personalizada de Natalia" },
  { icon: DownloadIcon, title: "Acceso inmediato", desc: "Descarga nada más comprar" },
]

export default function BeginnerCallout() {
  return (
    <section className="section-pink section-padding">
      <div className="section">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative overflow-hidden">
            <div className="aspect-[4/3]">
              <img
                src="/images/imagen-19.webp"
                alt="Aprende crochet desde cero"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div>
            <span className="eyebrow">Principiantes</span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Aprende desde cero:{" "}
              <span className="gradient-text-rose italic">ideal para principiantes</span>
            </h2>
            <p className="mt-5 text-base text-muted leading-relaxed sm:text-lg">
              ¿Acabas de empezar? Cada paquete incluye vídeos teórico-prácticos para
              principiantes. En ellos repasamos abreviaturas y puntadas básicas para
              que puedas leer los patrones con confianza desde el primer día.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {beginnerItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                    <item.icon size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
