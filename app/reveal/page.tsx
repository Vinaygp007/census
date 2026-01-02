'use client'

import { useState } from 'react'
import PhaseMap from '@/components/reveal/PhaseMap'
import PhaseStats from '@/components/reveal/PhaseStats'
import PhaseTimeline from '@/components/reveal/PhaseTimeline'
import CityLeaderboard from '@/components/reveal/CityLeaderboard'
import LiveFeed from '@/components/reveal/LiveFeed'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function RevealPage() {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Live Data</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              India&apos;s Phase Map
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-time insights into what India is feeling right now
            </p>
          </motion.div>

          {/* Phase Statistics */}
          <PhaseStats selectedPhase={selectedPhase} />
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <PhaseMap onPhaseSelect={setSelectedPhase} />
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <PhaseTimeline />
        </div>
      </section>

      {/* City Leaderboard & Live Feed */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <CityLeaderboard />
            <LiveFeed />
          </div>
        </div>
      </section>
    </main>
  )
}