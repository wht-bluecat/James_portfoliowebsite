"use client"

import { Reveal } from "@/components/ui/reveal"

const experiences = [
  {
    period: "2023 – Now",
    role: "Senior Video Editor",
    company: "Freelance",
    description:
      "I craft high-retention content for creators and brands, combining data-driven editing techniques with cinematic storytelling across YouTube, TikTok, and branded campaigns.",
  },
  {
    period: "2020 – 2023",
    role: "Lead Editor & Colorist",
    company: "Studio Manila",
    description:
      "Led post-production for commercial and narrative projects, managing color grading pipelines and mentoring junior editors across documentary and branded content.",
  },
  {
    period: "2017 – 2020",
    role: "Photographer & Editor",
    company: "Independent",
    description:
      "Shot and edited event, portrait, and commercial photography. Built a client base spanning Southeast Asia while developing a distinct high-contrast editorial style.",
  },
  {
    period: "2013 – 2017",
    role: "Junior Video Editor",
    company: "Creative Agency PH",
    description:
      "Started my journey editing social media content and short-form video, learning the fundamentals of pacing, narrative structure, and client collaboration.",
  },
]

export function Experience() {
  return (
    <section id="experience" className="max-w-[1440px] mx-auto px-8 md:px-12 py-24 md:py-36">
      {/* Header */}
      <div className="flex justify-between items-center mb-16">
        <Reveal>
          <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            [Experience]
          </span>
        </Reveal>
        <Reveal direction="right">
          <a
            href="#"
            className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            &#8595; Download CV
          </a>
        </Reveal>
      </div>

      {/* Timeline rows */}
      <div className="flex flex-col">
        {experiences.map((exp, i) => (
          <Reveal key={exp.period} delay={i * 0.1}>
            <div className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-t border-border hover:bg-accent/50 transition-colors duration-300 px-2 -mx-2">
              {/* Date */}
              <div className="md:col-span-2">
                <span className="font-sans text-sm text-muted-foreground">
                  {exp.period}
                </span>
              </div>

              {/* Role */}
              <div className="md:col-span-4">
                <h4 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-foreground">
                  {exp.role}
                </h4>
              </div>

              {/* Company */}
              <div className="md:col-span-2 md:text-right">
                <span className="font-sans text-sm text-muted-foreground">
                  {exp.company}
                </span>
              </div>

              {/* Description */}
              <div className="md:col-span-4">
                <p className="font-sans text-sm text-foreground/50 leading-relaxed group-hover:text-foreground/70 transition-colors">
                  {exp.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
