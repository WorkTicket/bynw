import { readReviewImage } from "@/lib/reviews"

type Params = { params: { id: string } }

export async function GET(_req: Request, { params }: Params) {
  const image = await readReviewImage(params.id)
  if (!image) {
    return new Response("Not found", { status: 404 })
  }

  // Copy into a fresh ArrayBuffer-backed view for BodyInit typing.
  const body = new Uint8Array(image.bytes)
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": image.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
