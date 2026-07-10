"use client"

import { useState, useEffect, useCallback } from "react"
import { EyeIcon } from "@/lib/icons"

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function getDailyCount(productId: string): number {
  if (typeof window === "undefined") return 1
  const today = todayKey()
  const storedDate = localStorage.getItem(`viewers_date_${productId}`)
  if (storedDate !== today) {
    localStorage.setItem(`viewers_date_${productId}`, today)
    localStorage.setItem(`viewers_${productId}`, "1")
    localStorage.removeItem(`viewers_clicked_${productId}`)
    return 1
  }
  const raw = localStorage.getItem(`viewers_${productId}`)
  const n = raw ? parseInt(raw, 10) : 0
  return n > 0 ? n : 1
}

function bumpAndStore(productId: string) {
  const today = todayKey()
  const storedDate = localStorage.getItem(`viewers_date_${productId}`)
  const alreadyClicked = localStorage.getItem(`viewers_clicked_${productId}`) === today

  if (storedDate !== today) {
    localStorage.setItem(`viewers_date_${productId}`, today)
    localStorage.setItem(`viewers_${productId}`, "2")
    localStorage.setItem(`viewers_clicked_${productId}`, today)
    return 2
  }

  if (alreadyClicked) {
    const raw = localStorage.getItem(`viewers_${productId}`)
    const n = raw ? parseInt(raw, 10) : 0
    return n > 0 ? n : 1
  }

  const raw = localStorage.getItem(`viewers_${productId}`)
  const prev = raw ? parseInt(raw, 10) : 0
  const next = (prev > 0 ? prev : 1) + 1
  localStorage.setItem(`viewers_date_${productId}`, today)
  localStorage.setItem(`viewers_${productId}`, String(next))
  localStorage.setItem(`viewers_clicked_${productId}`, today)
  return next
}

export default function LiveViewerCount({ productId }: { productId: string }) {
  const [count, setCount] = useState(1)

  useEffect(() => {
    setCount(getDailyCount(productId))
  }, [productId])

  const bump = useCallback(() => {
    setCount(bumpAndStore(productId))
  }, [productId])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const card = target.closest(`[data-product-card="${productId}"]`)
      if (card) bump()
    }
    document.addEventListener("click", handler, { capture: true })
    return () => document.removeEventListener("click", handler, { capture: true })
  }, [productId, bump])

  return (
    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg animate-pulse">
      <EyeIcon className="text-rose-300" size={11} />
      {count} {count === 1 ? "persona viendo esto" : "personas viendo esto"}
    </div>
  )
}
