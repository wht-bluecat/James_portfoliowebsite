"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/james-yaptangco-230339200/", external: true },
  { label: "Video Editing", href: "#work" },
  { label: "Photography", href: "#sidequests" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md">
      <div className="flex justify-between items-center w-full max-w-[1440px] mx-auto px-8 md:px-12 py-5">
        {/* Logo */}
        <a href="#" className="font-heading text-xl font-black tracking-tighter text-foreground">
          JY
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="font-sans text-sm text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1"
            >
              {link.label}
              <span className="text-[10px] leading-none">&#8599;</span>
            </a>
          ))}
          <a
            href="https://cal.com/james-yaptangco-smsdc9"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:brightness-110 transition-all flex items-center gap-2"
          >
            Let&apos;s Connect
            <span className="text-sm">&#8594;</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={cn("w-5 h-[1.5px] bg-foreground transition-all duration-300", mobileOpen && "rotate-45 translate-y-[7px]")} />
          <span className={cn("w-5 h-[1.5px] bg-foreground transition-all duration-300", mobileOpen && "opacity-0")} />
          <span className={cn("w-5 h-[1.5px] bg-foreground transition-all duration-300", mobileOpen && "-rotate-45 -translate-y-[7px]")} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden overflow-hidden transition-all duration-300 bg-background border-t border-border",
        mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 border-t-0"
      )}>
        <div className="px-8 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-sans text-lg text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1"
            >
              {link.label}
              <span className="text-xs">&#8599;</span>
            </a>
          ))}
          <a
            href="https://cal.com/james-yaptangco-smsdc9"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider bg-primary text-primary-foreground px-5 py-2.5 rounded-full w-fit hover:brightness-110 transition-all flex items-center gap-2 mt-2"
          >
            Let&apos;s Connect <span className="text-sm">&#8594;</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
