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
    <section className="section-pink section-padding overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <BookOpenIcon className="absolute top-10 right-[8%] text-rose-300/20 animate-breathe hidden sm:block" size={36} style={{ animationDelay: "0.5s" }} />
        <PlayCircleIcon className="absolute bottom-16 left-[6%] text-rose-300/15 animate-sway hidden sm:block" size={30} style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="section relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl2 bg-gradient-to-br from-rose-300 to-pink-400 opacity-5 blur-xl" />
            <div className="relative overflow-hidden rounded-2xl2 shadow-2xl ring-1 ring-rose-200/20">
              <div className="aspect-[4/3]">
                <img src="/images/imagen-19.webp" alt="Aprende crochet desde cero" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rose-900/10 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 rounded-2xl2 bg-white/95 p-3 sm:p-4 shadow-soft backdrop-blur-sm border border-rose-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                  <BookOpenIcon size={20} />
                </span>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-ink">100%</p>
                  <p className="text-[9px] sm:text-[10px] text-muted">Para principiantes</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="badge mb-3">Principiantes</span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold text-ink tracking-tight">
              Aprende desde cero:{" "}
              <span className="gradient-text-rose italic">ideal para principiantes</span>
            </h2>
            <p className="mt-5 text-lg text-muted leading-relaxed">
              ¿Acabas de empezar? Cada paquete incluye vídeos teórico-prácticos para principiantes.
              En ellos repasamos abreviaturas y puntadas básicas para que puedas leer los patrones
              con confianza desde el primer día.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {beginnerItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-xl2 bg-white border border-rose-100/60 p-4 transition-all duration-200 hover:bg-rose-50 hover:border-rose-200">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 text-rose-500">
                    <item.icon size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">{item.title}</p>
                    <p className="text-xs text-muted">{item.desc}</p>
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
