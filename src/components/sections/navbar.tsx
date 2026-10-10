"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const navLinks = [
  { label: "Results", href: "#results", id: "results" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Motion", href: "#motion", id: "motion" },
  { label: "Work", href: "#work", id: "work" },
  { label: "About", href: "#about", id: "about" },
]

const externalLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/james-yaptangco-230339200/" },
]

const BOOKING = "https://cal.com/james-yaptangco-smsdc9"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  // Read-position bar. It is the cheapest possible answer to "how much is left?",
  // which is the question every long single-page scroll provokes.
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
        setScrolled(window.scrollY > 24)
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Highlight whichever section is actually on screen, so the nav always answers
  // "where am I" without the visitor having to work it out from the content.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const onScreen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (onScreen) setActive(onScreen.target.id)
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // A menu that stays open behind you when you navigate is a bug people blame
  // on themselves. Close it on Escape too.
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mobileOpen])

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || mobileOpen
          ? "border-b border-hairline bg-paper/85 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-brand transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />

      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-4 md:px-12 md:py-5">
        <a
          href="#top"
          className="font-heading text-lg font-black tracking-tighter text-ink"
          aria-label="Back to top"
        >
          JY<span className="text-brand">.</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={active === link.id ? "true" : undefined}
              className={cn(
                "link-underline text-sm transition-colors",
                active === link.id ? "text-ink" : "text-ink-3 hover:text-ink"
              )}
            >
              {link.label}
            </a>
          ))}

          {externalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hidden items-center gap-1 text-sm text-ink-3 transition-colors hover:text-ink lg:flex"
            >
              {link.label}
              {/* The arrow means "this leaves the site". Putting it on in-page
                  anchors too, as the old nav did, made it meaningless. */}
              <span aria-hidden="true" className="text-[10px] leading-none">
                &#8599;
              </span>
            </a>
          ))}

          <ThemeToggle className="-mr-1" />

          <a
            href={BOOKING}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:brightness-110 motion-safe:hover:-translate-y-0.5"
          >
            Book a call
            <span aria-hidden="true">&#8594;</span>
          </a>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={cn(
                "h-[1.5px] w-5 bg-ink transition-all duration-300",
                mobileOpen && "translate-y-[6.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-[1.5px] w-5 bg-ink transition-all duration-300",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "h-[1.5px] w-5 bg-ink transition-all duration-300",
                mobileOpen && "-translate-y-[6.5px] -rotate-45"
              )}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-hairline bg-paper transition-[max-height,opacity] duration-300 md:hidden",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 border-t-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-lg text-ink-2 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          {externalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1.5 py-2.5 text-lg text-ink-2 transition-colors hover:text-ink"
            >
              {link.label}
              <span aria-hidden="true" className="text-xs">
                &#8599;
              </span>
            </a>
          ))}
          <a
            href={BOOKING}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-3 flex w-fit items-center gap-2 rounded-full bg-brand px-6 py-3 font-mono text-xs uppercase tracking-wider text-primary-foreground"
          >
            Book a call <span aria-hidden="true">&#8594;</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
