"use client"

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { pipeline, publishesTo, worksIn } from "@/data/work"
import { cn } from "@/lib/utils"

/**
 * Everything one recording turns into.
 *
 * The offer on this page is not "I edit video", it is "I run the channel", and
 * a list of services does not make that land. So the list is tied to an edit
 * timeline: one track per stage, and as the visitor reads down the stages the
 * playhead scrubs across and the track they are reading lights up. By the last
 * row they have watched one recording fill nine tracks.
 *
 * On a phone the timeline sits above the list with every track lit; pinning it
 * there would cost half the screen.
 */

/** Length of the stand-in recording on the timecode readout, in seconds. */
const RUNTIME = 74 * 60 + 39

const timecode = (progress: number) => {
  const t = Math.round(Math.min(1, Math.max(0, progress)) * RUNTIME)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${pad(Math.floor(t / 3600))}:${pad(Math.floor((t % 3600) / 60))}:${pad(t % 60)}`
}

export function Pipeline() {
  const listRef = useRef<HTMLOListElement>(null)
  const rowRefs = useRef<(HTMLLIElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [clock, setClock] = useState(timecode(0))
  const reduced = useReducedMotion()

  // The playhead follows the reader down the list: it starts as the first row
  // reaches the middle of the screen and lands as the last one does.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.55", "end 0.55"],
  })
  const playhead = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  useMotionValueEvent(scrollYProgress, "change", (value) => setClock(timecode(value)))

  // Whichever row is crossing the middle of the viewport is the one being read.
  useEffect(() => {
    const rows = rowRefs.current.filter((row): row is HTMLLIElement => row !== null)
    if (rows.length === 0 || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(rows.indexOf(entry.target as HTMLLIElement))
        }
      },
      { rootMargin: "-45% 0px -55% 0px" }
    )
    rows.forEach((row) => observer.observe(row))
    return () => observer.disconnect()
  }, [])

  const stage = pipeline[active]

  return (
    <section
      id="services"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-16 md:px-12 md:py-24"
    >
      <SectionHeading
        index="03"
        meta="The whole channel"
        title={"One recording in.\nA whole week out."}
        lede="Most editors hand back a file. I hand back a published week: the episode, everything cut from it, the packaging on every piece and a report on how it did."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* ── The timeline ─────────────────────────────────────────────── */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div
                className="border border-hairline bg-raised"
                role="img"
                aria-label={`An edit timeline with ${pipeline.length} tracks, one for each stage listed alongside: ${pipeline.map((s) => s.track).join(", ")}.`}
              >
                <div className="rule-b flex items-center justify-between gap-4 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    Raw recording
                  </span>
                  <span className="tabular-nums text-ink-2">{reduced ? timecode(1) : clock}</span>
                </div>

                <div className="relative px-4 py-4">
                  <div className="flex flex-col gap-[7px]">
                    {pipeline.map((item, i) => {
                      const lit = reduced || i === active
                      return (
                        <div key={item.track} className="grid grid-cols-[5.25rem_1fr] items-center gap-3">
                          <span
                            className={cn(
                              "truncate font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-300",
                              lit ? "text-ink" : "text-ink-3"
                            )}
                          >
                            <span className="text-ink-3">{String(i + 1).padStart(2, "0")}</span>{" "}
                            {item.track}
                          </span>
                          <span className="relative block h-[18px] bg-shade/70">
                            {item.clips.map(([left, width]) => (
                              <span
                                key={left}
                                className={cn(
                                  "absolute inset-y-0 rounded-[1px] transition-colors duration-300",
                                  // Every track is lit below the lg breakpoint,
                                  // where there is no pinned playhead to follow.
                                  lit ? "bg-brand" : "bg-brand lg:bg-chart-context/55"
                                )}
                                style={{ left: `${left}%`, width: `${width}%` }}
                              />
                            ))}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Playhead, laid over the lanes on the same column grid. */}
                  {!reduced && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-2 left-[calc(1rem+5.25rem+0.75rem)] right-4 hidden lg:block"
                    >
                      <motion.span
                        className="absolute inset-y-0 -ml-px w-0.5 bg-ink"
                        style={{ left: playhead }}
                      >
                        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-ink" />
                      </motion.span>
                    </div>
                  )}
                </div>

                <div className="rule-t hidden items-center justify-between gap-4 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.1em] lg:flex">
                  <span className="min-w-0 truncate text-ink-2">
                    <span className="text-ink-3">Goes to </span>
                    {stage.goes.join(" · ")}
                  </span>
                  <span className="shrink-0 tabular-nums text-ink-3">
                    {String(active + 1).padStart(2, "0")} / {String(pipeline.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-6 grid gap-5 text-[13px] leading-relaxed sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <dt className="mono-label">Publishes to</dt>
                  <dd className="mt-1.5 text-ink-2">{publishesTo.join(", ")}</dd>
                </div>
                <div>
                  <dt className="mono-label">Works in</dt>
                  <dd className="mt-1.5 text-ink-2">{worksIn.join(", ")}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>

        {/* ── The stages ───────────────────────────────────────────────── */}
        <ol ref={listRef} className="lg:col-span-7">
          {pipeline.map((item, i) => (
            <li
              key={item.track}
              ref={(node) => {
                rowRefs.current[i] = node
              }}
              className="rule-t grid grid-cols-[2.75rem_1fr] gap-x-4 py-7 first:border-t-0 first:pt-0 md:grid-cols-[4rem_1fr] md:py-9 lg:first:border-t lg:first:pt-9"
            >
              <span
                className={cn(
                  "pt-1 font-mono text-[11px] tracking-[0.12em] transition-colors duration-300",
                  i === active ? "text-brand" : "text-ink-3"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight text-ink md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-2">{item.body}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Where it goes">
                  {item.goes.map((place) => (
                    <li
                      key={place}
                      className="border border-hairline px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3"
                    >
                      {place}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
