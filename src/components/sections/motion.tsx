"use client"

import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { LoopVideo } from "@/components/ui/loop-video"
import { loops, type Loop } from "@/data/work"

/**
 * The animation, playing.
 *
 * Everywhere else on the page a video is a poster you have to click. Motion
 * design is the one kind of work where a still undersells it, so these loop
 * silently in place. They are small self-hosted files that only load and play
 * while they are on screen.
 */

function LoopCard({
  loop,
  index,
  lead = false,
  compact = false,
}: {
  loop: Loop
  index: number
  /** The largest card: bigger title. */
  lead?: boolean
  /** Title only, so two of these stack to the height of the lead beside them. */
  compact?: boolean
}) {
  return (
    <figure className="group">
      <LoopVideo
        src={`/motion/${loop.slug}.mp4`}
        poster={`/motion/${loop.slug}.jpg`}
        label={loop.title}
        aspect={loop.format}
      />
      <figcaption className="mt-3.5">
        <div className="mb-1.5 flex items-baseline justify-between gap-3 font-mono text-[10px] tracking-[0.12em] text-ink-3">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className="truncate uppercase">
            {loop.format === "4/5" ? "Vertical · built for a Short" : `Wide · ${loop.madeFor}`}
          </span>
        </div>
        <h3
          className={
            lead
              ? "font-heading text-xl font-semibold leading-snug tracking-tight text-ink md:text-2xl"
              : "font-heading text-[15px] font-semibold leading-snug tracking-tight text-ink"
          }
        >
          {loop.title}
        </h3>
        {!compact && (
          <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-ink-3">{loop.note}</p>
        )}
      </figcaption>
    </figure>
  )
}

export function Motion() {
  const wide = loops.filter((l) => l.format === "16/9")
  const tall = loops.filter((l) => l.format === "4/5")
  const [lead, ...rest] = wide

  return (
    <section
      id="motion"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-16 md:px-12 md:py-24"
    >
      <SectionHeading
        index="04"
        meta="Motion"
        title="Animation that teaches"
        lede="When a guest explains something nobody has footage of, I draw it. Each of these was designed and built in code for one moment in one episode: wide for the long-form, rebuilt vertical for the Short."
      />

      <div className="mt-12 grid gap-x-5 gap-y-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <LoopCard loop={lead} index={0} lead />
        </Reveal>

        {/* Spread to the full height of the lead card, so the two columns
            share a top edge and a bottom edge. */}
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:col-span-4 lg:flex lg:flex-col lg:justify-between lg:gap-y-6">
          {rest.map((loop, i) => (
            <Reveal key={loop.slug} delay={0.08 + i * 0.06}>
              <LoopCard loop={loop} index={i + 1} compact />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 md:mt-12 lg:grid-cols-4 lg:gap-x-5">
        {tall.map((loop, i) => (
          <Reveal key={loop.slug} delay={Math.min(i, 4) * 0.06}>
            <LoopCard loop={loop} index={wide.length + i} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
