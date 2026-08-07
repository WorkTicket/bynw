import Image from "next/image"
import ImageCarousel from "@/components/ImageCarousel"

type Props = {
  images: string[]
  alt: string
  interval?: number
}

/**
 * Product gallery with SSR LCP for the first frame.
 * Carousel client JS only mounts when there are additional slides.
 */
export default function ProductMedia({ images, alt, interval = 4500 }: Props) {
  if (images.length === 0) return null

  if (images.length === 1) {
    return (
      <div className="product-media">
        <div className="corner-accents relative aspect-square overflow-hidden rounded-2xl bg-rose-50/30 ring-1 ring-rose-100/60">
          <Image
            src={`/images/${images[0]}`}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 640px"
            priority
            fetchPriority="high"
            unoptimized
            className="object-contain"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="product-media">
      <ImageCarousel images={images} interval={interval} alt={alt} priority />
    </div>
  )
}
