"use client"

import { useInView } from "framer-motion"
import { useMemo, useRef, useState, type KeyboardEvent } from "react"
import { cn } from "@/lib/utils"

/**
 * One column per published video, in publish order.
 *
 * The form is emphasis, not comparison: the work this page is about wears the
 * brand colour and anything shown for context sits in grey, so the chart makes
 * one point and nobody has to decode a legend to get it.
 *
 * Reading a value works like scrubbing a timeline. Hover, tap or arrow across
 * the columns and the readout above the plot names the video under the
 * playhead. A floating tooltip would be clipped by the tallest column and
 * hidden under a thumb on a phone; a fixed readout has neither problem.
 */

export type Column = {
  key: string
  title: string
  /** YYYY-MM-DD */
  date: string
  value: number
  href: string
}

export type ColumnGroup = {
  /** Two short lines printed under the group on the x axis. */
  caption: [string, string]
  /** Brand colour when true, de-emphasis grey when false. */
  emphasis: boolean
  columns: Column[]
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})
const asDate = (iso: string) => new Date(`${iso}T00:00:00Z`)

/** Width of the silent stretch between two groups, in column-widths. */
const GAP = 5

export function ColumnChart({
  title,
  unit,
  groups,
  ticks,
  marks = {},
  legend,
  gapLabel,
  tableCaption,
}: {
  title: string
  /** "views" or "plays": printed after every value. */
  unit: string
  groups: ColumnGroup[]
  /** Axis ticks, largest first. The largest is the top of the plot. */
  ticks: number[]
  /** Direct labels by column key. Kept to the one or two that carry the story. */
  marks?: Record<string, string>
  /** Only for two groups. One series needs no legend; the title names it. */
  legend?: { emphasis: string; context: string }
  /** Written vertically in the gap between two groups. */
  gapLabel?: string
  tableCaption: string
}) {
  const top = ticks[0]
  const flat = useMemo(
    () => groups.flatMap((g) => g.columns.map((c) => ({ ...c, emphasis: g.emphasis }))),
    [groups]
  )
  const peak = useMemo(
    () => flat.reduce((best, c, i) => (c.value > flat[best].value ? i : best), 0),
    [flat]
  )

  const plotRef = useRef<HTMLDivElement>(null)
  const inView = useInView(plotRef, { once: true, margin: "-80px" })
  const [active, setActive] = useState<number | null>(null)
  const current = active === null ? null : flat[active]

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = flat.length - 1
    const from = active ?? peak
    const next =
      event.key === "ArrowRight"
        ? Math.min(last, from + 1)
        : event.key === "ArrowLeft"
          ? Math.max(0, from - 1)
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null
    if (next === null) return
    event.preventDefault()
    setActive(next)
  }

  let cursor = 0
  const plotted = groups.map((group) => {
    const start = cursor
    cursor += group.columns.length
    return { group, start }
  })

  return (
    <figure className="border border-hairline bg-raised p-5 md:p-8">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <h4 className="font-heading text-[15px] font-semibold tracking-tight text-ink">{title}</h4>
        {legend && (
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-ink-2">
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2.5 w-2.5 bg-brand" />
              {legend.emphasis}
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2.5 w-2.5 bg-chart-context" />
              {legend.context}
            </li>
          </ul>
        )}
      </figcaption>

      {/* Readout. Fixed height so the plot never jumps as it fills and empties. */}
      <div
        aria-live="polite"
        className="rule-b mt-5 flex h-11 items-center justify-between gap-4 font-mono text-[11px] tracking-[0.04em]"
      >
        {current ? (
          <>
            <span className="min-w-0 truncate text-ink">{current.title}</span>
            <span className="shrink-0 text-ink-2">
              <span className="hidden sm:inline">{dateFormat.format(asDate(current.date))} · </span>
              <span className="text-ink">
                {current.value.toLocaleString("en-US")} {unit}
              </span>
            </span>
          </>
        ) : (
          <span className="text-ink-3">
            <span className="sm:hidden">Tap a column to read it</span>
            <span className="hidden sm:inline">
              Hover a column, or focus the chart and use the arrow keys
            </span>
          </span>
        )}
      </div>

      <div className="mt-9 flex gap-3">
        <div
          aria-hidden="true"
          className="relative h-[220px] w-7 shrink-0 font-mono text-[10px] tabular-nums text-ink-3 md:h-[320px]"
        >
          {ticks.map((tick) => (
            <span
              key={tick}
              className="absolute right-0 translate-y-1/2 leading-none"
              style={{ bottom: `${(tick / top) * 100}%` }}
            >
              {tick === 0 ? "0" : `${tick / 1000}K`}
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <div
            ref={plotRef}
            role="group"
            tabIndex={0}
            aria-label={`${title}. Column chart of ${flat.length} items. Use the left and right arrow keys to read each one. The same data is in the table below the chart.`}
            onKeyDown={onKeyDown}
            onFocus={() => active === null && setActive(peak)}
            onBlur={() => setActive(null)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
            className="relative h-[220px] md:h-[320px]"
          >
            {ticks.map((tick) => (
              <span
                key={tick}
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 h-px",
                  tick === 0 ? "bg-ink-3/60" : "bg-hairline"
                )}
                style={{ bottom: `${(tick / top) * 100}%` }}
              />
            ))}

            <div className="absolute inset-0 flex items-end">
              {plotted.map(({ group, start }, g) => (
                <div key={group.caption[0]} className="contents">
                  {g > 0 && (
                    <div
                      aria-hidden="true"
                      className="relative flex h-full min-w-0 items-center justify-center"
                      style={{ flex: `${GAP} 1 0%` }}
                    >
                      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-hairline" />
                      {gapLabel && (
                        <span className="relative rotate-180 whitespace-nowrap bg-raised py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3 [writing-mode:vertical-rl]">
                          {gapLabel}
                        </span>
                      )}
                    </div>
                  )}

                  {group.columns.map((column, i) => {
                    const index = start + i
                    const height = Math.max(0.6, (column.value / top) * 100)
                    const isActive = active === index
                    // "10.5K · channel record": the number always shows, the
                    // words only where there is room for them.
                    const [markValue, ...markNote] = (marks[column.key] ?? "").split(" · ")
                    // A label on a column near the left edge would be clipped
                    // if it were centred, so it hangs to the right instead.
                    const nearLeft = index < flat.length * 0.12

                    return (
                      <div
                        key={column.key}
                        onPointerEnter={(e) => e.pointerType === "mouse" && setActive(index)}
                        onClick={() => setActive(index)}
                        className="relative flex h-full min-w-0 flex-1 basis-0 cursor-crosshair items-end justify-center"
                      >
                        {/* The playhead: a hairline through the column being read. */}
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink/35"
                          />
                        )}

                        <span
                          className={cn(
                            "relative mx-[0.5px] block w-full max-w-[14px] origin-bottom rounded-t-[2px] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:mx-px lg:mx-[2px]",
                            group.emphasis ? "bg-brand" : "bg-chart-context",
                            active !== null && !isActive && "opacity-40"
                          )}
                          style={{
                            height: `${height}%`,
                            transform: inView ? "scaleY(1)" : "scaleY(0)",
                            // The stagger belongs to the entrance only; on hover
                            // it would make the dimming ripple across the plot.
                            transitionDelay: inView && active === null ? `${index * 9}ms` : "0ms",
                          }}
                        />

                        {markValue && (
                          <span
                            aria-hidden="true"
                            className={cn(
                              "pointer-events-none absolute whitespace-nowrap font-mono text-[10px] tracking-[0.06em] text-ink-2 transition-opacity delay-700 duration-500",
                              nearLeft ? "left-0" : "left-1/2 -translate-x-1/2",
                              inView ? "opacity-100" : "opacity-0"
                            )}
                            style={{ bottom: `calc(${height}% + 7px)` }}
                          >
                            {markValue}
                            {markNote.length > 0 && (
                              <span className="hidden sm:inline"> · {markNote.join(" · ")}</span>
                            )}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* X axis: one caption per group, on the same proportions as the columns. */}
          <div className="mt-3 flex font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em]">
            {plotted.map(({ group }, g) => (
              <div key={group.caption[0]} className="contents">
                {g > 0 && <div style={{ flex: `${GAP} 1 0%` }} />}
                <div
                  className={cn("min-w-0", group.emphasis ? "text-ink-2" : "text-ink-3")}
                  style={{ flex: `${group.columns.length} 1 0%` }}
                >
                  <span className="block pr-2">{group.caption[0]}</span>
                  <span className="block pr-2">{group.caption[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The same data as a table, for anyone who would rather read than hover. */}
      <details className="group/data rule-t mt-7 pt-2">
        <summary className="flex min-h-11 w-fit cursor-pointer list-none items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3 transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-open/data:rotate-90"
          >
            &#8594;
          </span>
          Show every row
        </summary>
        <div className="mt-4 max-h-80 overflow-y-auto border border-hairline">
          <table className="w-full border-collapse text-left text-[13px]">
            <caption className="sr-only">{tableCaption}</caption>
            <thead className="sticky top-0 bg-raised">
              <tr className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">
                <th scope="col" className="border-b border-hairline px-3 py-2 font-normal">
                  Published
                </th>
                <th scope="col" className="border-b border-hairline px-3 py-2 font-normal">
                  Title
                </th>
                <th
                  scope="col"
                  className="border-b border-hairline px-3 py-2 text-right font-normal capitalize"
                >
                  {unit}
                </th>
              </tr>
            </thead>
            <tbody>
              {[...flat].reverse().map((column) => (
                <tr key={column.key} className="border-b border-hairline last:border-b-0">
                  <td className="whitespace-nowrap px-3 py-2 align-top font-mono text-[11px] text-ink-3">
                    {dateFormat.format(asDate(column.date))}
                  </td>
                  <td className="px-3 py-2 text-ink-2">
                    <a
                      href={column.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline hover:text-ink"
                    >
                      {column.title}
                    </a>
                  </td>
                  <td className="px-3 py-2 text-right align-top font-mono text-[12px] tabular-nums text-ink">
                    {column.value.toLocaleString("en-US")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  )
}
