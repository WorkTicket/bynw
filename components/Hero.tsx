import Image from "next/image"
import HeroCtas from "@/components/HeroCtas"
import { SITE_RATING_DISPLAY } from "@/lib/testimonials-data"

export default function Hero() {
  return (
    <section className="hero-editorial relative flex min-h-[100svh] flex-col overflow-x-clip -mt-[var(--site-header-offset)]">
      <div className="absolute inset-0 overflow-hidden">
        {/* Match client ref (doc image1): head + torso visible, headroom above the doll */}
        <div className="absolute inset-0 origin-[68%_26%] scale-[0.71] translate-y-[6%] sm:origin-[70%_30%] sm:scale-[0.82] sm:translate-y-[3%] lg:origin-[78%_center] lg:scale-100 lg:translate-y-0">
          <Image
            src="/images/hero-editorial.webp"
            alt="Amigurumi de princesa en crochet o ganchillo junto a un ramo de flores eternas tejidas"
            fill
            priority
            fetchPriority="high"
            unoptimized
            sizes="100vw"
            className="object-cover object-[68%_40%] sm:object-[70%_44%] lg:object-[78%_center]"
          />
        </div>

        {/* Mobile: pearl fade behind copy — lighter top so the doll stays visible */}
        <div
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(255, 250, 248, 0.35) 0%,
                transparent 16%
              ),
              linear-gradient(
                to top,
                #fffaf8 0%,
                #fffaf8 26%,
                rgba(255, 250, 248, 0.97) 38%,
                rgba(255, 250, 248, 0.86) 50%,
                rgba(255, 250, 248, 0.48) 62%,
                rgba(255, 250, 248, 0.15) 76%,
                transparent 90%
              )
            `,
          }}
        />

        {/* Desktop: solid pearl behind copy → fade into image */}
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background: `
              linear-gradient(
                92deg,
                #fffaf8 0%,
                #fffaf8 32%,
                rgba(255,250,248,0.97) 40%,
                rgba(255,250,248,0.82) 50%,
                rgba(255,250,248,0.4) 62%,
                rgba(255,250,248,0.1) 74%,
                transparent 86%
              ),
              linear-gradient(
                180deg,
                transparent 72%,
                rgba(250,243,241,0.35) 88%,
                rgba(250,243,241,0.72) 100%
              )
            `,
          }}
        />
      </div>

      <div className="section relative z-10 flex min-h-[100svh] flex-1 flex-col justify-end pb-[calc(var(--sticky-cta-stack)+1.15rem)] pt-[calc(var(--site-header-offset)+1.5rem)] sm:justify-center sm:pb-[calc(var(--sticky-cta-stack)+1.75rem)] sm:pt-[calc(var(--site-header-offset)+2rem)] lg:pb-20">
        <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:max-w-[36rem] lg:text-left">
          <p className="font-script text-[2.25rem] leading-[1.05] text-rose-600 sm:text-[2.85rem] lg:text-[3.25rem] lg:text-rose-500">
            Manos Creativas Bynmw
          </p>

          <h1 className="mt-4 font-display text-[1.95rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:mt-5 sm:text-[2.65rem] lg:text-[3.05rem]">
            Patrones Digitales de{" "}
            <span className="gradient-text-candy italic">Crochet o Ganchillo</span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.65] text-ink/70 sm:mt-5 sm:text-base lg:mx-0 lg:text-muted">
            Colecciones de patrones con fotos paso a paso, instrucciones claras,
            descarga al momento, acceso de por vida.
          </p>

          <p className="mt-3 text-[12px] font-medium tracking-[0.04em] text-rose-600/90 sm:text-[13px]">
            {SITE_RATING_DISPLAY} ★ · descarga inmediata · acceso de por vida
          </p>

          <HeroCtas />
        </div>
      </div>
    </section>
  )
}
