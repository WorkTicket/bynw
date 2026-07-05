import { GIFT_MAGNET } from "@/lib/gift-magnet"

function isIOSDevice() {
  if (typeof navigator === "undefined") return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export function isIOSGiftDownload() {
  return isIOSDevice()
}

export async function downloadGiftPdf(): Promise<void> {
  const response = await fetch(GIFT_MAGNET.filePath)
  if (!response.ok) {
    throw new Error("PDF fetch failed")
  }

  const blob = await response.blob()
  const file = new File([blob], GIFT_MAGNET.fileName, { type: "application/pdf" })

  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: GIFT_MAGNET.title,
    })
    return
  }

  if (isIOSDevice()) {
    window.open(GIFT_MAGNET.filePath, "_blank", "noopener,noreferrer")
    return
  }

  const blobUrl = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = blobUrl
  anchor.download = GIFT_MAGNET.fileName
  anchor.rel = "noopener"
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(blobUrl)
}
