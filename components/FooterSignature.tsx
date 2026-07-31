import Link from "next/link"

export default function FooterSignature() {
  return (
    <p className="mt-1 px-4 pt-3 text-center text-[11px] leading-relaxed tracking-[0.02em] text-muted/70">
      Sitio web creado por{" "}
      <Link
        href="https://www.kinexisdigital.com/es"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-rose-500 underline decoration-rose-200/70 underline-offset-[3px] transition-colors hover:text-rose-600 hover:decoration-rose-400"
      >
        Kinexis Digital
      </Link>
    </p>
  )
}
