"use client"

import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { ReelPlayer } from "@/components/ui/reel-player"
import { agency } from "@/data/work"

/**
 * Agency work: vertical ads edited for OAX Media.
 *
 * Everything above this section is one channel James runs end to end; this is
 * the other kind of job, an agency handing over raw footage and a brief. The
 * facts column answers "who shot it and what did you do" before anyone has to
 * ask, because on client work that is the first question.
 */
export function ClientReels() {
  const facts = [
    { term: "Agency", detail: `${agency.name}, ${agency.city}` },
    { term: "Client", detail: agency.client, sub: agency.clientIs },
    { term: "From", detail: agency.from },
    { term: "My part", detail: agency.role.join(" · ") },
    { term: "Made in", detail: agency.madeIn },
    { term: "Delivered", detail: agency.delivered },
  ]

  return (
    <section
      id="reels"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-16 md:px-12 md:py-24"
    >
      <SectionHeading
        index="05"
        meta={`Client work · ${agency.name}`}
        title={"Vertical ads,\nfor an agency"}
        lede="OAX Media is a Denver agency that makes vertical ads for home-service companies across the US. They hired me after a test edit. These three are from my first batch for them: I cut each one from the raw footage and built the captions, animation, sound and grade in DaVinci Resolve."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-x-5">
        <Reveal className="lg:col-span-3">
          <dl className="grid grid-cols-2 gap-x-5 gap-y-5 lg:grid-cols-1 lg:gap-y-0">
            {facts.map((fact) => (
              <div key={fact.term} className="rule-t pt-3 lg:pb-5">
                <dt className="mono-label text-[10px]">{fact.term}</dt>
                <dd className="mt-1.5 text-[13px] leading-relaxed text-ink-2">
                  {fact.detail}
                  {fact.sub && <span className="block text-ink-3">{fact.sub}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* On a phone the reels sit in a row you swipe, the next one peeking
            in, so each plays at a size you can read; from sm up, three across. */}
        <div className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-x-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:col-span-9 lg:gap-x-5 [&::-webkit-scrollbar]:hidden">
          {agency.reels.map((reel, i) => (
            <Reveal
              key={reel.slug}
              delay={0.06 + i * 0.06}
              className="w-[76%] shrink-0 snap-start sm:w-auto"
            >
              <figure>
                <ReelPlayer
                  src={`/reels/${reel.slug}.mp4`}
                  poster={`/reels/${reel.slug}.jpg`}
                  title={reel.title}
                  duration={reel.duration}
                />
                <figcaption className="mt-3.5">
                  <div className="mb-1.5 flex items-baseline justify-between gap-3 font-mono text-[10px] tracking-[0.12em] text-ink-3">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span className="uppercase">Reel · {reel.duration}</span>
                  </div>
                  <h3 className="font-heading text-[15px] font-semibold leading-snug tracking-tight text-ink">
                    {reel.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-3">{reel.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
