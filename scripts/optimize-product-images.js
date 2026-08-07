/**
 * Recompress large product WebPs in public/images for PageSpeed.
 * Skips files already under the size budget. Backs up originals once.
 */
const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const imagesDir = path.join(__dirname, "..", "public", "images")
const backupDir = path.join(__dirname, "..", ".image-backups", "product-library")
const MAX_BYTES = 95 * 1024
const MAX_EDGE = 1200
const QUALITY = 78

async function main() {
  fs.mkdirSync(backupDir, { recursive: true })
  const files = fs
    .readdirSync(imagesDir)
    .filter((f) => f.endsWith(".webp") && !f.startsWith("logo") && !f.startsWith("og-") && f !== "hero-editorial.webp")

  let resized = 0
  let skipped = 0

  for (const file of files) {
    const src = path.join(imagesDir, file)
    const stat = fs.statSync(src)
    if (stat.size <= MAX_BYTES) {
      skipped += 1
      continue
    }

    const backup = path.join(backupDir, file)
    if (!fs.existsSync(backup)) {
      fs.copyFileSync(src, backup)
    }

    const source = fs.existsSync(backup) ? backup : src
    const buf = await sharp(source)
      .rotate()
      .resize({
        width: MAX_EDGE,
        height: MAX_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
      .toBuffer()

    // Only write if we actually shrank the file
    if (buf.length < stat.size) {
      fs.writeFileSync(src, buf)
      console.log(
        `${file}: ${(stat.size / 1024).toFixed(1)}KB → ${(buf.length / 1024).toFixed(1)}KB`
      )
      resized += 1
    } else {
      skipped += 1
    }
  }

  console.log(`done. resized=${resized} skipped=${skipped}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
