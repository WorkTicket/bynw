/** Hand-drawn yarn ball + wrapping strand for the desktop nav pill. */

export function YarnBall({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="yarnBallBody" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#fff6f5" />
          <stop offset="45%" stopColor="#f5b8be" />
          <stop offset="100%" stopColor="#e07a86" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="15.5" fill="url(#yarnBallBody)" opacity="0.95" />
      <circle cx="20" cy="20" r="15.5" stroke="#c94d64" strokeWidth="1.1" opacity="0.35" />
      {/* Concentric yarn coils — irregular on purpose */}
      <path
        d="M8.2 16.5 C12 11.5 18 9.2 24.5 10.5 C29.5 11.5 33.2 15 34 19.2"
        stroke="#c94d64"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M7.5 21.5 C11.5 16 18.5 13.8 26 15.2 C30.5 16.1 33.5 19.2 34.2 23"
        stroke="#a83a52"
        strokeWidth="1.05"
        strokeLinecap="round"
        opacity="0.38"
      />
      <path
        d="M9 26 C13.5 21.2 20 19.5 27 21.2 C31 22.2 33.4 25 33.8 28"
        stroke="#c94d64"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M12 11.5 C16 14.5 18.5 19 18.2 24.5 C18 28.5 16.2 31.5 13.5 33.2"
        stroke="#e07a86"
        strokeWidth="0.95"
        strokeLinecap="round"
        opacity="0.42"
      />
      <path
        d="M17.5 9.2 C21 13 22.8 18 22 24 C21.4 28.2 19.2 31.5 16 33.5"
        stroke="#c94d64"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.32"
      />
      <path
        d="M24 10 C26.5 14.5 27.5 19.5 26.2 25 C25.2 29 22.5 32 19 33.8"
        stroke="#eba0a8"
        strokeWidth="0.95"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Loose end peeking out */}
      <path
        d="M31.5 12.5 C34 10.5 36.5 9.2 38.5 9.8"
        stroke="#c94d64"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="14" cy="15" r="1.1" fill="#fff9f8" opacity="0.55" />
    </svg>
  )
}

/** Organic yarn path that wraps the nav capsule (viewBox matches pill aspect). */
export function YarnWrapPath({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 52"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer wrap — top */}
      <path
        className="yarn-strand yarn-strand--a"
        d="M18 26 C18 12 32 4 52 5.5 C90 8 140 3 190 6 C250 10 300 2 360 7 C410 11 450 6 482 14 C500 20 504 28 498 34"
        stroke="#c94d64"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
        pathLength="1"
      />
      {/* Mid wrap — bottom undulation */}
      <path
        className="yarn-strand yarn-strand--b"
        d="M22 28 C28 40 55 46 95 43 C150 38 200 48 260 42 C320 36 380 48 430 41 C465 36 490 40 502 30"
        stroke="#e07a86"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.48"
        pathLength="1"
      />
      {/* Crossing loop near left (from ball) */}
      <path
        className="yarn-strand yarn-strand--c"
        d="M14 22 C8 18 10 10 22 9 C40 7.5 48 18 42 26 C36 34 22 36 16 30"
        stroke="#a83a52"
        strokeWidth="1.45"
        strokeLinecap="round"
        opacity="0.5"
        pathLength="1"
      />
      {/* Small stitch ticks along the bottom edge */}
      <path
        className="yarn-strand yarn-strand--d"
        d="M70 44 L74 40 M110 45 L114 41 M155 46 L159 42 M205 45 L209 41 M255 44 L259 40 M305 46 L309 42 M355 45 L359 41 M405 44 L409 40 M450 43 L454 39"
        stroke="#eba0a8"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  )
}

/** Tiny yarn ring that wraps the logo mark. */
export function YarnLogoRing({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        className="yarn-logo-ring__path"
        d="M28 4.5 C40 5 50 14 51.5 26 C53 38 45 49 33 51.5 C21 54 9 47 6 35 C3 23 12 8 28 4.5"
        stroke="#c94d64"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.55"
        pathLength="1"
      />
      <path
        d="M30 3.2 C36 6 42 8 46 12"
        stroke="#e07a86"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M48 42 C44 48 36 52 28 52.5"
        stroke="#eba0a8"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Loose end */}
      <path
        d="M26 3.5 C22 1.5 18 2 15 4"
        stroke="#a83a52"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}
