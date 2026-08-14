import { headers } from "next/headers"
import HotmartBuyButtonClient from "@/components/HotmartBuyButtonClient"
import { getProductBySlug } from "@/lib/products"
import {
  buildHotmartPayUrl,
  isInAppBrowser,
  onsiteCheckoutPath,
} from "@/lib/hotmart"

type Size = "default" | "compact" | "lg"

type Props = {
  slug: string
  children: React.ReactNode
  className?: string
  size?: Size
  contentId?: string
  contentName?: string
  price?: string
  /** Force direct Hotmart (used on /ads landers). */
  directPay?: boolean
}

/** Server wrapper — sets the correct pay URL in HTML for Facebook in-app browsers. */
export default function HotmartBuyButton({
  slug,
  directPay: directPayProp = false,
  ...rest
}: Props) {
  const product = getProductBySlug(slug)
  const ua = headers().get("user-agent") ?? ""
  const fbIab = isInAppBrowser(ua)
  const directPay = directPayProp || fbIab

  const initialHref =
    product && directPay
      ? buildHotmartPayUrl(product.buyUrl)
      : onsiteCheckoutPath(slug)

  return (
    <HotmartBuyButtonClient
      slug={slug}
      initialHref={initialHref}
      directPay={directPay}
      {...rest}
    />
  )
}
