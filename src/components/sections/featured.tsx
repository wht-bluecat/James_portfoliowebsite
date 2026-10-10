"use client"

import { Reveal } from "@/components/ui/reveal"
import { VideoEmbed } from "@/components/ui/video-embed"
import { featured } from "@/data/work"

/**
 * One piece, given the room it earned.
 *
 * A flat wall of sixteen equal thumbnails asks the visitor to work out which
 * one is the good one. This does that work for them: the strongest result on
 * the reel gets the largest frame, the numbers beside it and the story of why
 * it worked, and everything after it is read in that light.
 */
export function Featured() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-16 pt-14 md:px-12 md:pb-24 md:pt-20">
      <div className="rule-t pt-6">
        <Reveal>
          <span className="mono-label">[02] Case study · {featured.client}</span>
        </Reveal>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <VideoEmbed
            provider={featured.provider}
            id={featured.id}
            title={featured.title}
            aspect="16/9"
            priority
          />
        </Reveal>

        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <Reveal delay={0.08}>
              <h2 className="font-heading text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink">
                {featured.title}
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-2">
                {featured.summary}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-5 text-[13px] text-ink-3">{featured.role}</p>
            </Reveal>
          </div>

          <Reveal delay={0.26}>
            <dl className="rule-t mt-8 grid grid-cols-3 gap-4 pt-6">
              {featured.metrics.map((metric) => (
                // Label first in the DOM so it reads as "Views: 5.0K", then
                // reversed visually so the number is what the eye lands on.
                <div key={metric.label} className="flex flex-col-reverse">
                  <dt className="mono-label mt-1.5">{metric.label}</dt>
                  <dd className="font-heading text-3xl font-black tracking-tight text-ink md:text-4xl">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
