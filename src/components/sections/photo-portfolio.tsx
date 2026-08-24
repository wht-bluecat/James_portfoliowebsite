"use client"

import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { DeferredIframe } from "@/components/ui/deferred-iframe"
import { photography } from "@/data/work"

export function PhotoPortfolio() {
  return (
    <section
      id="photography"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-16 md:px-12 md:py-24"
    >
      <SectionHeading
        index="05"
        meta="Side quests"
        title="Photography"
        lede="Shot on the weekends, mostly. The same instinct as the editing — wait for the frame, then take it."
      />

      <div className="mt-12 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {photography.map((project, i) => (
          <Reveal key={project.id} delay={Math.min(i, 4) * 0.06}>
            <figure className="group">
              <DeferredIframe
                src={`https://www.behance.net/embed/project/${project.id}?ilo0=1`}
                title={`Photography ${project.title}`}
                aspect="portrait"
              />
              <figcaption className="mt-3 text-[13px] text-ink-3 transition-colors group-hover:text-ink">
                {project.title}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
