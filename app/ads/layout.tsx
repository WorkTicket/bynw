import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

/** Paid landers: noindex. Header/Footer/WhatsApp slim themselves on /ads. */
export default function AdsLayout({ children }: { children: ReactNode }) {
  return <div data-ads-lander="true">{children}</div>
}
