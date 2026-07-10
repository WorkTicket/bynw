import Link from "next/link"

export default function FooterSignature() {
  return (
    <p className="text-center text-[11px] text-muted/50 py-3">
      Sitio web creado por{" "}
      <Link
        href="https://www.kinexisdigital.com/es"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-rose-400 hover:text-rose-600 transition-colors"
      >
        Kinexis Digital
      </Link>
    </p>
  )
}
