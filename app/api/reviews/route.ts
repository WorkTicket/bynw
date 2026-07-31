import {
  createReview,
  getAggregateRating,
  getClientIp,
  listPublishedReviews,
} from "@/lib/reviews"
import { isAllowedImageType, REVIEW_IMAGE_MAX_BYTES } from "@/lib/review-image"

export async function GET() {
  const [reviews, aggregate] = await Promise.all([
    listPublishedReviews(),
    getAggregateRating(),
  ])

  return Response.json(
    { reviews, aggregate },
    {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
      },
    }
  )
}

async function parseImageFile(
  file: FormDataEntryValue | null
): Promise<{ bytes: Uint8Array; contentType: string } | { error: string } | null> {
  if (!file || typeof file === "string") return null
  if (!(file instanceof Blob) || file.size === 0) return null

  const contentType = (file.type || "image/jpeg").toLowerCase()
  if (!isAllowedImageType(contentType)) {
    return { error: "Usa una foto JPG, PNG o WebP." }
  }
  if (file.size > REVIEW_IMAGE_MAX_BYTES) {
    return { error: "La foto es demasiado grande. Prueba con otra más ligera." }
  }

  const buffer = new Uint8Array(await file.arrayBuffer())
  return { bytes: buffer, contentType: contentType === "image/jpg" ? "image/jpeg" : contentType }
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || ""
    let name = ""
    let text = ""
    let rating = NaN
    let location: string | undefined
    let website: string | undefined
    let image: { bytes: Uint8Array; contentType: string } | undefined

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData()
      name = String(form.get("name") ?? "")
      text = String(form.get("text") ?? "")
      rating = Number(form.get("rating"))
      const loc = form.get("location")
      location = typeof loc === "string" && loc.trim() ? loc : undefined
      const web = form.get("website")
      website = typeof web === "string" ? web : undefined

      const parsed = await parseImageFile(form.get("image"))
      if (parsed && "error" in parsed) {
        return Response.json({ error: parsed.error }, { status: 400 })
      }
      if (parsed) image = parsed
    } else {
      const body = (await req.json()) as {
        name?: string
        text?: string
        rating?: number
        location?: string
        website?: string
      }
      name = body.name ?? ""
      text = body.text ?? ""
      rating = Number(body.rating)
      location = body.location
      website = body.website
    }

    const result = await createReview(
      { name, text, rating, location, website },
      { ip: getClientIp(req), image }
    )

    if (!result.ok) {
      return Response.json({ error: result.error }, { status: result.status })
    }

    const aggregate = await getAggregateRating()

    return Response.json(
      { ok: true, review: result.review, aggregate },
      { status: 201 }
    )
  } catch {
    return Response.json({ error: "Solicitud inválida" }, { status: 400 })
  }
}
