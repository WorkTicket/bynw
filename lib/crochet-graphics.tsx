export function CrochetHeart({ className = "", size = 60, style }: { className?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 52 C14 38 4 26 4 16 C4 8 10 2 18 2 C24 2 30 8 30 8 C30 8 36 2 42 2 C50 2 56 8 56 16 C56 26 46 38 30 52Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <path d="M22 18 Q30 12 38 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.35" />
    </svg>
  )
}

export function HeartFilled({ className = "", size = 40, style }: { className?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} style={style} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 36 C8 26 2 18 2 11 C2 5 7 1 12 1 C16 1 20 5 20 5 C20 5 24 1 28 1 C33 1 38 5 38 11 C38 18 32 26 20 36Z" opacity="0.8" />
    </svg>
  )
}

export function SmallStar({ className = "", size = 40, style }: { className?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4 L23 15 L34 15 L25 22 L28 34 L20 27 L12 34 L15 22 L6 15 L17 15 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  )
}

export function Tiara({ className = "", size = 80, style }: { className?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 70 48" width={size} height={size * 0.68} className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 42 L6 28 Q6 18 11 14 L16 8 Q18 4 21 10 L23 16 Q25 10 28 4 L31 2 L34 4 Q37 10 39 16 L41 10 Q44 4 46 8 L51 14 Q56 18 56 28 L56 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <ellipse cx="31" cy="16" rx="2.5" ry="3.5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="6" y1="42" x2="56" y2="42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function CrochetFlower({ className = "", size = 50, style }: { className?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 50 50" width={size} height={size} className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <ellipse key={i} cx="25" cy="10" rx="5" ry="8" stroke="currentColor" strokeWidth="1.2" opacity="0.5"
          transform={`rotate(${angle} 25 25)`} />
      ))}
      <circle cx="25" cy="25" r="4" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
    </svg>
  )
}

export function Sparkle({ className = "", size = 24, style }: { className?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2 L13.5 9 L20 10.5 L13.5 12 L12 19 L10.5 12 L4 10.5 L10.5 9 Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <path d="M18 4 L18.8 7.5 L22 8 L18.8 8.5 L18 12 L17.2 8.5 L14 8 L17.2 7.5 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    </svg>
  )
}

export function CrochetButterfly({ className = "", size = 44, style }: { className?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 50 44" width={size} height={size * 0.88} className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 30 C25 30 15 22 8 14 C4 10 4 4 9 4 C14 4 20 12 25 18 C30 12 36 4 41 4 C46 4 46 10 42 14 C35 22 25 30 25 30Z" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <path d="M25 30 L25 44" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="25" cy="32" r="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

export function CuteBow({ className = "", size = 40, style }: { className?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 20 C12 10 4 6 4 12 C4 16 10 20 20 20 C30 20 36 16 36 12 C36 6 28 10 20 20Z" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <path d="M20 20 L20 38" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <path d="M8 6 Q14 2 20 10 Q26 2 32 6" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none" />
      <circle cx="20" cy="20" r="2" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}

export function Crown({ className = "", size = 50, style }: { className?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 50 36" width={size} height={size * 0.72} className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 32 L8 8 L16 18 L25 4 L34 18 L42 8 L46 32 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <line x1="4" y1="32" x2="46" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="25" cy="8" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="14" cy="16" r="1.5" fill="currentColor" opacity="0.25" />
      <circle cx="36" cy="16" r="1.5" fill="currentColor" opacity="0.25" />
    </svg>
  )
}

export function MagicWand({ className = "", size = 36, style }: { className?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 30 50" width={size * 0.6} height={size} className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="8" y1="46" x2="24" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M24 6 L26 2 L28 6 L24 6Z" fill="currentColor" opacity="0.5" />
      <circle cx="26" cy="8" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="22" cy="12" r="1" fill="currentColor" opacity="0.25" />
      <circle cx="28" cy="4" r="1" fill="currentColor" opacity="0.25" />
    </svg>
  )
}

export function CrochetLeaf({ className = "", size = 30, style }: { className?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 20 30" width={size * 0.67} height={size} className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 28 C2 20 2 6 10 2 C18 6 18 20 10 28Z" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M10 2 L10 28" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
    </svg>
  )
}

export function StarSparkle({ className = "", size = 20, style }: { className?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} className={className} style={style} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0 L11.5 7 L18 8.5 L11.5 10 L10 17 L8.5 10 L2 8.5 L8.5 7 Z" opacity="0.6" />
    </svg>
  )
}
