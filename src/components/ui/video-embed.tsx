"use client"

import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import type { Provider } from "@/data/work"

/**
 * A click-to-load video facade.
 *
 * A live YouTube iframe costs 1.3–2.6 MB and 20+ requests before anyone presses
 * play. This page has ~30 videos on it, so embedding them directly meant tens of
 * megabytes on first paint. Instead we paint a poster image and only mount the
 * real player on click, which is the difference between a portfolio that opens
 * instantly and one that hangs.
 */

type Aspect = "16/9" | "9/16"

interface VideoEmbedProps {
  provider: Provider
  id: string
  title: string
  aspect?: Aspect
  /** Vimeo has no guessable poster URL, so the server fetches it and passes it in. */
  poster?: string | null
  className?: string
  /** The largest card on the page should not lazy-load its own poster. */
  priority?: boolean
}

/** YouTube poster URLs are guessable; Vimeo's are not. */
function youtubePoster(id: string, aspect: Aspect) {
  // frame0 is the vertical still YouTube itself uses on the Shorts shelf.
  return aspect === "9/16"
    ? `https://i.ytimg.com/vi/${id}/frame0.jpg`
    : `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
}

/**
 * Open the sockets the player will need the moment the user shows intent, so the
 * click itself feels instant rather than spending 200ms on DNS and TLS.
 */
let warmed = false
function warmConnections(provider: Provider) {
  if (warmed || typeof document === "undefined") return
  warmed = true
  const hosts =
    provider === "vimeo"
      ? ["https://player.vimeo.com", "https://i.vimeocdn.com", "https://f.vimeocdn.com"]
      : [
          "https://www.youtube-nocookie.com",
          "https://www.google.com",
          "https://googlevideo.com",
          "https://static.doubleclick.net",
        ]
  for (const href of hosts) {
    const link = document.createElement("link")
    link.rel = "preconnect"
    link.href = href
    link.crossOrigin = ""
    document.head.appendChild(link)
  }
}

export function VideoEmbed({
  provider,
  id,
  title,
  aspect = "16/9",
  poster,
  className,
  priority = false,
}: VideoEmbedProps) {
  const [active, setActive] = useState(false)
  const [posterFailed, setPosterFailed] = useState(false)

  const warm = useCallback(() => warmConnections(provider), [provider])

  const src =
    provider === "vimeo"
      ? `https://player.vimeo.com/video/${id}?autoplay=1&badge=0&autopause=0&dnt=1`
      : `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`

  const posterSrc =
    provider === "youtube"
      ? posterFailed
        ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
        : youtubePoster(id, aspect)
      : poster ?? null

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-shade",
        aspect === "9/16" ? "aspect-[9/16]" : "aspect-video",
        className
      )}
    >
      {active ? (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          onPointerEnter={warm}
          onFocus={warm}
          aria-label={`Play ${title}`}
          className="group/play absolute inset-0 h-full w-full cursor-pointer"
        >
          {posterSrc ? (
            /* eslint-disable-next-line @next/next/no-img-element -- remote poster,
               no optimisation needed and next/image would add a remote-pattern
               config per provider for no benefit. */
            <img
              src={posterSrc}
              alt=""
              loading={priority ? "eager" : "lazy"}
              // eslint-disable-next-line react/no-unknown-property
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              onError={() => setPosterFailed(true)}
              className="absolute inset-0 h-full w-full scale-[1.01] object-cover transition-transform duration-700 ease-out motion-safe:group-hover/play:scale-[1.05]"
            />
          ) : (
            <span className="absolute inset-0 bg-gradient-to-br from-shade to-hairline" />
          )}

          {/* A scrim so the play control keeps contrast on any frame. */}
          <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/10 opacity-80 transition-opacity duration-500 group-hover/play:opacity-60" />

          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-paper/90 text-ink shadow-lg backdrop-blur-sm transition-transform duration-300 ease-out motion-safe:group-hover/play:scale-110 motion-safe:group-active/play:scale-95">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="ml-[3px] h-5 w-5 fill-current"
              >
                <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
