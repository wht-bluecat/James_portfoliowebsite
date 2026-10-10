"use client"

import { animate, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

/**
 * A number that counts up to its value the first time it scrolls into view.
 *
 * The final value is what the server renders and what a screen reader hears;
 * the counting is decoration layered on top. An invisible copy of the final
 * value holds the width, so the digits rolling underneath never shift the
 * layout around them.
 */
export function CountUp({
  value,
  format,
  duration = 1.5,
}: {
  value: number
  format: (n: number) => string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(value)

  useEffect(() => {
    if (reduced) {
      setShown(value)
      return
    }
    if (!inView) {
      setShown(0)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setShown,
    })
    return () => controls.stop()
  }, [inView, reduced, value, duration])

  return (
    <span ref={ref} className="inline-grid" aria-label={format(value)} role="img">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {format(value)}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {format(shown)}
      </span>
    </span>
  )
}
