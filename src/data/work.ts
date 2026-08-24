/**
 * Single source of truth for everything shown on the site.
 *
 * View counts were pulled from the live YouTube channel on 2026-08-24. They are
 * displayed as approximations ("5.0K") so they age gracefully — refresh them
 * here when you want them current and nothing else needs to change.
 */

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
  duration?: string
  tags: string[]
}

export type Featured = Piece & {
  /** One paragraph on why this piece mattered. */
  summary: string
  metrics: { value: string; label: string }[]
}

/* ---------------------------------------------------------------------------
   FEATURED — the one piece that earns the top of the page.
   Crop Steering is the channel's outlier: ~5.0K views against a 130–320 baseline.
   --------------------------------------------------------------------------- */

export const featured: Featured = {
  id: "lvIDvTABwq8",
  provider: "youtube",
  title: "Crop Steering Explained: Dryback, EC and Shot Size",
  client: "Green Thumb Depot",
  role: "Editor · Motion graphics · Thumbnail · Distribution",
  views: 5000,
  duration: "51:45",
  tags: ["Long-form", "Podcast", "Motion graphics"],
  summary:
    "A 52-minute technical interview, cut into something people actually finish. Custom explainer animations at every abstract idea, teaching cards burned in at each concept, and a thumbnail rebuilt around the topic instead of the punchline. It became the channel's biggest video by a factor of three.",
  metrics: [
    { value: "5.0K", label: "Views" },
    { value: "3x", label: "Previous channel best" },
    { value: "12", label: "Custom animations" },
  ],
}

/* ---------------------------------------------------------------------------
   LONG-FORM
   --------------------------------------------------------------------------- */

export const films: Piece[] = [
  {
    id: "CYE15-TtZAk",
    provider: "youtube",
    title: "How To Stack EC Without Shutting The Plant Down",
    client: "Green Thumb Depot",
    role: "Editor · Motion graphics",
    views: 1800,
    duration: "6:08",
    tags: ["Explainer", "Motion graphics"],
  },
  {
    id: "-69BJuGoxVI",
    provider: "youtube",
    title: "How Live Rosin Is Made: Ice Water Hash to the Press",
    client: "Green Thumb Depot",
    role: "Editor · Motion graphics · Thumbnail",
    views: 1600,
    duration: "51:03",
    tags: ["Long-form", "Podcast"],
  },
  {
    id: "zX5OwcsftQs",
    provider: "youtube",
    title: "Rolling Benches: How to Add 30 to 50% More Canopy",
    client: "Green Thumb Depot",
    role: "Editor · Motion graphics",
    views: 1500,
    duration: "21:21",
    tags: ["Explainer", "Motion graphics"],
  },
  {
    id: "UtkPFkbuQA4",
    provider: "youtube",
    title: "Grow Media Explained: The 9 Things That Decide Your Yield",
    client: "Green Thumb Depot",
    role: "Editor · Motion graphics · Thumbnail",
    views: 1300,
    duration: "27:31",
    tags: ["Long-form", "Podcast", "Motion graphics"],
  },
  {
    id: "dEqwv4FBYM4",
    provider: "youtube",
    title: "What Synthetic Feed Does To The Microbes You Paid For",
    client: "Green Thumb Depot",
    role: "Editor · Motion graphics",
    views: 813,
    duration: "6:24",
    tags: ["Explainer", "Motion graphics"],
  },
  {
    id: "karHvoZ19f8",
    provider: "youtube",
    title: "How To Actually Size A Dehumidifier For Your Grow Room",
    client: "Green Thumb Depot",
    role: "Editor · Motion graphics",
    views: 391,
    duration: "8:11",
    tags: ["Explainer", "Motion graphics"],
  },
  {
    id: "2iLTZk4Zy3M",
    provider: "youtube",
    title: "Pre-Roll Machines Explained with STM Canna",
    client: "Green Thumb Depot",
    role: "Editor · Motion graphics · Thumbnail",
    views: 166,
    duration: "52:49",
    tags: ["Long-form", "Podcast"],
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
   VERTICAL — Shorts, Reels and vertical ads.
   Every GTD short here carries explainer animation built native at 1080x1920.
   --------------------------------------------------------------------------- */

export const verticals: Piece[] = [
  {
    id: "5ygbmi6E2vI",
    provider: "youtube",
    title: "The Pepper Story That Explains Crop Steering",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 1100,
    tags: ["Short", "Animation"],
  },
  {
    id: "0xeghL57cS0",
    provider: "youtube",
    title: "Dryback Targets For Rockwool And Coco, By Number",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 963,
    tags: ["Short", "Animation"],
  },
  {
    id: "mg1EM7M5TRE",
    provider: "youtube",
    title: "One Guy, 200,000 Grams a Week",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 759,
    tags: ["Short", "Animation"],
  },
  {
    id: "Rn8NBAj_UMQ",
    provider: "youtube",
    title: "Colder Does Not Mean More Flavor. Here Is The Proof",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 704,
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
    id: "Xsr0yHcB5Bo",
    provider: "youtube",
    title: "A Full Pre-Roll Line For Less Than One Machine",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 279,
    tags: ["Short", "Animation"],
  },
  {
    id: "21GKWWLvQgY",
    provider: "youtube",
    title: "The Grow Light Rule That Is Now Completely Obsolete",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 277,
    tags: ["Short", "Animation"],
  },
  {
    id: "ZyQoB-QVPMI",
    provider: "youtube",
    title: "Why Commercial Growers Do Not Use Aeroponics",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 263,
    tags: ["Short", "Animation"],
  },
  {
    id: "26B_Y418rkE",
    provider: "youtube",
    title: "Why High EC Stops Your Plants From Drinking",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 255,
    tags: ["Short", "Animation"],
  },
  {
    id: "PyXGE9tl_ss",
    provider: "youtube",
    title: "Pre-Roll Machine Labor Savings: The Real Math",
    client: "Green Thumb Depot",
    role: "Editor · Animation",
    views: 100,
    tags: ["Short", "Animation"],
  },
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
