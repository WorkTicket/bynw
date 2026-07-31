"use client"

import { type ReactNode } from "react"

/** Soft page enter — transform/opacity only, ~350ms. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>
}
