import { Reveal } from "./reveal"

/**
 * Every section opens the same way: a mono index, a large title, and an
 * optional line of context. Repeating one masthead shape is what makes a long
 * scroll feel like one document instead of a stack of unrelated blocks.
 */
export function SectionHeading({
  index,
  title,
  lede,
  meta,
}: {
  index: string
  title: string
  lede?: string
  meta?: string
}) {
  return (
    <div className="rule-t pt-6">
      <Reveal>
        <div className="flex items-baseline justify-between gap-6">
          <span className="mono-label">
            [{index}] {meta}
          </span>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
        <Reveal delay={0.05} className="md:col-span-7">
          {/* pre-line so a title can choose its own line breaks with "\n". */}
          <h2 className="whitespace-pre-line font-heading text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-ink">
            {title}
          </h2>
        </Reveal>

        {lede && (
          <Reveal delay={0.12} className="md:col-span-5">
            <p className="max-w-md text-[15px] leading-relaxed text-ink-2 md:pb-2">
              {lede}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  )
}
