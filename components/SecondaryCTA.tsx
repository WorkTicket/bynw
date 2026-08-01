import Link from "next/link"

type Shared = {
  children: React.ReactNode
  className?: string
}

type LinkProps = Shared &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children"> & {
    href: string
  }

type ButtonProps = Shared &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined
  }

type Props = LinkProps | ButtonProps

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

/** Site secondary CTA — pearl outline pill. */
export default function SecondaryCTA({
  children,
  className,
  href,
  ...rest
}: Props) {
  const classes = cx("btn-secondary", className)
  const label = <span className="btn-label">{children}</span>

  if (href) {
    const { type: _ignored, ...anchorRest } = rest as Omit<
      LinkProps,
      "href" | "children" | "className"
    >
    const external =
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    const isHash = href.startsWith("#")

    if (external || isHash) {
      return (
        <a href={href} className={classes} {...anchorRest}>
          {label}
        </a>
      )
    }

    return (
      <Link href={href} className={classes} {...anchorRest}>
        {label}
      </Link>
    )
  }

  const { type = "button", ...buttonRest } = rest as ButtonProps
  return (
    <button type={type} className={classes} {...buttonRest}>
      {label}
    </button>
  )
}
