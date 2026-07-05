import { GIFT_MAGNET } from "@/lib/gift-magnet"

export function isIOSGiftDownload(): boolean {
  if (typeof navigator === "undefined") return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export async function triggerGiftDownload(): Promise<void> {
  if (isIOSGiftDownload()) {
    window.location.assign(GIFT_MAGNET.downloadPath)
    return
  }

  try {
    const response = await fetch(GIFT_MAGNET.downloadPath)
    if (!response.ok) throw new Error("Download failed")

    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = blobUrl
    anchor.download = GIFT_MAGNET.fileName
    anchor.rel = "noopener"
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(blobUrl)
  } catch {
    window.location.assign(GIFT_MAGNET.downloadPath)
  }
}
