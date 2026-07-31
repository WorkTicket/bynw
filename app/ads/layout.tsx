import type { ReactNode } from "react"
import type { Metadata } from "next"
import AdsHotmartWarmup from "@/components/AdsHotmartWarmup"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

/** Paid landers: noindex. Header/Footer/WhatsApp slim themselves on /ads. */
export default function AdsLayout({ children }: { children: ReactNode }) {
  return (
    <div data-ads-lander="true">
      <AdsHotmartWarmup />
      {children}
    </div>
  )
}
