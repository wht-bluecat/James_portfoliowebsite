"use client"

import { Reveal } from "@/components/ui/reveal"

type Project = {
  title: string
} & (
  | { type: "youtube"; youtubeId: string }
  | { type: "behance"; behanceId: string }
)

const projects: Project[] = [
  {
    title: "Stanley Chen — Intro Video",
    type: "youtube",
    youtubeId: "Ll6Qf6G5Jdg",
  },
  {
    title: "Kenzie Elizabeth — Vlog",
    type: "youtube",
    youtubeId: "E9oJqUg0yoA",
  },
  {
    title: "Kenzie Elizabeth — Podcast",
    type: "youtube",
    youtubeId: "9bQN5kXSYHI",
  },
  {
    title: "Personal — Video Essay",
    type: "youtube",
    youtubeId: "diC6Sm6jOmE",
  },
  {
    title: "Reignite Alpha — Landing Page",
    type: "youtube",
    youtubeId: "gtVOALCk3dQ",
  },
  {
    title: "Post Malone — Concert Video",
    type: "behance",
    behanceId: "193302277",
  },
  {
    title: "Educational — YouTube Short",
    type: "behance",
    behanceId: "241693425",
  },
  {
    title: "YouTube Short",
    type: "behance",
    behanceId: "241693163",
  },
  {
    title: "Podcast — Highlight Clip",
    type: "behance",
    behanceId: "246625883",
  },
  {
    title: "Salo Salo — Promotional Video",
    type: "behance",
    behanceId: "198107191",
  },
  {
    title: "Algonquin College — Video",
    type: "behance",
    behanceId: "212688527",
  },
]

export function VideoPortfolio() {
  return (
    <section id="work" className="max-w-[1440px] mx-auto px-8 md:px-12 py-24 md:py-36">
      {/* Header */}
      <Reveal>
        <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-16">
          Selected Work
        </h2>
      </Reveal>

      {/* Video grid — uniform 3 per row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <Reveal
            key={project.title}
            delay={i * 0.08}
          >
            <div className="group">
              {/* Embed — no scrollbar */}
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                {project.type === "youtube" ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${project.youtubeId}`}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    scrolling="no"
                    className="absolute inset-0 w-full h-full border-0"
                    style={{ overflow: "hidden" }}
                  />
                ) : (
                  <iframe
                    src={`https://www.behance.net/embed/project/${project.behanceId}?ilo0=1`}
                    title={project.title}
                    allow="clipboard-write"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    scrolling="no"
                    className="absolute inset-0 w-full h-full border-0"
                    style={{ overflow: "hidden" }}
                  />
                )}
              </div>

              {/* Title */}
              <p className="font-sans text-sm text-foreground/60 mt-3 group-hover:text-foreground transition-colors duration-300">
                {project.title}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
