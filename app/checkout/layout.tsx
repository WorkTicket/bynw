import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

/** Branded Hotmart shell: noindex. Header/Footer slim themselves like /ads. */
export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <div data-checkout-lander="true">
      <link rel="preconnect" href="https://pay.hotmart.com" />
      <link rel="dns-prefetch" href="https://checkout.hotmart.com" />
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.dataset.announcement="hidden"`,
        }}
      />
      {children}
    </div>
  )
}
