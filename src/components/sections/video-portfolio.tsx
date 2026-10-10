"use client"

import { useMemo, useState } from "react"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { PieceCard } from "@/components/ui/piece-card"
import { films } from "@/data/work"
import { cn } from "@/lib/utils"

/**
 * Sixteen items is past the point where a flat grid is scannable, so they are
 * chunked into named groups. Nothing is hidden by default — "All" is the
 * starting state — the filters just give someone looking for one specific kind
 * of work a way to stop reading everything else.
 */
const filters = [
  { label: "All", match: () => true },
  { label: "Podcast", match: (t: string[]) => t.includes("Podcast") },
  { label: "Explainer", match: (t: string[]) => t.includes("Explainer") },
  { label: "Branded", match: (t: string[]) => t.includes("Branded") || t.includes("Event") },
  { label: "Creator", match: (t: string[]) => t.includes("Creator") || t.includes("Personal") },
]

export function VideoPortfolio({
  posters,
}: {
  posters: Record<string, string | null>
}) {
  const [activeFilter, setActiveFilter] = useState("All")

  const visible = useMemo(() => {
    const filter = filters.find((f) => f.label === activeFilter) ?? filters[0]
    return films.filter((piece) => filter.match(piece.tags))
  }, [activeFilter])

  return (
    <section
      id="work"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-16 md:px-12 md:py-24"
    >
      <SectionHeading
        index="05"
        meta="Selected work"
        title="Long-form"
        lede="Podcasts, explainers and branded films. Most of these run past twenty minutes, which means the whole job is deciding what to cut."
      />

      <Reveal delay={0.1}>
        <div
          className="mt-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter work by type"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.label
            return (
              <button
                key={filter.label}
                type="button"
                onClick={() => setActiveFilter(filter.label)}
                aria-pressed={isActive}
                className={cn(
                  "border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors duration-200",
                  isActive
                    ? "border-ink bg-ink text-paper"
                    : "border-hairline text-ink-3 hover:border-ink hover:text-ink"
                )}
              >
                {filter.label}
              </button>
            )
          })}
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((piece, i) => (
          <Reveal key={piece.id} delay={Math.min(i, 5) * 0.06}>
            <PieceCard
              piece={piece}
              index={i}
              aspect="16/9"
              poster={posters[piece.id]}
            />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-sm text-ink-3">Nothing in this category yet.</p>
      )}
    </section>
  )
}
