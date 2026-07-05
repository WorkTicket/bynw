import { GIFT_MAGNET } from "@/lib/gift-magnet"
import { fetchGiftPdfResponse } from "@/lib/gift-pdf"

function attachmentResponse(source: Response) {
  const headers = new Headers(source.headers)
  headers.set("Content-Type", "application/pdf")
  headers.set("Content-Disposition", `attachment; filename="${GIFT_MAGNET.fileName}"`)
  headers.set("Cache-Control", "public, max-age=86400")
  headers.delete("content-encoding")
  return new Response(source.body, { headers, status: source.status })
}

export async function GET(request: Request) {
  const assetResponse = await fetchGiftPdfResponse(request)
  if (!assetResponse) {
    return new Response("PDF no encontrado", { status: 404 })
  }

  return attachmentResponse(assetResponse)
}
