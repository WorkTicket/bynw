export function isIOSGiftDownload(): boolean {
  if (typeof navigator === "undefined") return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export function isAndroidGiftDownload(): boolean {
  if (typeof navigator === "undefined") return false
  return /Android/i.test(navigator.userAgent)
}
