import Link from "next/link"

export default function FooterSignature() {
  return (
    <p className="px-4 pt-1 text-center text-[11px] leading-relaxed text-muted/55">
      Sitio web creado por{" "}
      <Link
        href="https://www.kinexisdigital.com/es"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-rose-400 underline decoration-rose-200/60 underline-offset-[3px] transition-colors hover:text-rose-600 hover:decoration-rose-400"
      >
        Kinexis Digital
      </Link>
    </p>
  )
}
