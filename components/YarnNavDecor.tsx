/** Refined atelier yarn mark — monoline sphere, quiet boutique detail. */

export function YarnBall({ className = "", size = 22 }: { className?: string; size?: number }) {
  // Unique-ish ids per size instance to avoid gradient clashes when both nav + panel render.
  const gid = `yb${size}`
  return (
    <svg
      viewBox="0 0 36 36"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${gid}-fill`} cx="34%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fffaf9" />
          <stop offset="52%" stopColor="#ebc0c5" />
          <stop offset="100%" stopColor="#d16e7c" />
        </radialGradient>
        <linearGradient id={`${gid}-sheen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="18" cy="31.6" rx="8.5" ry="2" fill="#9e3d50" opacity="0.1" />
      <circle cx="18" cy="18" r="13.25" fill={`url(#${gid}-fill)`} />
      <circle cx="18" cy="18" r="13.25" stroke="#9e3d50" strokeWidth="0.7" opacity="0.22" />
      {/* Latitude coils */}
      <path
        d="M6.4 15.2c3.6-3.8 8.2-5.6 13.2-5.2 4.2.3 7.6 2.4 9.4 5.4"
        stroke="#8a3648"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.34"
      />
      <path
        d="M5.9 18.4c3.9-4.1 9-6 14.4-5.4 4.4.5 7.9 2.8 9.6 5.9"
        stroke="#8a3648"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.28"
      />
      <path
        d="M6.2 21.8c4-4 9.4-5.7 14.8-5 4.3.5 7.6 2.8 9.2 5.7"
        stroke="#8a3648"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.24"
      />
      <path
        d="M7.4 25c4.1-3.6 9.2-5 14.2-4.2 3.8.6 6.8 2.6 8.4 5.1"
        stroke="#8a3648"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.18"
      />
      {/* Longitude coils */}
      <path
        d="M12.2 7.6c2.8 3.4 4.2 7.6 3.9 12.2-.3 4.2-2 7.8-4.6 10.4"
        stroke="#a8485c"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.22"
      />
      <path
        d="M18.2 5.4c2.6 3.8 3.8 8.2 3.4 12.8-.4 4.4-2.2 8.2-5 10.8"
        stroke="#a8485c"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.16"
      />
      <path
        d="M24.2 7.2c2.2 3.6 3.2 7.8 2.8 12-.4 4-2 7.4-4.4 9.8"
        stroke="#a8485c"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.14"
      />
      <ellipse cx="12.5" cy="12" rx="4" ry="2.8" fill={`url(#${gid}-sheen)`} />
      {/* Short feed into the pill frame */}
      <path
        d="M29.8 14.4c1.8-1.1 3.4-1.5 4.8-1"
        stroke="#9e3d50"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  )
}

/** Short thread that tucks the ball into the CSS pill frame. */
export function YarnWrapPath({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 48"
      preserveAspectRatio="xMinYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        className="yarn-strand yarn-strand--entry"
        d="M4 24 C10 14 18 9 32 7.5"
        stroke="#9e3d50"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M6 26 C12 18 20 13 30 11"
        stroke="#e07a86"
        strokeWidth="0.65"
        strokeLinecap="round"
        opacity="0.28"
      />
    </svg>
  )
}

/** Quiet incomplete ring around the logo. */
export function YarnLogoRing({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="28"
        cy="28"
        r="25.25"
        stroke="#c94d64"
        strokeWidth="1.05"
        strokeLinecap="round"
        strokeDasharray="122 36"
        strokeDashoffset="10"
        opacity="0.38"
      />
      <circle
        cx="28"
        cy="28"
        r="23.5"
        stroke="#e07a86"
        strokeWidth="0.55"
        strokeDasharray="105 53"
        strokeDashoffset="24"
        opacity="0.2"
      />
    </svg>
  )
}
