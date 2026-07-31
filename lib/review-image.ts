/** Shared limits + helpers for optional review photos. */

export const REVIEW_IMAGE_MAX_BYTES = 400_000
export const REVIEW_IMAGE_MAX_INPUT_BYTES = 8_000_000
export const REVIEW_IMAGE_ALLOWED = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
])

export type StoredReviewImage = {
  contentType: string
  /** Base64 payload (no data-URL prefix). */
  data: string
}

export function reviewImageKvKey(id: string) {
  return `review-img:${id}`
}

export function reviewImagePublicPath(id: string) {
  return `/api/reviews/image/${encodeURIComponent(id)}`
}

export function isAllowedImageType(type: string) {
  return REVIEW_IMAGE_ALLOWED.has(type.toLowerCase())
}

export function bytesToBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64")
  }
  let binary = ""
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk))
  }
  return btoa(binary)
}

export function base64ToBytes(b64: string): Uint8Array {
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(b64, "base64"))
  }
  const binary = atob(b64)
  const out = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i)
  return out
}

/** Client-side: resize + JPEG-compress before upload. */
export async function compressReviewImage(file: File): Promise<Blob> {
  if (!isAllowedImageType(file.type)) {
    throw new Error("Usa una foto JPG, PNG o WebP.")
  }
  if (file.size > REVIEW_IMAGE_MAX_INPUT_BYTES) {
    throw new Error("La foto es demasiado grande (máx. 8 MB).")
  }

  const bitmap = await createImageBitmap(file)
  const maxSide = 900
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height))
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    bitmap.close()
    throw new Error("No se pudo procesar la imagen.")
  }
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/jpeg", 0.82)
  )
  if (!blob) throw new Error("No se pudo procesar la imagen.")
  if (blob.size > REVIEW_IMAGE_MAX_BYTES) {
    const tighter = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/jpeg", 0.65)
    )
    if (!tighter || tighter.size > REVIEW_IMAGE_MAX_BYTES) {
      throw new Error("La foto sigue siendo demasiado grande. Prueba con otra.")
    }
    return tighter
  }
  return blob
}
