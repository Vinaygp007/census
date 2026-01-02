import Hero from '@/components/landing/Hero'
import RevealSection from '@/components/landing/RevealSection'
import PhaseQuotes from '@/components/landing/PhaseQuotes'
import CommunityGraphics from '@/components/landing/CommunityGraphics'
import AppDownloadEasterEgg from '@/components/AppDownloadEasterEgg'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <PhaseQuotes />
      <RevealSection />
      <CommunityGraphics />
      <AppDownloadEasterEgg />
    </main>
  )
}