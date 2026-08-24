"use client"

import { VideoEmbed } from "./video-embed"
import { DeferredIframe } from "./deferred-iframe"
import { formatViews, type Piece } from "@/data/work"

/**
 * One piece of work. The caption stays visible rather than hiding on hover —
 * a client scanning for "who did what" should never have to hunt for it, and
 * hover captions do not exist on touch at all.
 */
export function PieceCard({
  piece,
  index,
  aspect = "16/9",
  poster,
  priority = false,
}: {
  piece: Piece
  index: number
  aspect?: "16/9" | "9/16"
  poster?: string | null
  priority?: boolean
}) {
  return (
    <article className="group">
      {piece.provider === "behance" ? (
        <DeferredIframe
          src={`https://www.behance.net/embed/project/${piece.id}?ilo0=1`}
          title={`${piece.client} — ${piece.title}`}
          aspect="video"
        />
      ) : (
        <VideoEmbed
          provider={piece.provider}
          id={piece.id}
          title={`${piece.client} — ${piece.title}`}
          aspect={aspect}
          poster={poster}
          priority={priority}
        />
      )}

      <div className="mt-3.5">
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <span className="font-mono text-[10px] tracking-[0.12em] text-ink-3">
            {String(index + 1).padStart(2, "0")}
          </span>
          {(piece.views || piece.duration) && (
            <span className="font-mono text-[10px] tracking-[0.08em] text-ink-3">
              {piece.views ? `${formatViews(piece.views)} views` : piece.duration}
            </span>
          )}
        </div>

        <h3 className="font-heading text-[15px] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand">
          {piece.title}
        </h3>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-3">
          {piece.client} <span className="text-hairline">/</span> {piece.role}
        </p>
      </div>
    </article>
  )
}
