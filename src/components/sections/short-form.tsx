"use client"

import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { PieceCard } from "@/components/ui/piece-card"
import { verticals } from "@/data/work"

/**
 * Vertical work, shown vertically. Posters for the Vimeo piece are resolved on
 * the server and handed down, because Vimeo thumbnail URLs are signed and
 * cannot be constructed from the video id the way YouTube's can.
 */
export function ShortForm({ posters }: { posters: Record<string, string | null> }) {
  return (
    <section
      id="vertical"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-16 md:px-12 md:py-24"
    >
      <SectionHeading
        index="06"
        meta="Short-form"
        title="Vertical"
        lede="Shorts, Reels and vertical ads. Every Green Thumb Depot clip goes out as a Short and as a Reel on the same day, so each card shows the count from whichever platform it did better on."
      />

      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
        {verticals.map((piece, i) => (
          <Reveal key={piece.id} delay={Math.min(i, 5) * 0.05}>
            <PieceCard
              piece={piece}
              index={i}
              aspect="9/16"
              poster={posters[piece.id]}
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
