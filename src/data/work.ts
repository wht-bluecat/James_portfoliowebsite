/**
 * Single source of truth for everything shown on the site.
 *
 * Green Thumb Depot long-form view counts are not typed here at all: they are
 * looked up from data/channel.ts, so refreshing that one file updates the
 * Results section, the case study and every card below together. Shorts and
 * Reels counts were read on the dates in that file and are displayed as
 * approximations ("5.0K") so they age gracefully.
 */

import { channelVideos, isMine } from "./channel"

/** Public view count for one of the channel's long-form videos. */
const viewsOf = (id: string) => channelVideos.find((v) => v.id === id)?.views

export type Provider = "youtube" | "vimeo" | "behance"

export type Piece = {
  /** Stable key, and the provider's id for the embed. */
  id: string
  provider: Provider
  title: string
  client: string
  /** What James actually did. Clients read this before they read anything else. */
  role: string
  /** Approximate public view count, for pieces where the number is the proof. */
  views?: number
  /** Public Instagram play count for the same clip posted as a Reel. The card
      shows whichever platform the piece did better on. */
  plays?: number
  duration?: string
  tags: string[]
}

export type Featured = Piece & {
  /** One paragraph on why this piece mattered. */
  summary: string
  metrics: { value: string; label: string }[]
}

/* ---------------------------------------------------------------------------
   FEATURED: the one piece that earns its own case study.
   Crop Steering is the most-watched video the channel has published, in any
   format. The multiple is measured against the best long-form video uploaded
   before the takeover, and recomputes from data/channel.ts.
   --------------------------------------------------------------------------- */

const FEATURED_ID = "lvIDvTABwq8"
const featuredViews = viewsOf(FEATURED_ID) ?? 0
const previousBest = Math.max(...channelVideos.filter((v) => !isMine(v)).map((v) => v.views))

export const featured: Featured = {
  id: FEATURED_ID,
  provider: "youtube",
  title: "Crop Steering Explained: Dryback, EC and Shot Size",
  client: "Green Thumb Depot",
  role: "Editor · Motion graphics · Thumbnail · Title · Publishing",
  views: featuredViews,
  duration: "51:45",
  tags: ["Long-form", "Podcast", "Motion graphics"],
  summary:
    "A 52-minute technical interview, cut into something people actually finish. Custom explainer animation at every abstract idea, teaching cards burned in at each concept, and a thumbnail rebuilt around the topic instead of the punchline. It is now the most-watched video the channel has published, and the three most-played Reels on its Instagram were all cut from it.",
  metrics: [
    { value: formatViews(featuredViews), label: "Views" },
    { value: `${(featuredViews / previousBest).toFixed(1)}x`, label: "Previous long-form best" },
    { value: "14", label: "Custom animations" },
  ],
}

/* ---------------------------------------------------------------------------
   LONG-FORM
   --------------------------------------------------------------------------- */

