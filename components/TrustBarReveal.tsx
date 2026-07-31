"use client"

import { useInView } from "@/lib/use-in-view"
import { useRef, type ReactNode } from "react"

export default function TrustBarReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-56px" })

  return (
    <div ref={ref} className={`trust-bar-reveal${inView ? " is-inview" : ""}`}>
      {children}
    </div>
  )
}
