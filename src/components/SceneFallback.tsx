export function SceneFallback({ labels = ['EMAIL', 'AUTOMATION', 'DATA', 'CUSTOMERS', 'REVENUE'], dark = false }: { labels?: string[]; dark?: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center" aria-hidden="true">
      <div className="css3d-card relative grid grid-cols-2 gap-3 p-6">
        {labels.map((l, i) => (
          <div key={l} className={`animate-float rounded-2xl px-5 py-4 font-display text-[11px] font-bold tracking-[0.18em] shadow-card ${i % 3 === 0 ? 'bg-accent text-white' : dark ? 'bg-white/10 text-white' : 'bg-white text-ink'}`} style={{ animationDelay: `${i * 0.7}s`, transform: `translateZ(${20 + i * 10}px)` }}>{l}</div>
        ))}
      </div>
      <div className="absolute h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
    </div>
  )
}