export const films: Piece[] = [
  {
    id: "UlKm4RmsQ84",
    provider: "youtube",
    title: "Everything You Skip In Veg, You Pay For In Flower",
    client: "Green Thumb Depot",
    role: "Editor · Motion graphics · Thumbnail",
    views: viewsOf("UlKm4RmsQ84"),
    duration: "6:05",
    tags: ["Explainer", "Motion graphics"],
  },
  {
    id: "C1_tyRx88RM",
    provider: "youtube",
    title: "Plant Stress Explained: The Day 21 Protocol That Trains A Crop",
    client: "Green Thumb Depot",
    role: "Editor · Motion graphics · Thumbnail",
    views: viewsOf("C1_tyRx88RM"),
    duration: "1:46:28",
    tags: ["Long-form", "Podcast", "Motion graphics"],
  },
  {
    id: "HxZ-ofoGXKw",
    provider: "youtube",
    title: "Far-Red and UV Explained",
    client: "Green Thumb Depot",
    role: "Editor · Motion graphics · Thumbnail",
    views: viewsOf("HxZ-ofoGXKw"),
    duration: "39:10",
    tags: ["Long-form", "Podcast", "Motion graphics"],
  },
  {
    id: "nZNTPni2b3Y",
    provider: "youtube",
    title: "How To Cure And Whip Live Rosin Into Cold Cure Batter",
    client: "Green Thumb Depot",
    role: "Editor · Motion graphics · Thumbnail",
    views: viewsOf("nZNTPni2b3Y"),
    duration: "6:00",
    tags: ["Explainer", "Motion graphics"],
  },
  {
    id: "pZXbqDhR7IU",
    provider: "youtube",
    title: "Under Canopy Lighting: Snake vs Parallel Layout",
    client: "Green Thumb Depot",
    role: "Editor · Motion graphics · Thumbnail",
    views: viewsOf("pZXbqDhR7IU"),
    duration: "4:11",
    tags: ["Explainer", "Motion graphics"],
  },
  {
    id: "-69BJuGoxVI",
    provider: "youtube",
    title: "Live Rosin Explained: One Guy Presses 200,000 Grams a Week",
    client: "Green Thumb Depot",
    role: "Editor · Motion graphics · Thumbnail",
    views: viewsOf("-69BJuGoxVI"),
    duration: "51:03",
    tags: ["Long-form", "Podcast", "Motion graphics"],
  },
  {
    id: "dEqwv4FBYM4",
    provider: "youtube",
    title: "What Synthetic Feed Does To The Microbes You Paid For",
    client: "Green Thumb Depot",
    role: "Editor · Motion graphics · Thumbnail",
    views: viewsOf("dEqwv4FBYM4"),
    duration: "6:24",
    tags: ["Explainer", "Motion graphics"],
  },
  {
    id: "CYE15-TtZAk",
    provider: "youtube",
    title: "How To Stack EC Without Shutting The Plant Down",
    client: "Green Thumb Depot",
    role: "Editor · Motion graphics · Thumbnail",
    views: viewsOf("CYE15-TtZAk"),
    duration: "6:08",
    tags: ["Explainer", "Motion graphics"],
  },
  {
    id: "zX5OwcsftQs",
    provider: "youtube",
    title: "Rolling Benches Explained: How to add 30 to 50% More Canopy",
    client: "Green Thumb Depot",
    role: "Editor · Motion graphics · Thumbnail",
    views: viewsOf("zX5OwcsftQs"),
    duration: "21:21",
    tags: ["Long-form", "Podcast", "Motion graphics"],
  },
  {
    id: "YbUXs5ka_VM",
    provider: "youtube",
    title: "Fintech Podcast",
    client: "Warm Beer",
    role: "Editor",
    duration: "46:09",
    tags: ["Podcast", "Branded"],
  },
  {
    id: "1191550837",
    provider: "vimeo",
    title: "Leadership Promotional Video",
    client: "ARchway Learning",
    role: "Editor",
    duration: "1:46",
    tags: ["Branded"],
  },
  {
    id: "Ll6Qf6G5Jdg",
    provider: "youtube",
    title: "Intro Video",
    client: "Stanley Chen",
    role: "Editor",
    tags: ["Branded"],
  },
  {
    id: "E9oJqUg0yoA",
    provider: "youtube",
    title: "Vlog",
    client: "Kenzie Elizabeth",
    role: "Editor",
    tags: ["Creator"],
  },
  {
    id: "9bQN5kXSYHI",
    provider: "youtube",
    title: "Podcast",
    client: "Kenzie Elizabeth",
    role: "Editor",
    tags: ["Creator", "Podcast"],
  },
  {
    id: "diC6Sm6jOmE",
    provider: "youtube",
    title: "Video Essay",
    client: "Personal",
    role: "Writer · Editor",
    tags: ["Personal"],
  },
  {
    id: "gtVOALCk3dQ",
    provider: "youtube",
    title: "Landing Page Film",
    client: "Reignite Alpha",
    role: "Editor",
    tags: ["Branded"],
  },
  {
    id: "193302277",
    provider: "behance",
    title: "Concert Video",
    client: "Post Malone",
    role: "Editor",
    tags: ["Event"],
  },
  {
    id: "198107191",
    provider: "behance",
    title: "Promotional Video",
    client: "Salo Salo",
    role: "Editor",
    tags: ["Branded"],
  },
  {
    id: "212688527",
    provider: "behance",
    title: "Campus Film",
    client: "Algonquin College",
    role: "Editor",
    tags: ["Branded"],
  },
  {
    id: "246625883",
    provider: "behance",
    title: "Highlight Clip",
    client: "Podcast",
    role: "Editor",
    tags: ["Podcast"],
  },
]

/* ---------------------------------------------------------------------------
   VERTICAL: Shorts, Reels and vertical ads.
   Every GTD piece goes out as a YouTube Short and an Instagram Reel on the same
   day, so each carries both public counts and the card shows the better one.
   Ordered by that number.
   --------------------------------------------------------------------------- */

