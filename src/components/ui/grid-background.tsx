/**
 * Four faint column rules behind the whole page.
 *
 * The previous version drew these with a repeating gradient measured in pixels,
 * which laid a hard stripe across the page every 280px regardless of where the
 * content sat. These are four fixed hairlines that fade at both ends, so they
 * read as a margin guide rather than as ruled paper.
 */
export function GridBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="column-rules" aria-hidden="true">
        {[20, 40, 60, 80].map((pct) => (
          <span key={pct} style={{ left: `${pct}%` }} />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
