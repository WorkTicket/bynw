/** Hotmart checkout URL helpers — embed (iframe) vs full-page. */

/**
 * Strip Hotmart lightbox mode (`checkoutMode=2`) so checkout opens as a
 * full-page mobile-friendly flow instead of an iframe widget.
 */
export function toFullPageCheckoutUrl(href: string): string {
  try {
    const url = new URL(href)
    if (url.searchParams.get("checkoutMode") === "2") {
      url.searchParams.delete("checkoutMode")
    }
    return url.toString()
  } catch {
    return href
      .replace(/([?&])checkoutMode=2(&)?/g, (_, sep: string, amp?: string) =>
        amp ? sep : ""
      )
      .replace(/\?$/, "")
  }
}

/** Iframe embed needs checkoutMode=2. */
export function toLightboxCheckoutUrl(href: string): string {
  try {
    const url = new URL(href)
    url.searchParams.set("checkoutMode", "2")
    return url.toString()
  } catch {
    if (/[?&]checkoutMode=/.test(href)) return href
    return href.includes("?")
      ? `${href}&checkoutMode=2`
      : `${href}?checkoutMode=2`
  }
}

/** On-site branded checkout path. Optionally keep the current query string. */
export function onsiteCheckoutPath(slug: string, search?: string): string {
  const q = (search ?? "").replace(/^\?/, "")
  return q ? `/checkout/${slug}?${q}` : `/checkout/${slug}`
}
