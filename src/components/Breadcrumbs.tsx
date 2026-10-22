import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

/** Visible breadcrumb trail (paired with BreadcrumbList JSON-LD via Seo). */
export function Breadcrumbs({ crumbs }: { crumbs: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink/55">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1
          return (
            <li key={c.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={14} aria-hidden="true" className="text-ink/30" />}
              {c.to && !last ? (
                <Link to={c.to} className="font-medium transition hover:text-accent hover:underline underline-offset-4">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold text-ink">
                  {c.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
