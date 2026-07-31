import type { MetadataRoute } from "next"
import { BRAND_NAME, DEFAULT_DESCRIPTION, SITE_LANG } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND_NAME,
    short_name: "Bynmw",
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#fff8f6",
    theme_color: "#fff8f6",
    lang: SITE_LANG,
    icons: [
      {
        src: "/images/logo-64.png",
        sizes: "64x64",
        type: "image/png",
        purpose: "any",
      },
    ],
  }
}
