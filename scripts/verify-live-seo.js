const fs = require("fs")
const https = require("https")

function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "user-agent": "seo-check/1.0" } }, (res) => {
        const chunks = []
        res.on("data", (c) => chunks.push(c))
        res.on("end", () =>
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: Buffer.concat(chunks).toString("utf8"),
          })
        )
      })
      .on("error", reject)
  })
}

function schemas(html) {
  return [...html.matchAll(/application\/ld\+json"[^>]*>([^<]+)/g)]
    .map((m) => {
      try {
        return JSON.parse(m[1])
      } catch {
        return null
      }
    })
    .filter(Boolean)
}

async function main() {
  const home = await fetch("https://bynmwcreative.com/")
  const pdp = await fetch("https://bynmwcreative.com/shop/princesas-disney")
  const og = await fetch("https://bynmwcreative.com/images/og-default.jpg")
  const hero = await fetch("https://bynmwcreative.com/images/hero-editorial.webp")
  const manifest = await fetch("https://bynmwcreative.com/manifest.webmanifest")
  const imgOpt = await fetch(
    "https://bynmwcreative.com/_next/image?url=%2Fimages%2Fhero-editorial.webp&w=1080&q=75"
  )
  const sitemap = await fetch("https://bynmwcreative.com/sitemap.xml")

  console.log("HOME", home.status, "lang=", (home.body.match(/<html[^>]*lang="([^"]+)/) || [])[1])
  console.log("  og:image", (home.body.match(/property="og:image" content="([^"]+)/) || [])[1])
  console.log("  canonical", (home.body.match(/rel="canonical" href="([^"]+)/) || [])[1])
  homeSchemas = schemas(home.body)
  homeSchemas.forEach((s) =>
    console.log("  schema", s["@type"], s.aggregateRating ? JSON.stringify(s.aggregateRating) : "")
  )

  console.log("\nPDP", pdp.status)
  console.log("  title", (pdp.body.match(/<title>([^<]+)/) || [])[1])
  console.log("  og:image", (pdp.body.match(/property="og:image" content="([^"]+)/) || [])[1])
  schemas(pdp.body).forEach((s) => {
    console.log("  schema", s["@type"])
    if (s.offers) {
      const offers = Array.isArray(s.offers) ? s.offers : [s.offers]
      offers.forEach((o) => console.log("   offer", o.priceCurrency, o.price, o.priceValidUntil))
    }
  })

  console.log("\nASSETS")
  console.log("  og-default.jpg", og.status, "bytes", og.body.length || og.headers["content-length"])
  console.log("  hero-editorial.webp", hero.status, "bytes", hero.headers["content-length"])
  console.log("  manifest", manifest.status, manifest.body.slice(0, 120).replace(/\s+/g, " "))
  console.log("  _next/image", imgOpt.status, imgOpt.headers["content-type"])
  console.log("\nSITEMAP sample")
  console.log(sitemap.body.split("\n").slice(0, 16).join("\n"))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
