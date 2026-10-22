"use client"

import { Reveal } from "@/components/ui/reveal"
import { VideoEmbed } from "@/components/ui/video-embed"
import { Tiles, type Tile } from "@/components/sections/results"
import { channelVideos, isMine } from "@/data/channel"
import { formatViews, latest } from "@/data/work"

/**
 * The newest full episode and how its first day went.
 *
 * Results proves the run with public counts; this shows the one thing those
 * cannot: what YouTube itself did with a new upload in its first hours. The
 * numbers are Studio analytics, so the section says so and dates the read.
 */

const s = latest.studio
const hours = Math.round((Date.parse(s.measuredAt) - Date.parse(latest.publishedAt)) / 3_600_000)
const previousBest = Math.max(...channelVideos.filter((v) => !isMine(v)).map((v) => v.views))

const clock = (n: number) => {
  const total = Math.round(n)
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`
}
const percent = (n: number) => `${n.toFixed(1)}%`

const manila = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Manila",
})
const day = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Manila",
})

const tiles: Tile[] = [
  {
    value: s.views,
    format: (n) => formatViews(Math.round(n)),
    label: `Views in its first ${hours} hours`,
    detail: `More than any video the channel published before June 2026 has in its lifetime. The best of those has ${formatViews(previousBest)}.`,
  },
  {
    value: s.watchHours,
    format: (n) => Math.round(n).toLocaleString("en-US"),
    label: "Hours watched",
    detail: `In the same ${hours} hours, on a ${latest.duration} episode.`,
  },
  {
    value: s.averageViewSeconds,
    format: clock,
    label: "Average view duration",
    detail: "Per view, from an audience that almost entirely found it in their feeds.",
  },
  {
    value: s.clickThroughRate,
    format: percent,
    label: "Thumbnail click-through rate",
    detail: `On ${formatViews(s.impressions)} thumbnail impressions.`,
  },
  {
    value: s.browseShare,
    format: percent,
    label: "Of views from YouTube's feeds",
    detail: `Browse features: YouTube putting it on home and subscription feeds. Search brought ${s.searchShare}%.`,
  },
]

const sourceLink = "link-underline text-ink-2 hover:text-ink"

export function Latest() {
  return (
    <section
      id="latest"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 pb-16 pt-14 md:px-12 md:pb-24 md:pt-20"
    >
      <div className="rule-t pt-6">
        <Reveal>
          <span className="mono-label">[Latest] Newest episode · {latest.client}</span>
        </Reveal>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <VideoEmbed provider={latest.provider} id={latest.id} title={latest.title} aspect="16/9" />
        </Reveal>

        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <Reveal delay={0.08}>
              <h2 className="font-heading text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink">
                {latest.title}
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-2">{latest.summary}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-5 text-[13px] text-ink-3">{latest.role}</p>
            </Reveal>
          </div>

          <Reveal delay={0.26}>
            <p className="mono-label rule-t mt-8 pt-6">
              Live {day.format(Date.parse(latest.publishedAt))} · {latest.duration}
            </p>
          </Reveal>
        </div>
      </div>

      <Tiles tiles={tiles} className="mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" />

      <Reveal delay={0.1}>
        <p className="mt-6 max-w-3xl text-[12px] leading-relaxed text-ink-3">
          {`Source: YouTube Studio, read ${manila.format(Date.parse(s.measuredAt))} Manila time, ${hours} hours after the episode went live. `}
          These are the channel&apos;s own analytics, not public counts, so the counter on the{" "}
          <a
            href={`https://www.youtube.com/watch?v=${latest.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={sourceLink}
          >
            video page
          </a>{" "}
          runs a little behind them.
        </p>
      </Reveal>
    </section>
  )
}
