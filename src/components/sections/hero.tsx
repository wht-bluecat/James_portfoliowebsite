"use client"

import { LiveClock } from "@/components/ui/live-clock"
import { Typewriter } from "@/components/ui/typewriter"
import { Reveal } from "@/components/ui/reveal"
import { RetroComputer } from "@/components/ui/retro-computer"
import { run } from "@/data/channel"

const typewriterPhrases = [
  "I EDIT VIDEOS THAT HOLD ATTENTION.",
  "I BUILD ANIMATION THAT TEACHES.",
  "I RUN THE CHANNEL AFTER THE EDIT.",
  "I READ THE RETENTION CURVE AFTERWARDS.",
]

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-between px-6 pb-8 pt-24 md:px-12 md:pt-24"
    >
      <Reveal delay={0.1} direction="none" mount>
        <div className="rule-b flex items-center justify-between gap-4 pb-4">
          <LiveClock />
          <span className="mono-label hidden sm:block">Available for freelance</span>
          <span className="mono-label">Est. 2023</span>
        </div>
      </Reveal>

      <div className="flex flex-1 items-center justify-between gap-8 py-6">
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <Reveal delay={0.25} mount>
            <p className="mb-1 font-serif text-3xl italic text-ink-3 md:text-5xl lg:text-6xl">
              Hello &ndash; I&apos;m
            </p>
          </Reveal>

          <Reveal delay={0.4} mount>
            {/* The floor is 2.5rem rather than 3rem so "Yaptangco" still fits
                inside a 320px viewport instead of being clipped by the
                overflow guard on <body>. */}
            <h1 className="font-heading text-[clamp(2.5rem,13vw,10.5rem)] font-black leading-[0.84] tracking-[-0.045em] text-ink">
              James
              <br />
              <span className="block">Yaptangco</span>
            </h1>
          </Reveal>

          {/* The one sentence a prospective client actually needs: not just
              the edit, but everything that happens to it afterwards. */}
          <Reveal delay={0.55} mount>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-2 md:text-lg">
              I edit the video, then run everything after it: the Shorts, the
              thumbnails, the captions, the posting and the weekly numbers. One
              person on the whole channel, for podcasts and brands. Based in
              Manila, working worldwide.
            </p>
          </Reveal>

          <Reveal delay={0.65} mount>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#results"
                className="rounded-full bg-brand px-7 py-3.5 font-mono text-xs uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:brightness-110 motion-safe:hover:-translate-y-0.5"
              >
                See the results
              </a>
              <a
                href="mailto:yaptangco.mikael@gmail.com"
                className="flex items-center gap-2 border border-hairline px-7 py-3.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                Send a brief
                <span aria-hidden="true">&#8599;</span>
              </a>
            </div>
          </Reveal>

          {/* Proof above the fold, for the visitor who arrived from an email
              and will decide in one screen whether to keep scrolling. */}
          <Reveal delay={0.75} mount>
            <a
              href="#results"
              className="group mt-3 flex w-fit items-center gap-2.5 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 transition-colors hover:text-ink"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <span>
                Latest: {run.published} videos published in {run.weeks} weeks for Green Thumb Depot
              </span>
              <span
                aria-hidden="true"
                className="transition-transform duration-300 motion-safe:group-hover:translate-y-0.5"
              >
                &#8595;
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.7} direction="right" mount>
          <div className="-mr-4 hidden h-[420px] w-[380px] shrink-0 lg:block">
            <RetroComputer />
          </div>
        </Reveal>
      </div>

      <div className="rule-t grid grid-cols-1 items-end gap-6 pt-6 md:grid-cols-3">
        <Reveal delay={0.8} direction="left" mount>
          <div
            className="font-mono text-[11px] uppercase leading-relaxed tracking-wider text-brand"
            aria-live="off"
          >
            <Typewriter phrases={typewriterPhrases} />
          </div>
        </Reveal>

        <Reveal delay={0.85} mount>
          <div>
            <p className="text-base font-semibold text-ink md:text-lg">
              Video Editor &amp; Social Media Manager
            </p>
            <p className="text-base text-ink-3 md:text-lg">Based in Manila</p>
          </div>
        </Reveal>

        <Reveal delay={0.9} direction="right" mount>
          <div className="flex flex-col gap-1">
            <span className="mono-label">[Experience]</span>
            <p className="flex items-center gap-2 text-sm text-ink-2">
              <span aria-hidden="true" className="text-ink-3">
                &#8594;
              </span>
              Freelance, Manila, PH
            </p>
            <p className="flex items-center gap-2 text-sm text-ink-2">
              <span aria-hidden="true" className="text-ink-3">
                &#8594;
              </span>
              3 years in the industry
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
