import { Link, NavLink } from 'react-router-dom'

/**
 * Renders one nav entry: plain routes (/services, /team, /contact) use NavLink
 * so the current page gets aria-current="page" (styled via CSS); home-section
 * entries ('/#about' …) use a plain router Link. The Home entry ('/') passes
 * `end` so it is only active on the root route, never as a prefix match.
 */
export function NavItemLink({
  entry,
  className,
  activeClassName = '',
  onClick,
}: {
  entry: { label: string; to: string }
  className: string
  activeClassName?: string
  onClick?: () => void
}) {
  if (entry.to.startsWith('/#')) {
    return (
      <Link to={entry.to} className={className} onClick={onClick}>
        {entry.label}
      </Link>
    )
  }
  return (
    <NavLink to={entry.to} end={entry.to === '/'} className={({ isActive }) => `${className}${isActive ? ` ${activeClassName}` : ''}`} onClick={onClick}>
      {entry.label}
    </NavLink>
  )
}
