"use client"

import { useEffect, useState } from "react"
import { msUntilSaleWeekEnd, promoEndsSoonLine } from "@/lib/offer"

function formatRemaining(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000))
  const days = Math.floor(totalSec / 86400)
  const hours = Math.floor((totalSec % 86400) / 3600)
  const minutes = Math.floor((totalSec % 3600) / 60)
  if (days > 0) return `${days}d ${hours}h ${minutes}m`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

type Props = {
  className?: string
}

/** Live countdown to Sunday 23:59 Europe/Madrid — honest with “esta semana”. */
export default function SaleCountdown({ className = "" }: Props) {
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    const tick = () => setRemaining(msUntilSaleWeekEnd())
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <p className={className} aria-live="polite">
      {promoEndsSoonLine()}
      {remaining != null ? ` · ${formatRemaining(remaining)}` : ""}
    </p>
  )
}
