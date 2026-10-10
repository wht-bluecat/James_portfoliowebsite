"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * A silent, self-hosted loop that only plays while it is on screen.
 *
 * `preload="none"` plus a poster means the page pays for one small JPEG per
 * loop on first paint and not a single video byte until the visitor scrolls to
 * it. Off screen it pauses again, so six loops never decode at once.
 *
 * Anything that moves by itself for more than five seconds needs a way to stop
 * it, so every loop carries its own pause control, and under
 * prefers-reduced-motion nothing starts until it is asked to.
 */
export function LoopVideo({
  src,
  poster,
  label,
  aspect = "16/9",
  className,
}: {
  src: string
  poster: string
  /** What the loop shows, for the pause control and screen readers. */
  label: string
  aspect?: "16/9" | "4/5"
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  // Null until the visitor expresses a preference; then their choice wins over
  // the scroll position in both directions.
  const [wanted, setWanted] = useState<boolean | null>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const autoplay = wanted ?? !reduced
    if (!autoplay) {
      video.pause()
      return
    }

    if (typeof IntersectionObserver === "undefined") {
      video.play().catch(() => {})
      return
    }

    let onScreen = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        if (onScreen) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.3 }
    )
    observer.observe(video)

    // Browsers pause silent video in a background tab and do not all resume
    // it, so pick the loop back up when the visitor returns.
    const onVisible = () => {
      if (!document.hidden && onScreen) video.play().catch(() => {})
    }
    document.addEventListener("visibilitychange", onVisible)

    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", onVisible)
    }
  }, [reduced, wanted])

  return (
    <div
      className={cn(
        "group/loop relative overflow-hidden bg-shade",
        aspect === "4/5" ? "aspect-[4/5]" : "aspect-video",
        className
      )}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <button
        type="button"
        onClick={() => setWanted(!playing)}
        aria-label={playing ? `Pause: ${label}` : `Play: ${label}`}
        className={cn(
          "absolute bottom-2.5 right-2.5 grid h-11 w-11 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-opacity duration-300",
          // Stays visible whenever the loop is stopped, so there is always an
          // obvious way to start it; fades back while it is running.
          playing
            ? "opacity-0 focus-visible:opacity-100 group-hover/loop:opacity-100"
            : "opacity-100"
        )}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
          {playing ? (
            <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
          ) : (
            <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
          )}
        </svg>
      </button>
    </div>
  )
}
