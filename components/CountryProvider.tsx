"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

const CountryContext = createContext<string | null>(null)

export function useCountry() {
  return useContext(CountryContext)
}

export default function CountryProvider({
  children,
  initialCountry,
}: {
  children: ReactNode
  initialCountry?: string | null
}) {
  const [country, setCountry] = useState<string | null>(initialCountry ?? null)

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)user_country=([^;]*)/)
    const cookieCountry = match ? match[1] : null
    if (cookieCountry && cookieCountry !== country) {
      setCountry(cookieCountry)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CountryContext.Provider value={country}>
      {children}
    </CountryContext.Provider>
  )
}
