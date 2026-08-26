import { getCloudflareContext } from "@opennextjs/cloudflare"
import { moderateReviewText } from "@/lib/content-moderation"
import {
  REVIEW_IMAGE_MAX_BYTES,
  base64ToBytes,
  bytesToBase64,
  isAllowedImageType,
  reviewImageKvKey,
  reviewImagePublicPath,
  type StoredReviewImage,
} from "@/lib/review-image"
import {
  SEED_REVIEWS,
  computeAggregate,
  type AggregateRating,
  type Review,
  type ReviewInput,
} from "@/lib/testimonials-data"

const KV_KEY = "published-reviews"
const MAX_REVIEWS = 200
const MAX_PER_DAY = 3
const MIN_TEXT = 12
const MAX_TEXT = 600
const MAX_NAME = 60
const MAX_LOCATION = 80

type KvNamespace = {
  get(key: string): Promise<string | null>
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>
}

/** In-memory fallback for `next dev` when KV is unavailable. */
const memoryStore: { reviews: Review[]; rates: Record<string, number>; ratesHydrated: boolean } = {
  reviews: [],
  rates: {},
  ratesHydrated: false,
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, " ").slice(0, MAX_NAME)
}

function normalizeText(text: string) {
  return text.trim().replace(/\s+/g, " ").slice(0, MAX_TEXT)
}

function normalizeLocation(location?: string) {
  const value = location?.trim().replace(/\s+/g, " ") ?? ""
  return value ? value.slice(0, MAX_LOCATION) : undefined
}

function isValidRating(rating: number) {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5
}

