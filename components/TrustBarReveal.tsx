"use client"

import { useInView } from "@/lib/use-in-view"
import { useEffect, useRef, useState, type ReactNode } from "react"

export default function TrustBarReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [fallback, setFallback] = useState(false)
  const inView = useInView(ref, {
    once: true,
    // Expand the root so near-fold content reveals reliably after the tall hero
    margin: "120px 0px 120px 0px",
    threshold: 0,
  })

  // Failsafe: never leave the trust bar permanently invisible if IO misses
  useEffect(() => {
    const t = window.setTimeout(() => setFallback(true), 900)
    return () => window.clearTimeout(t)
  }, [])

  const visible = inView || fallback

  return (
    <div ref={ref} className={`trust-bar-reveal${visible ? " is-inview" : ""}`}>
      {children}
    </div>
  )
}
