"use client"

import { Reveal } from "@/components/ui/reveal"

/**
 * The end of the page is one of the two moments people actually remember, so it
 * gets the largest type on the site and exactly two actions — book, or write.
 * Anything else here would just be a third thing to weigh.
 */
export function CTA() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 text-center md:px-12 md:py-36">
      <Reveal>
        <p className="mb-3 font-serif text-2xl italic text-ink-3 md:text-4xl">
          Got a project?
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <h2 className="mb-4 font-heading text-[clamp(3rem,11vw,8.5rem)] font-black leading-[0.86] tracking-[-0.045em] text-ink">
          Let&apos;s Build
          <br />
          <span className="font-serif font-normal italic text-brand">Together</span>
        </h2>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mx-auto mb-10 max-w-md text-[15px] leading-relaxed text-ink-2">
          Tell me the format, the deadline and roughly what you want it to do.
          I&apos;ll tell you if I&apos;m the right person for it.
        </p>
      </Reveal>

      <Reveal delay={0.28}>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="https://cal.com/james-yaptangco-smsdc9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-full bg-brand px-9 py-4 font-mono text-xs uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:brightness-110 motion-safe:hover:-translate-y-0.5"
          >
            Book a call
            <span aria-hidden="true">&#8594;</span>
          </a>
          <a
            href="mailto:yaptangco.mikael@gmail.com"
            className="flex items-center justify-center gap-3 border border-hairline px-9 py-4 font-mono text-xs uppercase tracking-wider text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            Send a brief
            <span aria-hidden="true">&#8599;</span>
          </a>
        </div>
      </Reveal>
    </section>
  )
}
