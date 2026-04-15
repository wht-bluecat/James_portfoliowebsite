"use client"

import { LiveClock } from "@/components/ui/live-clock"
import { Typewriter } from "@/components/ui/typewriter"
import { Reveal } from "@/components/ui/reveal"
import { RetroComputer } from "@/components/ui/retro-computer"

const typewriterPhrases = [
  "I EDIT VIDEOS THAT HOLD ATTENTION.",
  "I SHOOT STORIES WORTH REMEMBERING.",
  "I CRAFT VISUALS WITH PRECISION.",
  "I OBSESS OVER EVERY FRAME.",
]

export function Hero() {
  return (
    <section className="h-screen flex flex-col justify-between px-8 md:px-12 pt-20 pb-10 max-w-[1440px] mx-auto relative">
      {/* Top — clock */}
      <Reveal delay={0.1} direction="none" mount>
        <div className="pt-4">
          <LiveClock />
        </div>
      </Reveal>

      {/* Center — name block + computer */}
      <div className="flex items-center justify-between py-4">
        {/* Left — name */}
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <Reveal delay={0.3} mount>
            <p className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground/30 mb-1 italic">
              Hello – I&apos;m
            </p>
          </Reveal>
          <Reveal delay={0.5} mount>
            <h1 className="font-heading text-[16vw] md:text-[13vw] lg:text-[11rem] font-black leading-[0.85] tracking-[-0.04em] text-foreground">
              James<br />
              <span className="block">Yaptangco</span>
            </h1>
          </Reveal>
        </div>

        {/* Right — retro computer (hidden on small screens) */}
        <Reveal delay={0.6} direction="right" mount>
          <div className="hidden lg:block w-[380px] h-[420px] shrink-0 -mr-4">
            <RetroComputer />
          </div>
        </Reveal>
      </div>

      {/* Bottom — info row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {/* Typewriter */}
        <Reveal delay={0.8} direction="left" mount className="md:col-span-1">
          <div className="font-mono text-[11px] tracking-wider text-primary uppercase leading-relaxed">
            <Typewriter phrases={typewriterPhrases} />
          </div>
        </Reveal>

        {/* Role + Location */}
        <Reveal delay={0.9} mount className="md:col-span-1">
          <div>
            <p className="font-sans text-base md:text-lg font-semibold text-foreground">
              Video Editor &amp; Photographer
            </p>
            <p className="font-sans text-base md:text-lg text-foreground/50">
              Based in Manila
            </p>
          </div>
        </Reveal>

        {/* Experience */}
        <Reveal delay={1.0} direction="right" mount className="md:col-span-1">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
              [Experience]
            </span>
            <p className="font-sans text-sm text-foreground/60 flex items-center gap-2">
              <span className="text-foreground/30">&#8594;</span> Freelance, Manila, PH
            </p>
            <p className="font-sans text-sm text-foreground/60 flex items-center gap-2">
              <span className="text-foreground/30">&#8594;</span> 3 Years in the Industry
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
