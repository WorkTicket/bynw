import { getCloudflareContext } from "@opennextjs/cloudflare"
import { GIFT_MAGNET } from "@/lib/gift-magnet"

export async function fetchGiftPdfResponse(request: Request): Promise<Response | null> {
  const assetRequest = new Request(new URL(GIFT_MAGNET.filePath, request.url))

  try {
    const { env } = await getCloudflareContext({ async: true })
    const assets = env.ASSETS as { fetch: (request: Request) => Promise<Response> } | undefined

    if (assets) {
      const assetResponse = await assets.fetch(assetRequest)
      if (assetResponse.ok) return assetResponse
    }
  } catch {
    // Fall through to local/dev fetch below.
  }

  const response = await fetch(assetRequest)
  return response.ok ? response : null
}

export async function fetchGiftPdfBuffer(request: Request): Promise<ArrayBuffer | null> {
  const response = await fetchGiftPdfResponse(request)
  if (!response) return null
  return response.arrayBuffer()
}
