import type { ReactNode } from "react"

/** Zero-JS wrapper — was a client IntersectionObserver for little visual gain. */
export default function TrustBarReveal({ children }: { children: ReactNode }) {
  return <div className="trust-bar-reveal is-inview">{children}</div>
}
