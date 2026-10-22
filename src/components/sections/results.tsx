"use client"

import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { CountUp } from "@/components/ui/count-up"
import { ColumnChart, type ColumnGroup } from "@/components/ui/column-chart"
import { formatViews, latest } from "@/data/work"
import {
  channelVideos,
  INSTAGRAM_FOLLOWERS,
  INSTAGRAM_MEASURED,
  isEpisode,
  isMine,
  reels,
  run,
  SHORTS_SHIPPED,
  YOUTUBE_MEASURED,
} from "@/data/channel"

/**
 * The claim the rest of the page rests on, made with numbers a stranger can
 * check. Every figure below is derived from data/channel.ts, which holds
 * nothing but public counts, so refreshing the proof is one file and no
 * sentence here can drift away from the data underneath it.
 */

const utc = (iso: string) => Date.parse(`${iso}T00:00:00Z`)
const WEEK = 7 * 86_400_000
const sum = (list: number[]) => list.reduce((a, b) => a + b, 0)

const long = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
})
const month = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})
const span = (dates: string[]) =>
  `${month.format(utc(dates[0]))} to ${month.format(utc(dates[dates.length - 1]))}`

/* ── YouTube ─────────────────────────────────────────────────────────────── */

const mine = channelVideos.filter(isMine)
const before = channelVideos.filter((v) => !isMine(v))
const top = (list: typeof channelVideos) => list.reduce((a, b) => (b.views > a.views ? b : a))

const viewsMine = sum(mine.map((v) => v.views))
const viewsBefore = sum(before.map((v) => v.views))
const record = top(mine)
const oldRecord = top(before)

/** How many of the channel's most-watched long-form videos, counting down from
    the top, were published since the takeover before an older one appears. */
const streak = [...channelVideos].sort((a, b) => b.views - a.views).findIndex((v) => !isMine(v))

const { weeks, published: shipped } = run
const episodes = mine.filter(isEpisode).length

const youtubeTiles = [
  {
    value: viewsMine,
    format: (n: number) => formatViews(Math.round(n)),
    label: `Long-form views in ${weeks} weeks`,
    detail: `The ${before.length} videos uploaded before that have ${formatViews(viewsBefore)} between them, counting every view since 2024.`,
  },
  {
    value: record.views / oldRecord.views,
    format: (n: number) => `${n.toFixed(1)}x`,
    label: "The old long-form record",
    detail: `${record.title.split(":")[0]} is at ${formatViews(record.views)} views, the most-watched video the channel has published. The long-form best before it was ${formatViews(oldRecord.views)}.`,
  },
  {
    value: streak,
    format: (n: number) => `${Math.round(n)} of ${streak}`,
    label: "Most-watched long-form videos",
    detail: `All of the channel's top ${streak} long-form videos were cut, packaged and published in this run.`,
  },
  {
    value: shipped,
    format: (n: number) => String(Math.round(n)),
    label: "Videos published",
    detail: `${episodes} full episodes, ${mine.length - episodes} shorter cuts and ${SHORTS_SHIPPED} Shorts. About ${Math.round(shipped / weeks)} a week.`,
  },
]

const videoColumn = (v: (typeof channelVideos)[number]) => ({
  key: v.id,
  title: v.title,
  date: v.date,
  value: v.views,
  href: `https://www.youtube.com/watch?v=${v.id}`,
})

const youtubeGroups: ColumnGroup[] = [
  {
    caption: [span(before.map((v) => v.date)), `${before.length} videos`],
    emphasis: false,
    columns: before.map(videoColumn),
  },
  {
    caption: [span(mine.map((v) => v.date)), `${mine.length} videos`],
    emphasis: true,
    columns: mine.map(videoColumn),
  },
]

/* ── Instagram ───────────────────────────────────────────────────────────── */

const plays = reels.map((r) => r.plays)
const topReel = reels.reduce((a, b) => (b.plays > a.plays ? b : a))
const reelWeeks = Math.floor((utc(INSTAGRAM_MEASURED) - utc(reels[0].date)) / WEEK)
const past = (n: number) => plays.filter((p) => p >= n).length

const instagramTiles = [
  {
    value: sum(plays),
    format: (n: number) => formatViews(Math.round(n)),
    label: "Reel plays",
    detail: `${reels.length} Reels in ${reelWeeks} weeks, on an account with ${INSTAGRAM_FOLLOWERS.toLocaleString("en-US")} followers.`,
  },
  {
    value: topReel.plays,
    format: (n: number) => formatViews(Math.round(n)),
    label: "Top Reel",
    detail: `${Math.floor(topReel.plays / INSTAGRAM_FOLLOWERS)} times the follower count. The top three were all cut from the same episode.`,
  },
  {
    value: past(1000),
    format: (n: number) => String(Math.round(n)),
    label: "Reels past 1,000 plays",
    detail: `${past(5000)} of them past 5,000.`,
  },
]

