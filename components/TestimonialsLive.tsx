"use client"

import { useState } from "react"
import Testimonials from "@/components/Testimonials"
import ReviewForm from "@/components/ReviewForm"
import type { Review } from "@/lib/testimonials-data"

type Props = {
  initialReviews: Review[]
}

/** Testimonials page: live list + on-site review form sharing the same state. */
export default function TestimonialsLive({ initialReviews }: Props) {
  const [reviews, setReviews] = useState(initialReviews)

  function handleSubmitted(review: Review) {
    setReviews((prev) => {
      if (prev.some((r) => r.id === review.id)) return prev
      return [review, ...prev]
    })
    // Scroll new review into view after the list re-renders.
    requestAnimationFrame(() => {
      document
        .getElementById("testimonios-lista")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  return (
    <>
      <div id="testimonios-lista">
        <Testimonials reviews={reviews} showForm={false} />
      </div>

      <section className="section-alt section-padding" id="dejar-resena">
        <div className="section">
          <ReviewForm variant="full" onSubmitted={handleSubmitted} />
        </div>
      </section>
    </>
  )
}
