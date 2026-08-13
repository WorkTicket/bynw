import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

/** Paid landers: noindex. Header/Footer/WhatsApp slim themselves on /ads. */
export default function AdsLayout({ children }: { children: ReactNode }) {
  return (
    <div data-ads-lander="true">
      <link rel="preconnect" href="https://pay.hotmart.com" />
      <link rel="dns-prefetch" href="https://checkout.hotmart.com" />
      {/* Inline (not next/script beforeInteractive) — nested layouts can't use that strategy.
          CSS main:has([data-ads-lander]) also locks the header offset. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.dataset.announcement="hidden"`,
        }}
      />
      {children}
    </div>
  )
}
