"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * A self-hosted vertical reel that plays with sound on click.
 *
 * Unlike the Motion loops these are ads with a voice, so nothing starts by
 * itself. The page pays for one poster per reel and not a single video byte
 * until someone presses play (`preload="none"`, and the file is faststart, so
 * it begins before it has finished downloading).
 *
 * Only one reel plays at a time: starting one pauses whichever was playing.
 * Scrolling a playing reel off screen pauses it too, so sound never carries on
 * from something the visitor can no longer see.
 */

let current: HTMLVideoElement | null = null

export function ReelPlayer({
  src,
  poster,
  title,
  duration,
  className,
}: {
  src: string
  poster: string
  /** What the reel is, for the controls and screen readers. */
  title: string
  duration: string
  className?: string
}) {
  const video = useRef<HTMLVideoElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  // Started = the poster has handed over to the video. It goes back to false
  // when a reel ends, so the poster returns instead of a frozen last frame.
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  // Progress drawn every frame while playing, written straight to the bar so a
  // 60 fps update never goes through React.
  useEffect(() => {
    const v = video.current
    if (!v || !playing) return
    let frame = 0
    const tick = () => {
      if (bar.current && v.duration) {
        bar.current.style.transform = `scaleX(${v.currentTime / v.duration})`
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing])

  // Pause once less than a quarter of the reel is on screen.
  useEffect(() => {
    const v = video.current
    if (!v || typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !v.paused) v.pause()
      },
      { threshold: 0.25 }
    )
    observer.observe(v)
    return () => observer.disconnect()
  }, [])

  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) {
      if (current && current !== v) current.pause()
      current = v
      setStarted(true)
      v.play().catch(() => setPlaying(false))
    } else {
      v.pause()
    }
  }

  const toggleMute = () => {
    const v = video.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const onEnded = () => {
    const v = video.current
    if (v) v.currentTime = 0
    if (bar.current) bar.current.style.transform = "scaleX(0)"
    setStarted(false)
  }

  const label = playing
    ? `Pause: ${title}`
    : started
      ? `Resume: ${title}`
      : `Play with sound: ${title}, ${duration}`

  return (
    <div
      className={cn(
        "group/reel relative aspect-[9/16] overflow-hidden bg-shade",
        className
      )}
    >
      <video
        ref={video}
        src={src}
        preload="none"
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={onEnded}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* eslint-disable-next-line @next/next/no-img-element -- a local JPEG at
          its display size; next/image would add nothing here. */}
      <img
        src={poster}
        alt=""
        loading="lazy"
        decoding="async"
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out",
          started
            ? "pointer-events-none opacity-0"
            : "opacity-100 motion-safe:group-hover/reel:scale-[1.03]"
        )}
      />

      {/* The whole surface is the play/pause control. */}
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        className="absolute inset-0 h-full w-full cursor-pointer"
      >
        {/* A scrim so the controls keep contrast on any frame. It fades back
            once the reel is running and the frame itself should read. */}
        <span
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10 transition-opacity duration-500 ease-out",
            playing ? "opacity-0 group-hover/reel:opacity-60" : "opacity-100"
          )}
        />

        {/* Play sits in the bottom corner, not the middle: the middle of a
            reel is where its captions and graphics are, and the poster is
            chosen to show them. Length and a sound cue sit beside it, the two
            things someone wants to know before pressing play on an ad. */}
        <span
          className={cn(
            "absolute bottom-3 left-3 flex items-center gap-2.5 transition-opacity duration-300 ease-out",
            playing ? "opacity-0" : "opacity-100"
          )}
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-paper/90 text-ink shadow-lg backdrop-blur-sm transition-transform duration-300 ease-out motion-safe:group-hover/reel:scale-110 motion-safe:group-active/reel:scale-95">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-[2px] h-4 w-4 fill-current">
              <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
            </svg>
          </span>
          <span
            className={cn(
              "flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white transition-opacity duration-300 ease-out [text-shadow:0_1px_2px_rgb(0_0_0/0.6)]",
              started ? "opacity-0" : "opacity-100"
            )}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
              <path d="M4 9v6h4l5 4V5L8 9H4Zm11.5 3a3.5 3.5 0 0 0-2-3.15v6.3a3.5 3.5 0 0 0 2-3.15ZM13.5 4.2v2.06a6 6 0 0 1 0 11.48v2.06a8 8 0 0 0 0-15.6Z" />
            </svg>
            {duration}
          </span>
        </span>
      </button>

      {/* Sound toggle: only once the reel has started, beside the play surface
          rather than inside it (a button cannot contain a button). */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? `Unmute: ${title}` : `Mute: ${title}`}
        aria-pressed={muted}
        tabIndex={started ? 0 : -1}
        className={cn(
          "absolute bottom-3 right-2.5 grid h-11 w-11 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-opacity duration-300 ease-out",
          !started
            ? "pointer-events-none opacity-0"
            : playing
              ? "opacity-0 focus-visible:opacity-100 group-hover/reel:opacity-100"
              : "opacity-100"
        )}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
          {muted ? (
            <path d="M4 9v6h4l5 4V5L8 9H4Zm12.6 3 2.7-2.7-1.1-1.1-2.7 2.7-2.7-2.7-1.1 1.1 2.7 2.7-2.7 2.7 1.1 1.1 2.7-2.7 2.7 2.7 1.1-1.1-2.7-2.7Z" />
          ) : (
            <path d="M4 9v6h4l5 4V5L8 9H4Zm11.5 3a3.5 3.5 0 0 0-2-3.15v6.3a3.5 3.5 0 0 0 2-3.15ZM13.5 4.2v2.06a6 6 0 0 1 0 11.48v2.06a8 8 0 0 0 0-15.6Z" />
          )}
        </svg>
      </button>

      {/* Progress, along the bottom edge once the reel has started. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-white/25 transition-opacity duration-300",
          started ? "opacity-100" : "opacity-0"
        )}
      >
        <span
          ref={bar}
          className="absolute inset-0 origin-left scale-x-0 bg-white"
        />
      </span>
    </div>
  )
}
