import { GIFT_MAGNET } from "@/lib/gift-magnet"
import { isAppleMobileUa, isInAppBrowser } from "@/lib/in-app-browser"

export function isIOSGiftDownload(): boolean {
  if (typeof navigator === "undefined") return false
  return isAppleMobileUa()
}

/** iOS and in-app browsers block blob downloads — open Drive instead. */
export function needsExternalGiftOpen(): boolean {
  if (typeof navigator === "undefined") return false
  return isAppleMobileUa() || isInAppBrowser()
}

export function openIOSGiftDrive(): void {
  window.location.assign(GIFT_MAGNET.iosDriveUrl)
}

export async function triggerGiftDownload(): Promise<void> {
  if (needsExternalGiftOpen()) {
    openIOSGiftDrive()
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
    // API/PDF missing → Drive folder, not another 404 on /api/gift.
    openIOSGiftDrive()
  }
}