const reelGroups: ColumnGroup[] = [
  {
    caption: [span(reels.map((r) => r.date)), `${reels.length} Reels`],
    emphasis: true,
    columns: reels.map((r) => ({
      key: r.code,
      title: r.caption,
      date: r.date,
      value: r.plays,
      href: `https://www.instagram.com/p/${r.code}/`,
    })),
  },
]

/* ── Layout ──────────────────────────────────────────────────────────────── */

export type Tile = (typeof youtubeTiles)[number]

export function Tiles({ tiles, className }: { tiles: Tile[]; className: string }) {
  return (
    <dl className={`grid border-l border-t border-hairline ${className}`}>
      {tiles.map((tile, i) => (
        // Label, value, detail in the DOM, so it reads "Videos published: 110".
        // `order` then lifts the number to the top, where the eye lands first.
        <Reveal
          key={tile.label}
          delay={i * 0.07}
          className="flex flex-col border-b border-r border-hairline bg-raised/60 p-6 md:p-7"
        >
          <dt className="mono-label order-2 mt-3 text-ink-2">{tile.label}</dt>
          <dd className="order-1 font-heading text-[clamp(2.75rem,4.6vw,4rem)] font-black leading-none tracking-[-0.04em] text-ink">
            <CountUp value={tile.value} format={tile.format} />
          </dd>
          <dd className="order-3 mt-3 text-[13px] leading-relaxed text-ink-3">{tile.detail}</dd>
        </Reveal>
      ))}
    </dl>
  )
}

function Platform({ name, note }: { name: string; note: string }) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="font-heading text-2xl font-bold tracking-[-0.02em] text-ink md:text-3xl">
          {name}
        </h3>
        <p className="mono-label">{note}</p>
      </div>
    </Reveal>
  )
}

const sourceLink = "link-underline text-ink-2 hover:text-ink"

export function Results() {
  return (
    <section
      id="results"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 pb-16 pt-14 md:px-12 md:pb-24 md:pt-20"
    >
      <SectionHeading
        index="01"
        meta="Results · Green Thumb Depot"
        title={`${weeks} weeks.\n${shipped} videos.\nOne editor.`}
        lede="Green Thumb Depot's YouTube channel had gone more than nine months without an upload when I picked it up in June 2026. Since then I have cut, animated, packaged and published everything on it, and on its Instagram. Every number here is a public count that anyone can check."
      />

      <div className="mt-14">
        <Platform name="YouTube" note={`Public view counts · ${long.format(utc(YOUTUBE_MEASURED))}`} />
        <Tiles tiles={youtubeTiles} className="mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" />

        <Reveal delay={0.08} className="mt-5">
          <ColumnChart
            title="Views per long-form video, in publish order"
            unit="views"
            groups={youtubeGroups}
            ticks={[12_000, 8_000, 4_000, 0]}
            marks={{
              [record.id]: `${formatViews(record.views)} · channel record`,
              [oldRecord.id]: `${formatViews(oldRecord.views)} · old record`,
              [latest.id]: `${formatViews(channelVideos.find((v) => v.id === latest.id)?.views ?? 0)} · first day`,
            }}
            legend={{ emphasis: "Since I picked it up", context: "Before" }}
            gapLabel="10 months, no uploads"
            tableCaption="Long-form videos on the Green Thumb Depot YouTube channel, with publish date and public view count"
          />
        </Reveal>
      </div>

      <div className="mt-16 md:mt-20">
        <Platform
          name="Instagram"
          note={`Public play counts · ${long.format(utc(INSTAGRAM_MEASURED))}`}
        />

        <div className="mt-6 grid gap-5 lg:grid-cols-12">
          <Tiles tiles={instagramTiles} className="grid-cols-1 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1" />

          <Reveal delay={0.08} className="lg:col-span-8">
            <ColumnChart
              title="Plays per Reel, in publish order"
              unit="plays"
              groups={reelGroups}
              ticks={[18_000, 12_000, 6_000, 0]}
              marks={{ [topReel.code]: formatViews(topReel.plays) }}
              tableCaption="Reels on the Green Thumb Depot Instagram account, with publish date and public play count"
            />
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-6 max-w-3xl text-[12px] leading-relaxed text-ink-3">
          Sources:{" "}
          <a
            href="https://www.youtube.com/@GreenThumbDepot/videos"
            target="_blank"
            rel="noopener noreferrer"
            className={sourceLink}
          >
            youtube.com/@GreenThumbDepot
          </a>{" "}
          and{" "}
          <a
            href="https://www.instagram.com/greenthumbdepot/"
            target="_blank"
            rel="noopener noreferrer"
            className={sourceLink}
          >
            instagram.com/greenthumbdepot
          </a>
          , public counts only, no private analytics. YouTube began counting a view at
          the start of playback in late August 2026, which favours newer uploads. The expertise on screen
          belongs to the hosts and their guests; everything between the raw recording
          and the published post is my work.
        </p>
      </Reveal>
    </section>
  )
}
