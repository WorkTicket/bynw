import HotmartBuyButtonClient from "@/components/HotmartBuyButtonClient"
import { onsiteCheckoutPath } from "@/lib/hotmart"

type Size = "default" | "compact" | "lg"

type Props = {
  slug: string
  children: React.ReactNode
  className?: string
  size?: Size
  contentId?: string
  contentName?: string
  price?: string
}

/** Server wrapper — Comprar always goes to branded /checkout (Hotmart embeds there). */
export default function HotmartBuyButton({ slug, ...rest }: Props) {
  return (
    <HotmartBuyButtonClient
      slug={slug}
      initialHref={onsiteCheckoutPath(slug)}
      {...rest}
    />
  )
}
