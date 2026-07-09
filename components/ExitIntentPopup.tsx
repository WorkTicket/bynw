"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import LeadMagnet from "./LeadMagnet"
import { GiftIcon } from "@/lib/icons"
import { GIFT_MAGNET } from "@/lib/gift-magnet"

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const scrollFired = useRef(false)

  const trigger = useCallback(() => {
    if (dismissed || sessionStorage.getItem("exit-intent-dismissed")) return
    setShow(true)
  }, [dismissed])

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0) trigger()
  }, [trigger])

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave)

    const onScroll = () => {
      if (scrollFired.current) return
      const pct = document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)
      if (pct >= 0.5) {
        scrollFired.current = true
        trigger()
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("scroll", onScroll)
    }
  }, [handleMouseLeave, trigger])

  function handleClose() {
    setShow(false)
    setDismissed(true)
    sessionStorage.setItem("exit-intent-dismissed", "true")
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-night/70 backdrop-blur-sm p-4 animate-fade-in-up">
      <div className="relative w-full max-w-lg rounded-3xl2 bg-gradient-to-br from-rose-600/90 via-rose-800/80 to-night p-8 sm:p-10 shadow-2xl shadow-rose-900/40 border border-rose-300/10">
        <div className="pointer-events-none absolute -top-10 -right-10 text-rose-200/10">
          <GiftIcon size={80} strokeWidth={1.5} />
        </div>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition-all hover:bg-white/20 hover:text-white"
          aria-label="Cerrar"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl2 bg-rose-400/20">
            <GiftIcon className="text-rose-300" size={32} />
          </div>
          <h3 className="mt-5 font-display text-3xl font-semibold text-white">
            ¿Te vas ya? <span className="text-rose-300">♡</span>
          </h3>
          <p className="mt-2 text-white/50 text-sm">
            Llévate gratis el {GIFT_MAGNET.title} y empieza hoy mismo.
          </p>
        </div>

        <div className="mt-6">
          <LeadMagnet variant="compact" dark source="exit-intent" submitLabel="Quiero mi patrón gratis" placeholder="tu@email.com" />
        </div>

        <p className="mt-4 text-center text-xs text-white/30">
          Sin spam. Puedes darte de baja en cualquier momento.
        </p>
      </div>
    </div>
  )
}
