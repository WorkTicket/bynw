"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  OPEN_CONSENT_PREFS_EVENT,
  consentAll,
  defaultConsentDenied,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent"

type View = "hidden" | "banner" | "prefs"

export default function CookieConsent() {
  const pathname = usePathname()
  const [view, setView] = useState<View>("hidden")
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const existing = readConsent()
    if (existing) {
      setView("hidden")
      return
    }
    // Paid landers: show almost immediately so Meta can load before “Comprar”.
    // Organic: short defer so the banner doesn’t steal first paint / CLS.
    const delay = pathname?.startsWith("/ads") ? 200 : 1200
    const t = window.setTimeout(() => setView("banner"), delay)
    return () => window.clearTimeout(t)
  }, [pathname])

  useEffect(() => {
    const openPrefs = () => {
      const current = readConsent()
      setAnalytics(current?.analytics ?? false)
      setMarketing(current?.marketing ?? false)
      setView("prefs")
    }
    window.addEventListener(OPEN_CONSENT_PREFS_EVENT, openPrefs)
    return () => window.removeEventListener(OPEN_CONSENT_PREFS_EVENT, openPrefs)
  }, [])

  const persist = (choice: ConsentChoice) => {
    writeConsent(choice)
    setView("hidden")
  }

  const acceptAll = () => persist(consentAll())
  const rejectNonEssential = () => persist(defaultConsentDenied())
  const savePrefs = () =>
    persist({
      necessary: true,
      analytics,
      marketing,
      updatedAt: new Date().toISOString(),
    })

  if (view === "hidden") return null

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
    >
      <div className="cookie-consent__panel">
        <p id="cookie-consent-title" className="cookie-consent__title">
          Cookies y privacidad
        </p>
        <p className="cookie-consent__text">
          Usamos cookies necesarias para el sitio. Con tu permiso, también
          cookies de analítica (Google) y publicidad (Meta) para medir visitas y
          optimizar anuncios.{" "}
          <Link href="/cookies-policy" className="cookie-consent__link">
            Más información
          </Link>
        </p>

        {view === "prefs" ? (
          <div className="cookie-consent__prefs">
            <label className="cookie-consent__check">
              <input type="checkbox" checked disabled readOnly />
              <span>Necesarias (siempre activas)</span>
            </label>
            <label className="cookie-consent__check">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
              <span>Analítica (Google Analytics)</span>
            </label>
            <label className="cookie-consent__check">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
              <span>Publicidad (Meta Pixel)</span>
            </label>
            <div className="cookie-consent__actions">
              <button
                type="button"
                className="cookie-consent__btn cookie-consent__btn--primary"
                onClick={savePrefs}
              >
                Guardar preferencias
              </button>
              <button
                type="button"
                className="cookie-consent__btn cookie-consent__btn--ghost"
                onClick={rejectNonEssential}
              >
                Solo necesarias
              </button>
            </div>
          </div>
        ) : (
          <div className="cookie-consent__actions">
            <button
              type="button"
              className="cookie-consent__btn cookie-consent__btn--primary"
              onClick={acceptAll}
            >
              Aceptar todas
            </button>
            <button
              type="button"
              className="cookie-consent__btn cookie-consent__btn--ghost"
              onClick={rejectNonEssential}
            >
              Rechazar
            </button>
            <button
              type="button"
              className="cookie-consent__btn cookie-consent__btn--ghost"
              onClick={() => setView("prefs")}
            >
              Preferencias
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
