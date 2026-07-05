import { getCloudflareContext } from "@opennextjs/cloudflare"
import { GIFT_MAGNET } from "@/lib/gift-magnet"

function attachmentResponse(source: Response) {
  const headers = new Headers(source.headers)
  headers.set("Content-Type", "application/pdf")
  headers.set("Content-Disposition", `attachment; filename="${GIFT_MAGNET.fileName}"`)
  headers.set("Cache-Control", "public, max-age=86400")
  headers.delete("content-encoding")
  return new Response(source.body, { headers, status: source.status })
}

export async function GET(request: Request) {
  const assetRequest = new Request(new URL(GIFT_MAGNET.filePath, request.url))

  try {
    const { env } = await getCloudflareContext({ async: true })
    const assets = env.ASSETS as { fetch: (request: Request) => Promise<Response> } | undefined

    if (assets) {
      const assetResponse = await assets.fetch(assetRequest)
      if (assetResponse.ok) {
        return attachmentResponse(assetResponse)
      }
    }
  } catch {
    // Fall through to local/dev fetch below.
  }

  const response = await fetch(assetRequest)
  if (!response.ok) {
    return new Response("PDF no encontrado", { status: 404 })
  }

  return attachmentResponse(response)
}
