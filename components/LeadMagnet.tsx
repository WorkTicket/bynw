"use client"

import { useState } from "react"
import { GIFT_MAGNET } from "@/lib/gift-magnet"

type Props = {
  variant?: "inline" | "hero" | "compact"
  submitLabel?: string
  placeholder?: string
  source?: string
  dark?: boolean
}

function LeadMagnetSuccess({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`rounded-2xl2 border p-5 sm:p-6 text-left ${
        dark
          ? "border-white/15 bg-white/10 backdrop-blur-sm"
          : "border-rose-200 bg-rose-50/60"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            dark ? "bg-rose-400/25 text-rose-200" : "bg-rose-400/20 text-rose-500"
          }`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className={`font-semibold ${dark ? "text-white" : "text-ink"}`}>
            ¡Listo! Ya puedes descargar tu regalo
          </p>
          <p className={`mt-1 text-sm ${dark ? "text-white/60" : "text-muted"}`}>
            Tu patrón está disponible aquí mismo. Pulsa el botón para guardarlo en tu dispositivo.
          </p>
        </div>
      </div>

      <div
        className={`mt-4 rounded-xl border p-4 ${
          dark ? "border-white/10 bg-night/40" : "border-rose-100 bg-white"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
              dark ? "bg-rose-500/20 text-rose-200" : "bg-gradient-to-br from-rose-100 to-pink-100 text-rose-500"
            }`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className={`text-sm font-semibold ${dark ? "text-white" : "text-ink"}`}>
              {GIFT_MAGNET.title}
            </p>
            <p className={`mt-0.5 text-xs ${dark ? "text-white/50" : "text-muted"}`}>
              {GIFT_MAGNET.subtitle}
            </p>
          </div>
        </div>

        <ul className={`mt-3 space-y-1.5 ${dark ? "text-white/70" : "text-muted"}`}>
          {GIFT_MAGNET.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs sm:text-sm">
              <svg
                className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${dark ? "text-rose-300" : "text-rose-500"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={GIFT_MAGNET.filePath}
        download={GIFT_MAGNET.fileName}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 px-6 py-3.5 text-sm font-semibold tracking-wide text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-rose-glow active:scale-[0.98]"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Descargar patrón PDF
      </a>

      <p className={`mt-3 text-center text-xs ${dark ? "text-white/35" : "text-muted/50"}`}>
        El PDF se guardará en tu carpeta de descargas.
      </p>
    </div>
  )
}

export default function LeadMagnet({ variant = "inline", submitLabel, placeholder, source = "hero", dark = false }: Props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source }),
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
      setName(""); setEmail("")
    } catch { setStatus("error") }
  }

  if (status === "success") {
    return <LeadMagnetSuccess dark={dark} />
  }

  const isHero = variant === "hero"
  const isCompact = variant === "compact"

  const inputClass = dark
    ? "w-full rounded-xl border-2 border-white/20 bg-white/10 pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/40 transition-all duration-200 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300/25"
    : isHero
    ? "w-full rounded-xl border-2 border-rose-200/70 bg-white pl-11 pr-4 py-3.5 text-base text-ink placeholder:text-muted/45 shadow-sm transition-all duration-200 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/25"
    : "w-full rounded-xl border-2 border-rose-200/60 bg-white pl-11 pr-4 py-3 text-sm text-ink placeholder:text-muted/40 transition-all duration-200 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400"

  const iconClass = dark ? "text-white/40" : "text-muted/40"

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`flex w-full gap-3 ${isHero || isCompact ? "flex-col" : "flex-col sm:flex-row sm:items-stretch"}`}>
        {(isHero || isCompact) && (
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg className={`h-[18px] w-[18px] ${iconClass}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className={inputClass}
            />
          </div>
        )}
        <div className={`relative w-full ${!isHero && !isCompact ? "sm:flex-1" : ""}`}>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg className={`h-[18px] w-[18px] ${iconClass}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder || "tu@email.com"}
            required
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full rounded-xl font-semibold tracking-wider transition-all duration-300 ${
            isHero
              ? "bg-gradient-to-br from-rose-400 to-pink-500 px-8 py-3.5 text-sm text-white shadow-lg hover:scale-[1.02] hover:shadow-rose-glow active:scale-[0.98] sm:text-base"
              : "shrink-0 bg-gradient-to-br from-rose-400 to-pink-500 px-6 py-3 text-xs text-white hover:scale-[1.02] hover:shadow-rose-glow active:scale-[0.98] sm:w-auto"
          }`}
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            </span>
          ) : submitLabel || (isHero ? "Quiero mi patrón gratis" : "Descargar patrón gratis")}
        </button>
      </div>
      {status === "error" && <p className={`mt-3 text-xs ${dark ? "text-rose-300" : "text-rose-500"}`}>Algo salió mal. Inténtalo de nuevo.</p>}
      {status !== "error" && (
        <p className={`mt-3 text-center text-xs ${dark ? "text-white/40" : isHero ? "text-muted/55" : "text-muted/40"} ${!isHero && !isCompact ? "sm:text-left" : ""}`}>
          Descarga al instante en la web. Sin spam. ♡
        </p>
      )}
    </form>
  )
}
