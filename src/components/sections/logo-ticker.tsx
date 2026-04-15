"use client"

import { motion } from "framer-motion"

const companies = [
  "DYF Campaign",
  "Kenzie Elizabeth LLC",
  "ARchway Learning Solutions",
  "Heidi Henderson",
  "Club Socialistas",
  "Salo Salo",
  "Hidden Nights",
  "Fortrust",
  "Reignite Alpha",
]

export function LogoTicker() {
  return (
    <section className="dashed-border-t dashed-border-b py-6 overflow-hidden max-w-[1440px] mx-auto">
      <div className="flex items-center px-8 md:px-12 gap-12">
        <span className="font-sans text-sm text-muted-foreground whitespace-nowrap shrink-0">
          Companies I&apos;ve contributed to @
        </span>
        <div className="overflow-hidden flex-1 relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />
          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...companies, ...companies].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-heading text-lg md:text-xl font-bold text-foreground/30 whitespace-nowrap select-none"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
