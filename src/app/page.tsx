import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { LogoTicker } from "@/components/sections/logo-ticker"
import { About } from "@/components/sections/about"
import { VideoPortfolio } from "@/components/sections/video-portfolio"
import { PhotoPortfolio } from "@/components/sections/photo-portfolio"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"
import { GridBackground } from "@/components/ui/grid-background"

export default function Home() {
  return (
    <GridBackground>
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <VideoPortfolio />
        <About />
        <PhotoPortfolio />
        <CTA />
      </main>
      <Footer />
    </GridBackground>
  )
}
