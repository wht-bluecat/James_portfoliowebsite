"use client"

import { motion, useReducedMotion } from "framer-motion"
import { type ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  /** Animate on mount instead of on scroll into view. */
  mount?: boolean
}

const directionMap = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  mount = false,
}: RevealProps) {
  const reduced = useReducedMotion()

  // Respecting prefers-reduced-motion is the single most-skipped step with
  // scroll and kinetic animation, and skipping it is a real accessibility bug.
  // Content still appears; it just stops moving.
  if (reduced) {
    return <div className={className}>{children}</div>
  }

  const offset = directionMap[direction]

  const animateProps = mount
    ? { animate: { opacity: 1, x: 0, y: 0 } }
    : {
        whileInView: { opacity: 1, x: 0, y: 0 },
        viewport: { once: true, margin: "-60px" },
      }

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      {...animateProps}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
