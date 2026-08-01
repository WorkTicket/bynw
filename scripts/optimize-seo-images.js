const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const images = path.join(__dirname, "..", "public", "images")
const heroSrc = path.join(images, "hero-editorial.webp")
const heroBackup = path.join(__dirname, "..", ".image-backups", "hero-editorial.orig.webp")
const heroOut = path.join(images, "hero-editorial.webp")
const ogOut = path.join(images, "og-default.webp")
const ogJpgOut = path.join(images, "og-default.jpg")

async function main() {
  const sourceExists = fs.existsSync(heroBackup) || fs.existsSync(heroSrc)
  if (!sourceExists) {
    throw new Error("Missing hero source image")
  }

  // Prefer full-res backup; fall back to current public hero
  const source = fs.existsSync(heroBackup) ? heroBackup : heroSrc
  const meta = await sharp(source).metadata()
  console.log(
    "hero source:",
    path.basename(source),
    meta.width,
    meta.height,
    meta.format,
    (fs.statSync(source).size / 1024).toFixed(1) + "KB"
  )

  fs.mkdirSync(path.dirname(heroBackup), { recursive: true })
  if (!fs.existsSync(heroBackup) && fs.existsSync(heroSrc)) {
    fs.copyFileSync(heroSrc, heroBackup)
    console.log("backed up -> .image-backups/hero-editorial.orig.webp")
  }

  const heroBuf = await sharp(source)
    .rotate()
    .resize({
      width: 1920,
      height: 1280,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 90, effort: 6, smartSubsample: false })
    .toBuffer()
  fs.writeFileSync(heroOut, heroBuf)
  const heroMeta = await sharp(heroBuf).metadata()
  console.log(
    "hero out:",
    heroMeta.width,
    heroMeta.height,
    (heroBuf.length / 1024).toFixed(1) + "KB"
  )

  // Branded OG from real product photo + typography wash
  const ogBase = await sharp(source)
    .rotate()
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .toBuffer()

  const overlay = Buffer.from(`
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#faf7f8" stop-opacity="0.96"/>
      <stop offset="40%" stop-color="#faf7f8" stop-opacity="0.82"/>
      <stop offset="65%" stop-color="#faf7f8" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#faf7f8" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#wash)"/>
  <text x="72" y="248" font-family="Georgia, 'Times New Roman', serif" font-size="52" font-weight="600" fill="#2a1f24">Manos Creativas</text>
  <text x="72" y="312" font-family="Georgia, 'Times New Roman', serif" font-size="52" font-weight="600" fill="#2a1f24">Bynmw</text>
  <text x="72" y="372" font-family="Georgia, 'Times New Roman', serif" font-size="26" font-style="italic" fill="#b76e79">Patrones de Crochet en PDF</text>
  <text x="72" y="420" font-family="Arial, Helvetica, sans-serif" font-size="17" fill="#6b5a60">Amigurumis · Flores · Princesas</text>
</svg>`)

  const ogWebp = await sharp(ogBase)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .webp({ quality: 85, effort: 6 })
    .toBuffer()
  fs.writeFileSync(ogOut, ogWebp)

  // JPG for Facebook/LinkedIn crawlers that prefer it
  const ogJpg = await sharp(ogBase)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer()
  fs.writeFileSync(ogJpgOut, ogJpg)

  console.log("og webp:", (ogWebp.length / 1024).toFixed(1) + "KB")
  console.log("og jpg:", (ogJpg.length / 1024).toFixed(1) + "KB")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
