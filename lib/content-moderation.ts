/**
 * Lightweight content filter for public reviews.
 * Blocks clear profanity and hate/racist language (ES + EN).
 * Pure / isomorphic — safe on server and client.
 */

/** Exact tokens after normalization (word-boundary match). */
const BLOCKED_WORDS = [
  // English profanity
  "fuck",
  "fck",
  "fuk",
  "fack",
  "fucker",
  "fucking",
  "shit",
  "bitch",
  "bastard",
  "asshole",
  "dick",
  "cock",
  "cunt",
  "pussy",
  "whore",
  "slut",
  "motherfucker",
  // Spanish / LatAm profanity
  "puta",
  "puto",
  "putas",
  "putos",
  "putita",
  "putito",
  "mierda",
  "mierdas",
  "cabron",
  "cabrones",
  "cabrona",
  "cabronas",
  "joder",
  "jodido",
  "jodida",
  "gilipollas",
  "pendejo",
  "pendeja",
  "pendejos",
  "pendejas",
  "pinche",
  "pinches",
  "verga",
  "vergas",
  "coño",
  "cono",
  "carajo",
  "culero",
  "culera",
  "hijueputa",
  "hijoputa",
  "malparido",
  "malparida",
  "chingar",
  "chingada",
  "chingado",
  "chingados",
  "chingadas",
  "pendejez",
  "marica",
  "maricon",
  // Racial / ethnic slurs (EN + ES) — explicit blocklist
  "nigger",
  "nigga",
  "negrata",
  "sudaca",
  "sudacas",
  "spic",
  "wetback",
  "chink",
  "gook",
  "kike",
  "beaner",
  "towelhead",
  "raghead",
  "paki",
  "coon",
] as const

/** Multi-word / phrase patterns checked against normalized full text. */
const BLOCKED_PHRASES = [
  "kill yourself",
  "kys",
  "gas the",
  "heil hitler",
  "white power",
  "white pride",
  "muerte a los",
  "muerte a las",
  "hay que matar",
  "todos los negros",
  "todos los judios",
  "todos los judíos",
  "fuera negros",
  "fuera indios",
  "fuera inmigrantes",
  "raza superior",
  "pureza racial",
  "go back to your country",
  "go back to mexico",
] as const

const LEET: Record<string, string> = {
  "0": "o",
  "1": "i",
  "3": "e",
  "4": "a",
  "5": "s",
  "7": "t",
  "@": "a",
  $: "s",
  "!": "i",
}

function stripDiacritics(value: string) {
  return value.normalize("NFD").replace(/\p{M}/gu, "")
}

/** Join "f u c k" / "p u t a" style letter-spacing into normal words. */
function collapseSpacedLetters(text: string): string {
  return text.replace(/\b(?:\p{L}\s+){2,}\p{L}\b/gu, (chunk) =>
    chunk.replace(/\s+/g, "")
  )
}

/** Collapse obfuscation so "f.u.c.k", "fuuuck", "f4ck" still match. */
export function normalizeForModeration(raw: string): string {
  let text = stripDiacritics(raw.toLowerCase())
  text = text.replace(/[013457@$!]/g, (ch) => LEET[ch] ?? ch)
  // Keep letters/numbers/spaces; turn other separators into spaces
  text = text.replace(/[^\p{L}\p{N}]+/gu, " ")
  text = text.replace(/\s+/g, " ").trim()
  // Collapse elongated letters: fuuuck → fuck
  text = text.replace(/(\p{L})\1+/gu, "$1")
  text = collapseSpacedLetters(text)
  return text.replace(/\s+/g, " ").trim()
}

function tokenize(normalized: string): string[] {
  return normalized.split(" ").filter(Boolean)
}

export type ModerationResult =
  | { ok: true }
  | { ok: false; error: string }

export function moderateReviewText(...parts: Array<string | undefined>): ModerationResult {
  const combined = parts.filter(Boolean).join(" ")
  if (!combined.trim()) return { ok: true }

  const normalized = normalizeForModeration(combined)
  const tokens = new Set(tokenize(normalized))
  const spaced = ` ${normalized} `

  for (const word of BLOCKED_WORDS) {
    const needle = normalizeForModeration(word)
    if (!needle) continue
    if (tokens.has(needle)) {
      return {
        ok: false,
        error:
          "Tu mensaje contiene lenguaje no permitido. Por favor, escribe una reseña respetuosa.",
      }
    }
  }

  for (const phrase of BLOCKED_PHRASES) {
    const needle = normalizeForModeration(phrase)
    if (!needle) continue
    if (spaced.includes(` ${needle} `) || normalized.includes(needle)) {
      return {
        ok: false,
        error:
          "Tu mensaje contiene lenguaje no permitido. Por favor, escribe una reseña respetuosa.",
      }
    }
  }

  return { ok: true }
}
