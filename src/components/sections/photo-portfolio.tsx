"use client"

import { Reveal } from "@/components/ui/reveal"

const photoProjects = [
  { title: "Photo Collection I", behanceId: "203356825" },
  { title: "Photo Collection II", behanceId: "210612609" },
  { title: "Photo Collection III", behanceId: "210612813" },
  { title: "Photo Collection IV", behanceId: "203356339" },
  { title: "Photo Collection V", behanceId: "245105765" },
  { title: "Photo Collection VI", behanceId: "210612997" },
]

export function PhotoPortfolio() {
  return (
    <section id="sidequests" className="max-w-[1440px] mx-auto px-8 md:px-12 py-24 md:py-36">
      {/* Header */}
      <Reveal>
        <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-16">
          Photography
        </h2>
      </Reveal>

      {/* Photo grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {photoProjects.map((project, i) => (
          <Reveal key={project.behanceId} delay={i * 0.08}>
            <div className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
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
              </div>
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
