import { GIFT_MAGNET } from "@/lib/gift-magnet"

export async function GET(request: Request) {
  const assetUrl = new URL(GIFT_MAGNET.filePath, request.url)
  const response = await fetch(assetUrl)

  if (!response.ok) {
    return new Response("PDF no encontrado", { status: 404 })
  }

  const pdf = await response.arrayBuffer()

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${GIFT_MAGNET.fileName}"`,
      "Cache-Control": "public, max-age=86400",
    },
  })
}
