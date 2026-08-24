"use client"

import { Reveal } from "@/components/ui/reveal"

const elsewhere = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/james-yaptangco-230339200/",
    external: true,
  },
  { label: "Instagram", href: "https://www.instagram.com/wht.jame/", external: true },
  { label: "Email", href: "mailto:yaptangco.mikael@gmail.com", external: true },
]

const onPage = [
  { label: "Work", href: "#work" },
  { label: "Vertical", href: "#vertical" },
  { label: "About", href: "#about" },
  { label: "Photography", href: "#photography" },
]

export function Footer() {
  return (
    <footer className="rule-t mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <Reveal>
            <a
              href="mailto:yaptangco.mikael@gmail.com"
              className="link-underline mono-label mb-8 block w-fit transition-colors hover:text-ink"
            >
              yaptangco.mikael@gmail.com
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-ink-3/40 md:text-6xl">
              James
              <br />
              Yaptangco
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-3">
          <Reveal delay={0.14}>
            <span className="mono-label">On this page</span>
            <div className="mt-4 flex flex-col gap-3">
              {onPage.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="link-underline w-fit text-sm text-ink-3 transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-3">
          <Reveal delay={0.2}>
            <span className="mono-label">Elsewhere</span>
            <div className="mt-4 flex flex-col gap-3">
              {elsewhere.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="link-underline flex w-fit items-center gap-1.5 text-sm text-ink-3 transition-colors hover:text-ink"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-[10px]">
                    &#8599;
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.26}>
        <div className="rule-t mt-14 flex flex-col items-center justify-between gap-3 pt-6 sm:flex-row">
          <span className="mono-label text-[10px]">
            Designed &amp; built by James Yaptangco
          </span>
          <span className="mono-label text-[10px]">
            &copy; {new Date().getFullYear()} &mdash; All rights reserved
          </span>
        </div>
      </Reveal>
    </footer>
  )
}
