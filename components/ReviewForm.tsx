"use client"

import { FormEvent, useId, useState } from "react"
import { StarIcon } from "@/lib/icons"
import { moderateReviewText } from "@/lib/content-moderation"
import { compressReviewImage } from "@/lib/review-image"
import type { Review } from "@/lib/testimonials-data"

type Props = {
  variant?: "compact" | "full"
  onSubmitted?: (review: Review) => void
}

export default function ReviewForm({ variant = "compact", onSubmitted }: Props) {
  const formId = useId()
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [text, setText] = useState("")
  const [website, setWebsite] = useState("") // honeypot
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const displayRating = hoverRating || rating
  const nameId = `${formId}-name`
  const locationId = `${formId}-location`
  const textId = `${formId}-text`
  const photoId = `${formId}-photo`
  const honeyId = `${formId}-website`

  function clearImage() {
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImageFile(null)
    setImagePreview(null)
  }

  function handleImageChange(file: File | null) {
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    if (!file) {
      setImageFile(null)
      setImagePreview(null)
      return
    }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setError("")
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")

    const moderation = moderateReviewText(name, text, location)
    if (!moderation.ok) {
      setError(moderation.error)
      return
    }

    setSubmitting(true)

    try {
      const form = new FormData()
      form.set("name", name)
      form.set("text", text)
      form.set("rating", String(rating))
      if (location.trim()) form.set("location", location.trim())
      form.set("website", website)

      if (imageFile) {
        try {
          const compressed = await compressReviewImage(imageFile)
          form.set("image", compressed, "review.jpg")
        } catch (err) {
          setError(err instanceof Error ? err.message : "No se pudo procesar la foto.")
          return
        }
      }

      const res = await fetch("/api/reviews", {
        method: "POST",
        body: form,
      })

      const data = (await res.json()) as { error?: string; review?: Review }

      if (!res.ok) {
        setError(data.error || "No se pudo publicar la reseña.")
        return
      }

      if (data.review) {
        onSubmitted?.(data.review)
      }

      setDone(true)
      setName("")
      setLocation("")
      setText("")
      setRating(5)
      clearImage()
    } catch {
      setError("Algo salió mal. Inténtalo de nuevo en un momento.")
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div
        className={`rounded-[1.25rem] border border-rose-100/70 bg-white px-6 py-10 text-center sm:px-8 ${
          variant === "full" ? "mx-auto max-w-xl" : ""
        }`}
        role="status"
      >
        <p className="font-script text-[1.85rem] leading-none text-rose-400 sm:text-[2.1rem]">
          ¡Gracias!
        </p>
        <h3 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-[1.75rem]">
          Tu reseña ya está publicada
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Otras artesanas podrán leerla en esta página. Si quieres, puedes dejar otra.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="btn-secondary mt-7 min-h-[2.75rem] px-6 py-2.5 text-sm"
        >
          Escribir otra reseña
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative rounded-[1.25rem] border border-rose-100/70 bg-white p-5 sm:p-8 ${
        variant === "full" ? "mx-auto max-w-xl" : ""
      }`}
      noValidate
    >
      {variant === "full" && (
        <div className="mb-6 text-center">
          <span className="eyebrow">Tu opinión</span>
          <h3 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Deja tu reseña
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Valora con estrellas, cuéntanos cómo te fue y, si quieres, sube una foto de tu
            trabajo. Se publica al momento.
          </p>
        </div>
      )}

      {variant === "compact" && (
        <div className="mb-5">
          <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            ¿Ya usaste nuestros patrones?
          </h3>
          <p className="mt-1.5 text-sm text-muted">
            Deja tu reseña aquí — ayuda a otras artesanas a decidirse.
          </p>
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label
            htmlFor={nameId}
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-500"
          >
            Tu nombre
          </label>
          <input
            id={nameId}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            maxLength={60}
            placeholder="Ej. María García"
            className="input-soft"
            required
          />
        </div>

        <div>
          <label
            htmlFor={locationId}
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-500"
          >
            Ciudad{" "}
            <span className="font-normal normal-case tracking-normal text-muted/70">
              (opcional)
            </span>
          </label>
          <input
            id={locationId}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            autoComplete="address-level2"
            maxLength={80}
            placeholder="Ej. Madrid"
            className="input-soft"
          />
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-500">
            Valoración
          </p>
          <div
            className="flex items-center gap-0.5"
            role="radiogroup"
            aria-label="Valoración de 1 a 5 estrellas"
            onMouseLeave={() => setHoverRating(0)}
          >
            {[1, 2, 3, 4, 5].map((value) => {
              const active = value <= displayRating
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={rating === value}
                  aria-label={`${value} estrella${value === 1 ? "" : "s"}`}
                  onMouseEnter={() => setHoverRating(value)}
                  onFocus={() => setHoverRating(value)}
                  onBlur={() => setHoverRating(0)}
                  onClick={() => setRating(value)}
                  className={`rounded-xl p-2 transition-transform duration-150 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 ${
                    active ? "text-rose-400" : "text-rose-100"
                  }`}
                >
                  <StarIcon size={26} />
                </button>
              )
            })}
            <span className="ml-2 text-sm tabular-nums text-muted">{rating}/5</span>
          </div>
        </div>

        <div>
          <label
            htmlFor={textId}
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-500"
          >
            Tu reseña
          </label>
          <textarea
            id={textId}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            maxLength={600}
            placeholder="Cuéntanos qué te gustó de los patrones…"
            className="input-soft min-h-[7rem] resize-y leading-relaxed"
            required
          />
          <p className="mt-1.5 text-right text-[11px] text-muted/60">{text.length}/600</p>
        </div>

        <div>
          <label
            htmlFor={photoId}
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-500"
          >
            Foto de tu trabajo{" "}
            <span className="font-normal normal-case tracking-normal text-muted/70">
              (opcional)
            </span>
          </label>

          {imagePreview ? (
            <div className="flex items-center gap-4">
              <div className="overflow-hidden rounded-2xl bg-rose-50/50 ring-1 ring-rose-100/70">
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="h-20 w-20 object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={photoId}
                  className="cursor-pointer text-sm font-medium text-rose-500 underline-offset-2 hover:underline"
                >
                  Cambiar foto
                </label>
                <button
                  type="button"
                  onClick={clearImage}
                  className="text-left text-sm text-muted hover:text-ink"
                >
                  Quitar
                </button>
              </div>
            </div>
          ) : (
            <label
              htmlFor={photoId}
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-rose-200/90 bg-rose-50/30 px-4 py-6 text-center transition-colors hover:border-rose-300 hover:bg-rose-50/50"
            >
              <span className="text-sm font-medium text-ink">Subir una foto</span>
              <span className="mt-1 text-[12px] text-muted">
                JPG, PNG o WebP · una sola imagen
              </span>
            </label>
          )}

          <input
            id={photoId}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
          />
        </div>

        {/* Honeypot — hidden from humans */}
        <div
          className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor={honeyId}>Sitio web</label>
          <input
            id={honeyId}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-rose-600" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full min-h-[3rem] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {submitting ? "Publicando…" : "Publicar reseña"}
        </button>
      </div>
    </form>
  )
}
