"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
  OPEN_CONSENT_PREFS_EVENT,
  consentAll,
  defaultConsentDenied,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent"
import { isInAppBrowser } from "@/lib/in-app-browser"

type View = "hidden" | "banner" | "prefs"

function isConversionPath(
  pathname: string | null,
  searchParams: { get(name: string): string | null } | null
): boolean {
  if (!pathname) return false
  if (pathname.startsWith("/checkout") || pathname.startsWith("/ads")) return true
  if (typeof document !== "undefined") {
    const lander = document.documentElement.dataset.lander
    if (lander === "ads" || lander === "checkout") return true
  }
  if (pathname === "/" || pathname === "") {
    const medium = searchParams?.get("utm_medium") || ""
    const source = searchParams?.get("utm_source") || ""
    if (/paid|cpc|cpm|ppc/i.test(medium)) return true
    if (/^(facebook|fb|instagram|ig|meta)$/i.test(source)) return true
    if (searchParams?.get("fbclid")) return true
  }
  return false
}

export default function CookieConsent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [view, setView] = useState<View>("hidden")
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const existing = readConsent()
    if (existing) {
      setView("hidden")
      return
    }

    const ua = typeof navigator !== "undefined" ? navigator.userAgent : null
    const inApp =
      isInAppBrowser(ua) ||
      document.documentElement.dataset.fbIab === "true"

    // Ads / checkout / in-app WebViews: never cover Comprar. Footer prefs still work.
    if (isConversionPath(pathname, searchParams) || inApp) {
      setView("hidden")
      return
    }

    const t = window.setTimeout(() => setView("banner"), 2800)
    return () => window.clearTimeout(t)
  }, [pathname, searchParams])

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
      className={`cookie-consent${view === "prefs" ? " cookie-consent--prefs" : ""}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
    >
      <div className="cookie-consent__panel">
        {view === "prefs" ? (
          <>
            <p id="cookie-consent-title" className="cookie-consent__title">
              Preferencias de cookies
            </p>
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
            </div>
            <div className="cookie-consent__actions">
              <button
                type="button"
                className="cookie-consent__btn cookie-consent__btn--primary"
                onClick={savePrefs}
              >
                Guardar
              </button>
              <button
                type="button"
                className="cookie-consent__btn cookie-consent__btn--ghost"
                onClick={rejectNonEssential}
              >
                Solo necesarias
              </button>
            </div>
          </>
        ) : (
          <>
            <p id="cookie-consent-title" className="cookie-consent__text">
              Usamos cookies necesarias y, si aceptas, analítica y anuncios.{" "}
              <a href="/cookies-policy" className="cookie-consent__link">
                Más información
              </a>
            </p>
            <div className="cookie-consent__actions">
              <button
                type="button"
                className="cookie-consent__btn cookie-consent__btn--primary"
                onClick={acceptAll}
              >
                Aceptar
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
                className="cookie-consent__btn cookie-consent__btn--text"
                onClick={() => setView("prefs")}
              >
                Opciones
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