export const verticals: Piece[] = [
  {
    id: "0xeghL57cS0",
    provider: "youtube",
    title: "Dryback Targets For Rockwool And Coco, By Number",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 979,
    plays: 17003,
    tags: ["Short", "Animation"],
  },
  {
    id: "26B_Y418rkE",
    provider: "youtube",
    title: "Why High EC Stops Your Plants From Drinking",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 270,
    plays: 13644,
    tags: ["Short", "Animation"],
  },
  {
    id: "lLB55WV2iU4",
    provider: "youtube",
    title: "How To Set Your Irrigation Window And Hit Your Dryback",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 156,
    plays: 8676,
    tags: ["Short", "Animation"],
  },
  {
    id: "_8iXF2TPVYk",
    provider: "youtube",
    title: "Stop Lollipopping: Up To 30% More Yield",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 42,
    plays: 6341,
    tags: ["Short", "Animation"],
  },
  {
    id: "1185939561",
    provider: "vimeo",
    title: "Vertical Ad",
    client: "Panaskopic",
    role: "Editor",
    duration: "0:32",
    tags: ["Ad"],
  },
  {
    id: "W_mTNXpcStU",
    provider: "youtube",
    title: "Why Adding More Light Did Not Increase Your Yield",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 71,
    plays: 6018,
    tags: ["Short", "Animation"],
  },
  {
    id: "mg1EM7M5TRE",
    provider: "youtube",
    title: "One Guy, 200,000 Grams a Week",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 801,
    plays: 4477,
    tags: ["Short", "Animation"],
  },
  {
    id: "5ygbmi6E2vI",
    provider: "youtube",
    title: "The Pepper Story That Explains Crop Steering",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 1178,
    plays: 3746,
    tags: ["Short", "Animation"],
  },
  {
    id: "XdaLR_ow9fk",
    provider: "youtube",
    title: "Full Spectrum Isn't Enough On Its Own",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 84,
    plays: 2921,
    tags: ["Short", "Animation"],
  },
  {
    id: "Rn8NBAj_UMQ",
    provider: "youtube",
    title: "Colder Does Not Mean More Flavor. Here Is The Proof",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 783,
    plays: 476,
    tags: ["Short", "Animation"],
  },
]

/* ---------------------------------------------------------------------------
   MOTION: silent loops of the explainer animation, self-hosted.
   Each slug is a pair of files in /public/motion: <slug>.mp4 and <slug>.jpg.
   Only animation from episodes and Shorts that are already public goes here.
   --------------------------------------------------------------------------- */

export type Loop = {
  slug: string
  title: string
  /** What the animation had to explain. */
  note: string
  format: "16/9" | "4/5"
  /** The piece it was built for. */
  madeFor: string
}

export const loops: Loop[] = [
  {
    slug: "wasp-inside-aphid",
    title: "How a parasitic wasp kills an aphid",
    note: "The guest said it in one breath. Drawn out, it is five steps, and you can watch each one happen.",
    format: "16/9",
    madeFor: "Beneficial Insects Explained",
  },
  {
    slug: "sticky-trap",
    title: "A sticky trap is a gauge, not a cure",
    note: "Where the traps go, shown from the side and then from above.",
    format: "16/9",
    madeFor: "Beneficial Insects Explained",
  },
  {
    slug: "defoliate-spray-release",
    title: "Defoliate, spray, release",
    note: "A three-step rule, built as three cards in the order it has to happen.",
    format: "16/9",
    madeFor: "Beneficial Insects Explained",
  },
  {
    slug: "one-hunter-per-stage",
    title: "One hunter per stage",
    note: "Each life stage of a pest, and the predator that hunts it.",
    format: "4/5",
    madeFor: "Short",
  },
  {
    slug: "pore-air",
    title: "Water out, oxygen in",
    note: "What a dryback does inside the root zone.",
    format: "4/5",
    madeFor: "Short",
  },
  {
    slug: "redeploy",
    title: "Six run it. Eight move.",
    note: "What one machine does to a fourteen-person line.",
    format: "4/5",
    madeFor: "Short",
  },
  {
    slug: "scissor-chamber",
    title: "It cuts. Nothing sheds.",
    note: "Why two blades beat a whip, shown inside the chamber.",
    format: "4/5",
    madeFor: "Short",
  },
]

