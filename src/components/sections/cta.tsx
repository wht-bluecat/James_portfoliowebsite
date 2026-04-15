"use client"

import { Reveal } from "@/components/ui/reveal"

export function CTA() {
  return (
    <section className="max-w-[1440px] mx-auto px-8 md:px-12 py-24 md:py-36 text-center">
      <Reveal>
        <p className="font-serif text-3xl md:text-5xl text-foreground/30 italic mb-4">
          Got a project?
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <h2 className="font-heading text-[12vw] md:text-[8rem] font-black leading-[0.85] tracking-tighter text-foreground mb-12">
          Let&apos;s Build
          <br />
          <span className="text-primary italic font-serif font-normal">Together</span>
        </h2>
      </Reveal>
      <Reveal delay={0.3}>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="mailto:yaptangco.mikael@gmail.com"
            className="font-mono text-xs uppercase tracking-wider border border-foreground/20 px-8 py-4 hover:bg-foreground hover:text-background transition-all duration-300 flex items-center justify-center gap-3"
          >
            Send Brief
            <span className="text-sm">&#8599;</span>
          </a>
          <a
            href="https://cal.com/james-yaptangco-smsdc9"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider bg-primary text-primary-foreground px-8 py-4 rounded-full hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3"
          >
            Let&apos;s Connect
            <span className="text-sm">&#8594;</span>
          </a>
        </div>
      </Reveal>
    </section>
  )
}
