import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { LogoTicker } from "@/components/sections/logo-ticker"
import { Results } from "@/components/sections/results"
import { Latest } from "@/components/sections/latest"
import { Featured } from "@/components/sections/featured"
import { Pipeline } from "@/components/sections/pipeline"
import { Motion } from "@/components/sections/motion"
import { VideoPortfolio } from "@/components/sections/video-portfolio"
import { ShortForm } from "@/components/sections/short-form"
import { About } from "@/components/sections/about"
import { PhotoPortfolio } from "@/components/sections/photo-portfolio"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"
import { GridBackground } from "@/components/ui/grid-background"
import { films, verticals } from "@/data/work"
import { getVimeoPosters } from "@/lib/vimeo"

export default async function Home() {
  // Resolved once on the server so every Vimeo card can paint a real poster
  // instead of mounting its player. Vimeo thumbnail URLs are signed, so unlike
  // YouTube's they cannot be derived from the video id on the client.
  const posters = await getVimeoPosters(
    [...films, ...verticals]
      .filter((piece) => piece.provider === "vimeo")
      .map((piece) => piece.id)
  )

  return (
    <GridBackground>
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <Results />
        <Latest />
        <Featured />
        <Pipeline />
        <Motion />
        <VideoPortfolio posters={posters} />
        <ShortForm posters={posters} />
        <About />
        <PhotoPortfolio />
        <CTA />
      </main>
      <Footer />
    </GridBackground>
  )
}
