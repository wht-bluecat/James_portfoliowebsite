/**
 * Vimeo poster URLs are signed and cannot be guessed from the video id, so we
 * resolve them on the server via oEmbed and hand the result to the facade as a
 * prop. Cached for a day; a failure just means that one card falls back to a
 * plain gradient rather than breaking the page.
 */
export async function getVimeoPoster(id: string): Promise<string | null> {
  try {
    const endpoint =
      "https://vimeo.com/api/oembed.json" +
      `?url=${encodeURIComponent(`https://vimeo.com/${id}`)}&width=1280`

    const res = await fetch(endpoint, { next: { revalidate: 86_400 } })
    if (!res.ok) return null

    const data: unknown = await res.json()
    if (typeof data === "object" && data !== null && "thumbnail_url" in data) {
      const url = (data as { thumbnail_url?: unknown }).thumbnail_url
      return typeof url === "string" ? url : null
    }
    return null
  } catch {
    return null
  }
}

/** Resolves every Vimeo poster on a page in one pass. */
export async function getVimeoPosters(
  ids: string[]
): Promise<Record<string, string | null>> {
  const unique = [...new Set(ids)]
  const posters = await Promise.all(unique.map(getVimeoPoster))
  return Object.fromEntries(unique.map((id, i) => [id, posters[i]]))
}
