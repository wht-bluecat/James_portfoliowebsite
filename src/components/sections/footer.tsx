"use client"

import { Reveal } from "@/components/ui/reveal"

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/james-yaptangco-230339200/", external: true },
  { label: "Instagram", href: "https://www.instagram.com/wht.jame/", external: true },
  { label: "Email", href: "mailto:yaptangco.mikael@gmail.com" },
  { label: "Photography", href: "#sidequests" },
]

export function Footer() {
  return (
    <footer className="max-w-[1440px] mx-auto px-8 md:px-12 py-24 md:py-36 dashed-border-t">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        {/* Left — email + large name */}
        <div className="md:col-span-6">
          <Reveal>
            <a
              href="mailto:yaptangco.mikael@gmail.com"
              className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase mb-8 block hover:text-foreground transition-colors"
            >
              yaptangco.mikael@gmail.com
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="font-heading text-4xl md:text-6xl font-bold text-foreground/20 tracking-tight leading-[1.1]">
              James
              <br />
              Portfolio
            </h3>
          </Reveal>
        </div>

        {/* Right — links */}
        <div className="md:col-span-3 md:col-start-8">
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="font-sans text-sm text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  {link.label}
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    &#8599;
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom bar */}
      <Reveal delay={0.3}>
        <div className="dashed-border-t mt-16 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
            Designed by James Yaptangco
          </span>
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
            &copy; {new Date().getFullYear()} — All rights reserved
          </span>
        </div>
      </Reveal>
    </footer>
  )
}
