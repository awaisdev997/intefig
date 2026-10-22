/**
 * INTEFIG brand logo — vector recreation of the owner's app-icon mark
 * (navy/blue/orange identity): two slanted blue slabs offset diagonally,
 * twin orange-gradient bars with node dots, forming an abstract "f".
 * Paired with the "iNTEFIG" wordmark whose i-dot is the orange dash,
 * matching the icon. Use LogoMark alone where a compact glyph is needed
 * (favicon, loader) and LogoLockup for navbar/footer brand blocks.
 */

const BLUE_STOPS = (
  <>
    <stop offset="0" stopColor="#2BA8EE" />
    <stop offset="1" stopColor="#1860F9" />
  </>
)
const ORANGE_STOPS = (
  <>
    <stop offset="0" stopColor="#FC8525" />
    <stop offset="1" stopColor="#FD3E2D" />
  </>
)

/** The symbol only. `idSuffix` keeps gradient ids unique when used twice on a page. */
export function LogoMark({ className = '', idSuffix = 'a' }: { className?: string; idSuffix?: string }) {
  const blue = `logoBlue-${idSuffix}`
  const orange = `logoOrange-${idSuffix}`
  return (
    <svg viewBox="90 35 320 310" className={className} role="img" aria-label="INTEFIG logo mark" fill="none">
      <defs>
        <linearGradient id={blue} x1="1" y1="0" x2="0" y2="1">
          {BLUE_STOPS}
        </linearGradient>
        <linearGradient id={orange} x1="0" y1="0" x2="0.4" y2="1">
          {ORANGE_STOPS}
        </linearGradient>
      </defs>
      <polygon points="238,74 326,44 326,116 238,146" fill={`url(#${blue})`} />
      <polygon points="156,262 234,234 234,306 156,334" fill={`url(#${blue})`} />
      <g stroke={`url(#${orange})`} strokeLinecap="round" fill="none">
        <path d="M172,196 L338,156" strokeWidth="42" />
        <path d="M160,248 L318,210" strokeWidth="42" />
        <path d="M340,158 L368,148" strokeWidth="8" />
        <path d="M152,242 L128,250" strokeWidth="8" />
      </g>
      <circle cx="384" cy="146" r="17" fill={`url(#${orange})`} />
      <circle cx="112" cy="252" r="17" fill={`url(#${orange})`} />
    </svg>
  )
}

/**
 * Full horizontal lockup: symbol + "iNTEFIG" wordmark.
 * variant "light" = ink wordmark for light backgrounds; "dark" = white wordmark.
 */
export function LogoLockup({
  variant = 'light',
  className = '',
  markClassName = 'h-9 w-9',
  textClassName = 'text-[21px]',
  idSuffix = 'a',
}: {
  variant?: 'light' | 'dark'
  className?: string
  markClassName?: string
  textClassName?: string
  idSuffix?: string
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={`${markClassName} shrink-0`} idSuffix={idSuffix} />
      <span
        className={`font-display font-extrabold leading-none tracking-tight ${variant === 'dark' ? 'text-white' : 'text-ink'} ${textClassName}`}
        aria-hidden="true"
      >
        <span className="relative inline-block">
          i
          <span className="absolute left-1/2 top-[0.04em] h-[0.15em] w-[0.36em] -translate-x-1/2 -skew-x-[24deg] rounded-[1px] bg-gradient-to-r from-[#FC8525] to-[#FD3E2D]" />
        </span>
        NTEFIG
      </span>
    </span>
  )
}
