type Shared = {
  children: React.ReactNode
  className?: string
  /** Visual size — default for marketing, lg for hero/buy, sm for sticky bars */
  size?: "default" | "sm" | "lg"
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

const sizeClass = {
  default: "",
  sm: "btn-primary--sm",
  lg: "btn-primary--lg",
} as const

/**
 * Site primary CTA — silk-gradient pill.
 * Always uses a native <a> for same-origin routes so phones never hit
 * Next.js client-side navigation (known crash on iOS / in-app browsers).
 */
export default function PrimaryCTA({
  children,
  className,
  href,
  size = "default",
  ...rest
}: Props) {
  const classes = cx("btn-primary", sizeClass[size], className)
  const label = <span className="btn-label">{children}</span>

  if (href) {
    const { type: _ignored, ...anchorRest } = rest as Omit<
      LinkProps,
      "href" | "children" | "className" | "size"
    >

    return (
      <a href={href} className={classes} {...anchorRest}>
        {label}
      </a>
    )
  }

  const { type = "button", ...buttonRest } = rest as ButtonProps
  return (
    <button type={type} className={classes} {...buttonRest}>
      {label}
    </button>
  )
}
