import { GIFT_MAGNET } from "@/lib/gift-magnet"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const pdfUrl = `${url.origin}${GIFT_MAGNET.filePath}`

  const res = await fetch(pdfUrl)
  if (!res.ok) {
    return new Response("PDF not found", { status: 404 })
  }

  const blob = await res.arrayBuffer()

  return new Response(blob, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(GIFT_MAGNET.fileName)}"`,
      "Cache-Control": "public, max-age=86400",
    },
  })
}
