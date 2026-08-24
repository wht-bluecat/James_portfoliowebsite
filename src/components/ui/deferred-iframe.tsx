"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Mounts an iframe only once it is close to the viewport.
 *
 * Behance embeds have no poster URL we can guess, so they cannot use the
 * click-to-play facade. This is the next best thing: nothing is requested until
 * the visitor is actually scrolling toward it, which keeps them off the critical
 * path entirely.
 */
export function DeferredIframe({
  src,
  title,
  aspect = "video",
  className,
}: {
  src: string
  title: string
  aspect?: "video" | "portrait"
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // No IntersectionObserver (very old browsers): just load it.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "400px" }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-shade",
        aspect === "portrait" ? "aspect-[4/5]" : "aspect-video",
        className
      )}
    >
      {visible ? (
        <iframe
          src={src}
          title={title}
          allow="clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-shade to-hairline" />
      )}
    </div>
  )
}
