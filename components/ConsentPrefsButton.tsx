"use client"

import { openConsentPrefs } from "@/lib/consent"

type Props = {
  className?: string
  children?: React.ReactNode
}

/** Tiny client island — opens cookie prefs from the server Footer. */
export default function ConsentPrefsButton({
  className,
  children = "Preferencias",
}: Props) {
  return (
    <button type="button" onClick={openConsentPrefs} className={className}>
      {children}
    </button>
  )
}
