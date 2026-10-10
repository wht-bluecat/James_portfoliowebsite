import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk, Instrument_Serif, Geist_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

const SITE = "https://james-portfoliowebsite.vercel.app"
const DESCRIPTION =
  "Video editor and social media manager in Manila. I cut the long-form, build the explainer animation and the Shorts, then publish and report on the whole channel."

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "James Yaptangco | Video Editor & Social Media Manager",
    template: "%s | James Yaptangco",
  },
  description: DESCRIPTION,
  keywords: [
    "video editor",
    "social media manager",
    "YouTube channel management",
    "podcast editor",
    "motion graphics",
    "short form video",
    "YouTube Shorts editor",
    "Manila",
    "Philippines",
  ],
  authors: [{ name: "James Yaptangco" }],
  creator: "James Yaptangco",
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "James Yaptangco",
    title: "James Yaptangco | Video Editor & Social Media Manager",
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "James Yaptangco | Video Editor & Social Media Manager",
    description: DESCRIPTION,
  },
  alternates: { canonical: SITE },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0b" },
  ],
}

/**
 * Resolves the theme before first paint so there is no white flash on a dark
 * device. It has to be inline and blocking; anything deferred is too late.
 */
const themeScript = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.add(d?"dark":"light")}catch(e){}})()`

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "James Yaptangco",
  jobTitle: "Video Editor and Social Media Manager",
  url: SITE,
  address: { "@type": "PostalAddress", addressLocality: "Manila", addressCountry: "PH" },
  email: "mailto:yaptangco.mikael@gmail.com",
  sameAs: [
    "https://www.linkedin.com/in/james-yaptangco-230339200/",
    "https://www.instagram.com/wht.jame/",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Posters come from YouTube's CDN, so open that socket early. */}
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="grain bg-paper font-sans text-ink">
        <a
          href="#results"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to the results
        </a>
        {children}
      </body>
    </html>
  )
}