/* ---------------------------------------------------------------------------
   PIPELINE: everything one recording turns into, in the order it gets made.
   `track` is the short label on the timeline graphic; `clips` places that
   stage's pieces along it as [start %, width %] pairs.
   --------------------------------------------------------------------------- */

export type Stage = {
  track: string
  title: string
  body: string
  /** Where the finished piece ends up. */
  goes: string[]
  clips: [number, number][]
}

export const pipeline: Stage[] = [
  {
    track: "Episode",
    title: "The episode",
    body: "A remote multi-track recording, cut down to the version worth watching. The camera follows whoever is talking, the sound is repaired and the tangents are gone.",
    goes: ["YouTube", "Podcast feed"],
    clips: [[0, 31], [32, 24], [57, 43]],
  },
  {
    track: "Animation",
    title: "Explainer animation",
    body: "Up to fifteen custom animations an episode, built for the ideas nobody has footage of.",
    goes: ["In the episode", "Rebuilt vertical for Shorts"],
    clips: [[5, 5], [15, 4], [24, 6], [37, 4], [46, 5], [58, 4], [67, 6], [79, 4], [88, 5]],
  },
  {
    track: "Cards",
    title: "On-screen teaching cards",
    body: "A header and its key points burned in at every concept, so someone skimming still leaves with the idea.",
    goes: ["In the episode"],
    clips: [[2, 2], [11, 2], [20, 2], [31, 2], [42, 2], [52, 2], [63, 2], [74, 2], [84, 2], [94, 2]],
  },
  {
    track: "Shorts",
    title: "Shorts and Reels",
    body: "Five or six per episode. Each one is a single idea with its own hook, cold-open graphic, cover and vertical animation.",
    goes: ["YouTube Shorts", "Instagram Reels"],
    clips: [[8, 3], [22, 3], [35, 3], [50, 3], [68, 3], [83, 3]],
  },
  {
    track: "Cuts",
    title: "Single-subject cuts",
    body: "Up to three videos of four to eight minutes from each episode, each one built around a single question people search for.",
    goes: ["YouTube"],
    clips: [[12, 11], [41, 13], [72, 11]],
  },
  {
    track: "Covers",
    title: "Thumbnails and covers",
    body: "The episode thumbnail, a cover for every Short and every shorter cut, and the launch graphics. Thumbnails are split-tested on YouTube.",
    goes: ["Every post"],
    clips: [[0, 2.4], [8, 2.4], [12, 2.4], [22, 2.4], [35, 2.4], [41, 2.4], [50, 2.4], [68, 2.4], [72, 2.4], [83, 2.4]],
  },
  {
    track: "Copy",
    title: "Titles, descriptions and captions",
    body: "Written per platform, never pasted across. Titles follow what people search for, every episode gets chapters, and every caption gets its own first line.",
    goes: ["Every post"],
    clips: [[0, 100]],
  },
  {
    track: "Publish",
    title: "Scheduling and publishing",
    body: "The whole week planned and posted across four channels, including Stories, collab invites and the podcast release.",
    goes: ["YouTube", "Instagram", "X", "Podcast feed"],
    clips: [[0, 6], [14, 6], [28, 6], [42, 6], [56, 6], [70, 6], [84, 6]],
  },
  {
    track: "Report",
    title: "The Monday report",
    body: "Click-through, retention and search terms for everything that went out, and the specific changes they lead to the following week.",
    goes: ["The team"],
    clips: [[94, 6]],
  },
]

/** Where finished work gets posted, and what it gets made in. */
export const publishesTo = [
  "YouTube",
  "YouTube Shorts",
  "Instagram Reels",
  "Instagram Stories",
  "X",
  "Podcast feed",
]

export const worksIn = [
  "DaVinci Resolve",
  "Remotion",
  "Descript",
  "Riverside",
  "YouTube Studio",
  "Meta Business Suite",
  "Buffer",
  "Buzzsprout",
]

/* ---------------------------------------------------------------------------
   PHOTOGRAPHY
   --------------------------------------------------------------------------- */

export const photography = [
  { id: "203356825", title: "Collection I" },
  { id: "210612609", title: "Collection II" },
  { id: "210612813", title: "Collection III" },
  { id: "203356339", title: "Collection IV" },
  { id: "245105765", title: "Collection V" },
  { id: "210612997", title: "Collection VI" },
]

export const clients = [
  "Green Thumb Depot",
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

/** 1600 becomes "1.6K". Honest without pretending to be exact. */
export function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}
