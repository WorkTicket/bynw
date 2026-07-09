"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"
import { ShoppingBagIcon } from "@/lib/icons"

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)
  const lastScroll = useRef(0)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const pct = docH > 0 ? y / docH : 0
      const scrollingDown = y > lastScroll.current

      setVisible(pct > 0.3 && scrollingDown && y > 600)
      lastScroll.current = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (pathname !== "/" && !pathname.startsWith("/shop")) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-rose-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 safe-area-bottom">
        <a
          href="/shop"
          className="btn-cute flex w-full items-center justify-center gap-2 py-4 text-base font-semibold"
        >
          <ShoppingBagIcon className="text-white/90" size={18} />
          Ver Colecciones — Desde 8€
        </a>
      </div>
    </div>
  )
}
