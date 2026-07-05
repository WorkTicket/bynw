"use client"

import LeadMagnet from "./LeadMagnet"
import { useCountry } from "./CountryProvider"
import { ShoppingBagIcon, ScissorsIcon, FlowerIcon, CrochetHookIcon } from "@/lib/icons"

export default function Hero() {
  const country = useCountry()
  const heroPrice = country === "MX" ? "MX$173" : "8€"

  return (
    <section className="hero-cute relative min-h-[calc(100dvh-7rem)] overflow-hidden pt-8 pb-20 sm:pt-20 sm:pb-24 lg:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-dots-rose opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-rose-300/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-lavender-200/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/20 blur-3xl" />

        <ScissorsIcon className="absolute top-10 right-[10%] text-rose-300/30 animate-sway hidden sm:block" size={40} style={{ animationDelay: "0.3s" }} />
        <FlowerIcon className="absolute top-16 left-[12%] text-rose-300/25 animate-float hidden lg:block" size={36} style={{ animationDelay: "1.7s" }} />
        <CrochetHookIcon className="absolute top-24 left-[18%] text-rose-400/25 animate-drift hidden sm:block" size={34} style={{ animationDelay: "0.9s" }} />
        <FlowerIcon className="absolute bottom-32 right-[15%] text-pink-300/30 animate-breathe hidden sm:block" size={28} style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="section relative z-10 flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 xl:gap-16">
        {/* Copy — second on mobile, left on desktop */}
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/60 bg-white/85 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-rose-600 shadow-sm backdrop-blur-sm mb-5 sm:mb-6">
            <span className="flex h-2 w-2 rounded-full bg-rose-400 animate-pulse shadow-sm shadow-rose-400/50" />
            +500 clientas satisfechas
          </div>

          <h1 className="font-display text-[2rem] font-semibold leading-[1.1] text-ink sm:text-5xl lg:text-[3.25rem] xl:text-6xl tracking-tight max-w-xl">
            Patrones Digitales de{" "}
            <span className="gradient-text-candy italic">Crochet</span>
          </h1>

          <p className="mt-4 max-w-md text-base text-muted leading-relaxed sm:mt-5 sm:text-lg lg:max-w-lg">
            Patrones en PDF de{" "}
            <span className="font-medium text-rose-600">Amigurumis</span>,{" "}
            <span className="font-medium text-rose-600">Princesas Disney</span> y{" "}
            <span className="font-medium text-rose-600">Flores Eternas</span>.
            Tanto si empiezas como si ya llevas años tejiendo. <span className="text-rose-400">♡</span>
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-5 lg:justify-start">
            {["Descarga al momento", "Pago seguro", "Ayuda por WhatsApp"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-pink-100 text-rose-500 shadow-sm">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm text-muted">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:justify-start">
            <a href="/shop" className="btn-cute w-full sm:w-auto text-sm sm:text-base px-8 py-4 inline-flex items-center justify-center gap-2">
              <ShoppingBagIcon className="text-white/90" size={18} />
              Ver Colecciones
            </a>
            <a href="/about" className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4">
              Conocer más
            </a>
          </div>

          <div className="mt-8 w-full max-w-lg rounded-2xl2 glass-rose border border-rose-100/80 p-6 shadow-soft sm:p-7 lg:max-w-xl">
            <div className="mb-5 flex items-start gap-3">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400/20 to-pink-400/20 text-lg">
                ✨
              </span>
              <p className="font-display text-base font-semibold leading-snug text-ink sm:text-lg">
                Descarga gratis el patrón de las Guerreras K-POP{" "}
                <span className="gradient-text-rose">y comprueba la calidad</span>
              </p>
            </div>
            <LeadMagnet variant="hero" submitLabel="Quiero mi patrón gratis" />
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <div className="flex -space-x-2">
              {["imagen-18.jpeg", "imagen-18-1.jpeg", "imagen-18-2.jpeg", "imagen-18-3.jpeg"].map((img) => (
                <div key={img} className="h-9 w-9 overflow-hidden rounded-full border-2 border-white shadow-md ring-1 ring-rose-200/50">
                  <img src={`/images/${img}`} alt="Cliente satisfecha" className="h-full w-full object-cover" />
                </div>
              ))}
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-rose-400 to-pink-500 text-[10px] font-bold text-white shadow-md ring-1 ring-rose-200/50">
                +500
              </div>
            </div>
            <span className="text-xs text-muted text-center sm:text-left">
              Únete a +500 artesanas satisfechas <span className="text-rose-400">♡</span>
            </span>
          </div>
        </div>

        {/* Image — first on mobile, right on desktop */}
        <div className="order-1 relative mx-auto w-full max-w-lg lg:order-2 lg:max-w-none animate-fade-in-up">
          <div className="relative">
            <div className="absolute -inset-3 rounded-4xl bg-gradient-to-br from-rose-200/50 via-pink-200/40 to-lavender-200/40 blur-xl opacity-70" />
            <div className="relative overflow-hidden rounded-3xl2 bg-rose-50/50 shadow-premium ring-2 ring-white/80">
              <img
                src="/images/imagen-1.jpeg"
                alt="Colección Maestra de Patrones de Amigurumis y Flores en Crochet"
                className="block h-auto w-full object-contain transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rose-900/10 via-transparent to-white/10" />
            </div>

            <div className="absolute -bottom-3 left-0 sm:left-4 sm:-bottom-4 animate-float rounded-2xl bg-white/95 px-4 py-3 shadow-premium border border-rose-100/80 backdrop-blur-sm z-10 text-left">
              <p className="text-sm font-bold gradient-text-rose">+500 Patrones</p>
              <p className="text-[10px] text-muted">en 3 colecciones</p>
            </div>
            <div className="absolute -top-3 right-4 sm:-top-4 animate-float rounded-2xl bg-white/95 px-4 py-3 shadow-premium border border-rose-200/60 backdrop-blur-sm z-10 text-center sm:text-left" style={{ animationDelay: "2s" }}>
              <p className="text-sm font-bold gradient-text-rose">Desde {heroPrice}</p>
              <p className="text-[10px] text-muted">Acceso vitalicio</p>
            </div>

            <ScissorsIcon className="absolute -top-2 -left-1 text-rose-400/40 animate-breathe hidden sm:block" size={20} />
            <FlowerIcon className="absolute -bottom-1 -right-1 text-pink-400/45 animate-sway hidden sm:block" size={18} style={{ animationDelay: "1s" }} />
          </div>
        </div>
      </div>
    </section>
  )
}
