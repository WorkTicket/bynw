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
      {/* Inline (not next/script beforeInteractive) — nested layouts can't use that strategy.
          CSS main:has([data-ads-lander]) also locks the header offset. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.dataset.announcement="hidden"`,
        }}
      />
      <AdsHotmartWarmup />
      {children}
    </div>
  )
}
