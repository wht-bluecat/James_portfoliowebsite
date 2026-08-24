import { clients } from "@/data/work"

/**
 * A CSS marquee rather than a framer-motion one: this animates a transform on
 * the compositor instead of driving a React state update every frame, so it
 * costs nothing while the rest of the page is loading posters. It also pauses
 * on hover, and stops entirely under prefers-reduced-motion.
 */
export function LogoTicker() {
  return (
    <section className="rule-t rule-b mx-auto max-w-[1440px] overflow-hidden py-5">
      <div className="marquee flex items-center gap-10 px-6 md:px-12">
        <span className="shrink-0 whitespace-nowrap text-[13px] text-ink-3">
          Trusted by
        </span>

        <div className="relative flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-paper to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-paper to-transparent" />

          <div className="marquee-track flex w-max items-center gap-14">
            {[...clients, ...clients].map((name, i) => (
              <span
                key={`${name}-${i}`}
                // The duplicate half is decorative; screen readers should hear
                // the client list exactly once.
                aria-hidden={i >= clients.length ? "true" : undefined}
                className="select-none whitespace-nowrap font-heading text-lg font-bold text-ink-3/70 md:text-xl"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
