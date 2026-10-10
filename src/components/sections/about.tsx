"use client"

import { Reveal } from "@/components/ui/reveal"

const stats = [
  { value: "3", label: "Years editing" },
  { value: "50+", label: "Projects shipped" },
  { value: "5", label: "Platforms", detail: "YouTube, Instagram, TikTok, X, Podcast" },
]

/**
 * What someone can actually hire James for. The old page implied the offer
 * through the reel and never stated it, which leaves the visitor to guess
 * whether their particular job is one he takes.
 */
const services = [
  {
    title: "Long-form editing",
    body: "Podcasts and interviews cut for retention, with teaching cards and chapters built in.",
  },
  {
    title: "Explainer animation",
    body: "Custom motion graphics for the abstract ideas that have no b-roll, built per format.",
  },
  {
    title: "Short-form",
    body: "Shorts, Reels and TikTok assembled from long-form, hooks written and tested first.",
  },
  {
    title: "Channel management",
    body: "Thumbnails, titles, captions, scheduling and posting across every platform, then a weekly report on what it did.",
  },
]

export function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-16 md:px-12 md:py-24"
    >
      <div className="rule-t grid grid-cols-1 gap-10 pt-6 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-2">
          <span className="mono-label">[07] About</span>
        </Reveal>

        <div className="md:col-span-6">
          <Reveal delay={0.08}>
            <h2 className="mb-7 font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.04] tracking-[-0.03em] text-ink">
              I edit videos, obsess over retention curves, and somehow make
              spreadsheets fun.
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="max-w-xl text-base leading-relaxed text-ink-2 md:text-lg">
              Based in Manila, working with clients worldwide. I bring both the
              creative eye and the analytical mind. Every cut is intentional,
              and afterwards I go and check whether it worked.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {services.map((service) => (
                <div key={service.title}>
                  <dt className="font-heading text-[15px] font-semibold tracking-tight text-ink">
                    {service.title}
                  </dt>
                  <dd className="mt-1.5 text-[13px] leading-relaxed text-ink-3">
                    {service.body}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="flex flex-col gap-7 md:col-span-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.2 + i * 0.08} direction="right">
              <div className="rule-b pb-5">
                <span className="font-heading text-5xl font-black tracking-tighter text-ink md:text-6xl">
                  {stat.value}
                </span>
                <p className="mono-label mt-2">{stat.label}</p>
                {"detail" in stat && stat.detail && (
                  <p className="mono-label mt-1 text-[10px] opacity-70">
                    {stat.detail}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
