import { cookies, headers } from "next/headers"

export function getCountry(): string | null {
  const cookieStore = cookies()
  const cookieCountry = cookieStore.get("user_country")?.value
  if (cookieCountry) return cookieCountry
  try {
    const headersList = headers()
    return headersList.get("cf-ipcountry") || null
  } catch {
    return null
  }
}