export function validateReviewInput(
  input: ReviewInput
): { ok: true; data: ReviewInput } | { ok: false; error: string } {
  if (input.website && input.website.trim().length > 0) {
    return { ok: false, error: "No se pudo enviar la reseña." }
  }

  const name = normalizeName(input.name ?? "")
  const text = normalizeText(input.text ?? "")
  const rating = Number(input.rating)
  const location = normalizeLocation(input.location)

  if (!name || name.length < 2) {
    return { ok: false, error: "Escribe tu nombre para continuar." }
  }
  if (!isValidRating(rating)) {
    return { ok: false, error: "Elige una valoración con estrellas." }
  }
  if (text.length < MIN_TEXT) {
    return { ok: false, error: "Cuéntanos un poco más sobre tu experiencia." }
  }
  if (text.length > MAX_TEXT) {
    return { ok: false, error: "La reseña es demasiado larga." }
  }
  const urlCount = (text.match(/https?:\/\//gi) ?? []).length
  if (urlCount > 1) {
    return { ok: false, error: "Por favor, evita enlaces en la reseña." }
  }

  const moderation = moderateReviewText(name, text, location)
  if (!moderation.ok) {
    return { ok: false, error: moderation.error }
  }

  return { ok: true, data: { name, text, rating, location } }
}

async function getKv(): Promise<KvNamespace | null> {
  try {
    const { env } = await getCloudflareContext({ async: true })
    const kv = (env as { REVIEWS?: KvNamespace }).REVIEWS
    return kv ?? null
  } catch {
    return null
  }
}

async function readLocalReviews(): Promise<Review[]> {
  try {
    const { promises: fs } = await import("fs")
    const path = await import("path")
    const file = path.join(process.cwd(), ".data", "reviews.json")
    const raw = await fs.readFile(file, "utf8")
    const parsed = JSON.parse(raw) as Review[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return memoryStore.reviews
  }
}

async function writeLocalReviews(reviews: Review[]) {
  memoryStore.reviews = reviews
  try {
    const { promises: fs } = await import("fs")
    const path = await import("path")
    const dir = path.join(process.cwd(), ".data")
    const file = path.join(dir, "reviews.json")
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(file, JSON.stringify(reviews, null, 2), "utf8")
  } catch {
    // Memory-only if filesystem is unavailable (edge).
  }
}

async function readSiteReviews(): Promise<Review[]> {
  try {
    const kv = await getKv()
    if (kv) {
      const raw = await kv.get(KV_KEY)
      if (!raw) return []
      try {
        const parsed = JSON.parse(raw) as Review[]
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    }
    return readLocalReviews()
  } catch {
    return []
  }
}

async function writeSiteReviews(reviews: Review[]) {
  const trimmed = reviews.slice(0, MAX_REVIEWS)
  const kv = await getKv()
  if (kv) {
    await kv.put(KV_KEY, JSON.stringify(trimmed))
    return
  }
  await writeLocalReviews(trimmed)
}

/** Drop leftover local/dev junk so it never shows beside editorial seeds. */
export function isJunkSiteReview(review: Review): boolean {
  const name = (review.name ?? "").trim().toLowerCase()
  if (name === "test" || name.startsWith("test ") || name.endsWith(" test")) return true
  if (name === "t" || name === "tt" || name === "asdf") return true
  if (name === "lucia test" || name === "lucía test") return true
  if (name === "carmen ruiz") return true

  // Catch mojibake / encoding-broken copies of the smoke-test review
  const text = (review.text ?? "").toLowerCase()
  if (text.includes("\ufffd")) return true
  if (
    text.includes("los patrones son claros y mi amigurumi") &&
    text.includes("precioso")
  ) {
    return true
  }
  if (
    text === "test" ||
    text === "testing" ||
    text.includes("testing the review") ||
    text === "asdf" ||
    text === "qwerty"
  ) {
    return true
  }
  const location = (review.location ?? "").trim().toLowerCase()
  if (location === "test" && (text.includes("test") || name.includes("test"))) {
    return true
  }
  return false
}

function mergeReviews(site: Review[]): Review[] {
  const byId = new Map<string, Review>()
  for (const r of SEED_REVIEWS) byId.set(r.id, r)
  for (const r of site) {
    if (isJunkSiteReview(r)) continue
    if (!byId.has(r.id)) byId.set(r.id, r)
  }
  return Array.from(byId.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export async function listPublishedReviews(): Promise<Review[]> {
  try {
    const site = await readSiteReviews()
    return mergeReviews(site)
  } catch {
    return mergeReviews([])
  }
}

export async function getAggregateRating(): Promise<AggregateRating> {
  const reviews = await listPublishedReviews()
  return computeAggregate(reviews)
}

function interleavePhotoAndText(reviews: Review[], limit: number): Review[] {
  const withPhoto = reviews.filter((r) => Boolean(r.image || r.productImages?.[0]))
  const textOnly = reviews.filter((r) => !r.image && !r.productImages?.[0])
  const out: Review[] = []
  let p = 0
  let t = 0
  while (out.length < limit && (p < withPhoto.length || t < textOnly.length)) {
    if (p < withPhoto.length && out.length < limit) out.push(withPhoto[p++])
    if (t < textOnly.length && out.length < limit) out.push(textOnly[t++])
  }
  return out
}

export async function listFeaturedReviews(limit = 3): Promise<Review[]> {
  const reviews = await listPublishedReviews()
  const hasPhoto = (r: Review) => Boolean(r.image || r.productImages?.[0])
  const sitePhoto = reviews.filter((r) => r.source === "site" && hasPhoto(r))
  const seedPhoto = reviews.filter((r) => r.source === "seed" && hasPhoto(r))
  const siteText = reviews.filter((r) => r.source === "site" && !hasPhoto(r))
  const seedText = reviews.filter((r) => r.source === "seed" && !hasPhoto(r))
  const pool = [...sitePhoto, ...seedPhoto, ...siteText, ...seedText]
  if (pool.length >= limit) return pool.slice(0, limit)
  if (pool.length > 0) return pool
  return interleavePhotoAndText([...SEED_REVIEWS], limit)
}

/**
 * Ads landers: prefer real site photo reviews, then site text, then seed photos.
 * Stronger trust for Meta traffic and less reliance on editorial seeds.
 */
export async function listAdsFeaturedReviews(limit = 3): Promise<Review[]> {
  const reviews = await listPublishedReviews()
  const hasPhoto = (r: Review) => Boolean(r.image || r.productImages?.[0])
  const sitePhoto = reviews.filter((r) => r.source === "site" && hasPhoto(r))
  const seedPhoto = reviews.filter((r) => r.source === "seed" && hasPhoto(r))
  const siteText = reviews.filter((r) => r.source === "site" && !hasPhoto(r))
  const seedText = reviews.filter((r) => r.source === "seed" && !hasPhoto(r))
  // Photos first (site, then seed) so Meta landers lead with finished-work proof.
  const pool = [...sitePhoto, ...seedPhoto, ...siteText, ...seedText]
  if (pool.length >= limit) return pool.slice(0, limit)
  if (pool.length > 0) return pool
  return interleavePhotoAndText([...SEED_REVIEWS], limit)
}

function clientKey(ip: string) {
  return `rate:${ip}:${todayKey()}`
}

async function hydrateLocalRates() {
  if (memoryStore.ratesHydrated) return
  memoryStore.ratesHydrated = true
  try {
    const { promises: fs } = await import("fs")
    const path = await import("path")
    const file = path.join(process.cwd(), ".data", "rate-limits.json")
    const raw = await fs.readFile(file, "utf8")
    const parsed = JSON.parse(raw) as Record<string, number>
    if (parsed && typeof parsed === "object") {
      memoryStore.rates = { ...parsed, ...memoryStore.rates }
    }
  } catch {
    // First run or unreadable file — keep in-memory defaults.
  }
}

async function getRateCount(ip: string): Promise<number> {
  const key = clientKey(ip || "unknown")
  const kv = await getKv()

  if (kv) {
    return Number((await kv.get(key)) ?? "0")
  }

  await hydrateLocalRates()
  return memoryStore.rates[key] ?? 0
}

async function bumpRateLimit(ip: string): Promise<void> {
  const key = clientKey(ip || "unknown")
  const kv = await getKv()

  if (kv) {
    const current = Number((await kv.get(key)) ?? "0")
    await kv.put(key, String(current + 1), { expirationTtl: 60 * 60 * 36 })
    return
  }

  await hydrateLocalRates()
  memoryStore.rates[key] = (memoryStore.rates[key] ?? 0) + 1

  try {
    const { promises: fs } = await import("fs")
    const path = await import("path")
    const file = path.join(process.cwd(), ".data", "rate-limits.json")
    await fs.mkdir(path.dirname(file), { recursive: true })
    await fs.writeFile(file, JSON.stringify(memoryStore.rates), "utf8")
  } catch {
    // ignore
  }
}

async function writeReviewImage(
  id: string,
  bytes: Uint8Array,
  contentType: string
): Promise<void> {
  const payload: StoredReviewImage = {
    contentType,
    data: bytesToBase64(bytes),
  }
  const serialized = JSON.stringify(payload)
  const kv = await getKv()
  if (kv) {
    await kv.put(reviewImageKvKey(id), serialized)
    return
  }

  try {
    const { promises: fs } = await import("fs")
    const path = await import("path")
    const dir = path.join(process.cwd(), ".data", "review-images")
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, `${id}.json`), serialized, "utf8")
  } catch {
    // ignore — review can still publish text-only if storage fails later
    throw new Error("No se pudo guardar la foto.")
  }
}

export async function readReviewImage(
  id: string
): Promise<{ bytes: Uint8Array; contentType: string } | null> {
  if (!/^site-[a-z0-9-]+$/i.test(id)) return null

  const kv = await getKv()
  let raw: string | null = null
  try {
    if (kv) {
      raw = await kv.get(reviewImageKvKey(id))
    } else {
      const { promises: fs } = await import("fs")
      const path = await import("path")
      raw = await fs.readFile(
        path.join(process.cwd(), ".data", "review-images", `${id}.json`),
        "utf8"
      )
    }
  } catch {
    return null
  }

  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as StoredReviewImage
    if (!parsed?.data || !parsed.contentType) return null
    return { bytes: base64ToBytes(parsed.data), contentType: parsed.contentType }
  } catch {
    return null
  }
}

export type ReviewImageInput = {
  bytes: Uint8Array
  contentType: string
}

export async function createReview(
  input: ReviewInput,
  opts: { ip?: string; image?: ReviewImageInput } = {}
): Promise<{ ok: true; review: Review } | { ok: false; error: string; status: number }> {
  const validated = validateReviewInput(input)
  if (!validated.ok) {
    return { ok: false, error: validated.error, status: 400 }
  }

  if (opts.image) {
    if (!isAllowedImageType(opts.image.contentType)) {
      return {
        ok: false,
        error: "Usa una foto JPG, PNG o WebP.",
        status: 400,
      }
    }
    if (opts.image.bytes.byteLength === 0 || opts.image.bytes.byteLength > REVIEW_IMAGE_MAX_BYTES) {
      return {
        ok: false,
        error: "La foto es demasiado grande. Prueba con otra más ligera.",
        status: 400,
      }
    }
  }

  const id = `site-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
  const review: Review = {
    id,
    name: validated.data.name,
    text: validated.data.text,
    rating: validated.data.rating,
    location: validated.data.location,
    createdAt: new Date().toISOString(),
    source: "site",
  }

  const ip = opts.ip ?? "unknown"
  const rateCount = await getRateCount(ip)
  if (rateCount >= MAX_PER_DAY) {
    return {
      ok: false,
      error: "Has enviado demasiadas reseñas hoy. Inténtalo mañana.",
      status: 429,
    }
  }

  if (isJunkSiteReview(review)) {
    return {
      ok: false,
      error: "Esta reseña parece de prueba. Escribe una experiencia real.",
      status: 400,
    }
  }

  const existing = await readSiteReviews()
  const duplicate = existing.some(
    (r) =>
      r.name.toLowerCase() === review.name.toLowerCase() &&
      r.text.toLowerCase() === review.text.toLowerCase()
  )
  if (duplicate) {
    return { ok: false, error: "Esta reseña ya está publicada.", status: 409 }
  }

  if (opts.image) {
    try {
      await writeReviewImage(id, opts.image.bytes, opts.image.contentType)
      review.image = reviewImagePublicPath(id)
    } catch {
      return {
        ok: false,
        error: "No se pudo guardar la foto. Inténtalo de nuevo.",
        status: 500,
      }
    }
  }

  await writeSiteReviews([review, ...existing])
  await bumpRateLimit(ip)
  return { ok: true, review }
}

export function getClientIp(req: Request): string {
  const cf = req.headers.get("cf-connecting-ip")
  if (cf) return cf.trim()
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown"
  return "unknown"
}
