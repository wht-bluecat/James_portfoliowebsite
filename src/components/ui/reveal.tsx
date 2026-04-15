"use client"

import { motion } from "framer-motion"
import { type ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  /** If true, animates on mount instead of on scroll into view */
  mount?: boolean
}

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  mount = false,
}: RevealProps) {
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
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
