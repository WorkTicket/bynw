"use client"

import { useState, useEffect } from "react"
import { ClockIcon, ShoppingBagIcon } from "@/lib/icons"
import ScrollReveal from "@/components/ScrollReveal"

function getSecondsUntilEndOfDay(): number {
  const now = new Date()
  const end = new Date(now)
  end.setHours(23, 59, 59, 999)
  return Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000))
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}

export default function UrgencyCTA() {
  const [seconds, setSeconds] = useState<number | null>(null)

  useEffect(() => {
    setSeconds(getSecondsUntilEndOfDay())
    const t = setInterval(() => { setSeconds(getSecondsUntilEndOfDay()) }, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="section-premium-dark section-padding overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-dots-rose opacity-[0.04]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-lavender-500/10 blur-3xl" />
        <ClockIcon className="absolute top-10 left-[10%] text-white/10 animate-breathe hidden sm:block" size={32} style={{ animationDelay: "0.5s" }} />
        <ShoppingBagIcon className="absolute bottom-16 right-[8%] text-white/10 animate-sway hidden sm:block" size={30} style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="section relative">
        <ScrollReveal>
          <div className="section-header">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wider text-rose-200 backdrop-blur-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-rose-400 animate-pulse shadow-lg shadow-rose-500/40" />
              Oferta por tiempo limitado
            </div>

            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 shadow-premium-dark backdrop-blur-sm">
              <ClockIcon className="text-rose-300" size={20} />
              <span className="font-mono text-2xl font-bold text-white tracking-widest">{seconds !== null ? formatTime(seconds) : "--:--:--"}</span>
            </div>

            <h2 className="mt-8 font-display text-3xl font-semibold sm:text-5xl lg:text-6xl leading-[1.12] tracking-tight">
              ¿Te apetece empezar un{" "}
              <span className="gradient-text-rose italic">nuevo proyecto</span>?
            </h2>

            <p className="mt-5 text-base max-w-lg mx-auto leading-relaxed sm:text-lg">
              Cientos de artesanas ya están tejiendo con nuestros patrones. Elige tu colección y pon manos a la obra.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {["Descarga inmediata", "Pago seguro", "Soporte WhatsApp"].map((label) => (
                <div key={label} className="flex items-center gap-2 text-white/60">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                    <svg className="h-3.5 w-3.5 text-rose-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a href="/shop" className="btn-lead inline-flex text-base sm:px-12 sm:py-5">
                Ver Colecciones Ahora
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-white/40 text-xs">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Garantía de 7 días. Sin riesgos.
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
