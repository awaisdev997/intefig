/**
 * Loading placeholders, shown only while genuinely-async content loads
 * (lazy team photos, lazy Lottie data/player). Every skeleton mirrors the
 * size of the content it stands in for, so swapping it out never shifts
 * layout. Purely decorative: aria-hidden, and the shimmer is disabled
 * under prefers-reduced-motion (see .skeleton-shimmer in index.css).
 */
export function Skeleton({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`skeleton-shimmer rounded ${className}`} />
}

/**
 * Placeholder for one TeamGrid card: same frame, same aspect-[5/6] photo
 * area and the same name/role (and bio, when `detailed`) text block sizes.
 */
export function TeamCardSkeleton({ detailed = false }: { detailed?: boolean }) {
  return (
    <li aria-hidden="true" className="overflow-hidden rounded-3xl border border-ink/10 bg-white/70 shadow-card backdrop-blur">
      <div className="skeleton-shimmer aspect-[5/6] w-full" />
      <div className="p-5">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-2.5 h-3.5 w-1/2" />
        {detailed && (
          <>
            <Skeleton className="mt-3.5 h-3.5 w-full" />
            <Skeleton className="mt-2 h-3.5 w-4/5" />
          </>
        )}
      </div>
    </li>
  )
}
