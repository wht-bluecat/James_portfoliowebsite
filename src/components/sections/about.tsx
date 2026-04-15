"use client"

import { Reveal } from "@/components/ui/reveal"

const stats = [
  { value: "3", label: "Years Editing" },
  { value: "50+", label: "Projects Shipped" },
  { value: "5", label: "Platforms", detail: "TikTok, YT, Shorts, IG Reels, Podcast" },
]

export function About() {
  return (
    <section id="about" className="max-w-[1440px] mx-auto px-8 md:px-12 py-24 md:py-36">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        {/* Label */}
        <Reveal className="md:col-span-2">
          <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            [About]
          </span>
        </Reveal>

        {/* Content */}
        <div className="md:col-span-6">
          <Reveal delay={0.1}>
            <h2 className="font-heading text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight text-foreground mb-8">
              I edit videos, obsess over retention curves, and somehow make
              spreadsheets fun.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-sans text-base md:text-lg text-foreground/60 leading-relaxed max-w-xl">
              Based in Manila, working with clients worldwide — I bring both the
              creative eye and the analytical mind to everything I make. Every cut
              is intentional, every frame purposeful.
            </p>
          </Reveal>
        </div>

        {/* Stats */}
        <div className="md:col-span-4 flex flex-col gap-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.2 + i * 0.1} direction="right">
              <div className="dashed-border-b pb-6">
                <span className="font-heading text-5xl md:text-6xl font-black text-foreground tracking-tighter">
                  {stat.value}
                </span>
                <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase mt-2">
                  {stat.label}
                </p>
                {"detail" in stat && stat.detail && (
                  <p className="font-mono text-[10px] tracking-wider text-muted-foreground/70 uppercase mt-1">
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
