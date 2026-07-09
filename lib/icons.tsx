export type IconProps = {
  className?: string
  size?: number
  strokeWidth?: number
  style?: React.CSSProperties
}

function BaseIcon({
  className = "",
  size = 24,
  strokeWidth = 2,
  style,
  children,
  viewBox = "0 0 24 24",
}: IconProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden
    >
      {children}
    </svg>
  )
}

/** PDF / pattern document */
export function FileTextIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </BaseIcon>
  )
}

/** Step-by-step guide */
export function BookOpenIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M2 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V7z" />
      <path d="M12 7v13M7 9h2M7 13h3" />
    </BaseIcon>
  )
}

/** Instant download */
export function DownloadIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3v10" />
      <path d="M8 11l4 4 4-4" />
      <path d="M4 19h16" />
    </BaseIcon>
  )
}

/** Lifetime access */
export function InfinityIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M18.178 8c5.096 0 5.096 8 0 8-2.347 0-4.178-2.5-6.178-4-2 1.5-3.831 4-6.178 4-5.096 0-5.096-8 0-8 2.347 0 4.178 2.5 6.178 4 2-1.5 3.831-4 6.178-4z" />
    </BaseIcon>
  )
}

/** Surprise bonus / free gift */
export function GiftIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13M3 12v8a2 2 0 002 2h14a2 2 0 002-2v-8" />
      <path d="M12 8c-2-2-4-3-4-5a2 2 0 114 0c0 2-2 3-4 5zM12 8c2-2 4-3 4-5a2 2 0 10-4 0c0 2 2 3 4 5z" />
    </BaseIcon>
  )
}

/** Yarn / materials guide */
export function ScissorsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.12 8.12L20 20M8.12 15.88L20 4" />
    </BaseIcon>
  )
}

/** Community / group */
export function UsersIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </BaseIcon>
  )
}

/** WhatsApp / chat support */
export function MessageCircleIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </BaseIcon>
  )
}

/** Money-back guarantee */
export function ShieldCheckIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </BaseIcon>
  )
}

/** Customer quote / review */
export function QuoteIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 11a3 3 0 003-3V6H4v5h3zM17 11a3 3 0 003-3V6h-6v5h3z" />
    </BaseIcon>
  )
}

/** Product collection */
export function LayersIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </BaseIcon>
  )
}

/** Shop / browse collections */
export function ShoppingBagIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <path d="M3 6h18M16 10a4 4 0 01-8 0" />
    </BaseIcon>
  )
}

/** FAQ / help */
export function HelpCircleIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
    </BaseIcon>
  )
}

/** Contact email */
export function MailIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </BaseIcon>
  )
}

/** Star rating */
export function StarIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} style={style} aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  )
}

/** Crochet hook — brand accent */
export function CrochetHookIcon(props: IconProps) {
  return (
    <BaseIcon {...props} viewBox="0 0 24 24">
      <path d="M6 20c4-4 6-8 6-12a4 4 0 00-8 0" />
      <path d="M6 20h4" />
    </BaseIcon>
  )
}

/** Flower — crochet flowers collection */
export function FlowerIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </BaseIcon>
  )
}

/** Clock — limited time offer */
export function ClockIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </BaseIcon>
  )
}

/** Play / video lesson */
export function PlayCircleIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8l6 4-6 4V8z" />
    </BaseIcon>
  )
}

/** List / abbreviations */
export function ListIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </BaseIcon>
  )
}

/** Arrow for links */
export function ArrowRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </BaseIcon>
  )
}

/** Checkmark in circle */
export function CheckCircleIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </BaseIcon>
  )
}

/** Eye / viewers watching */
export function EyeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </BaseIcon>
  )
}
