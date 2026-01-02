'use client'

import { motion } from 'framer-motion'

interface PhaseData {
  phase: string
  emoji: string
  description: string
  color: string
  userName: string
  city: string
  age: number
  dominantEmotions: string[]
}

interface PhaseCardVisualProps {
  data: PhaseData
}

export default function PhaseCardVisual({ data }: PhaseCardVisualProps) {
  return (
    <div
      id="phase-card-visual"
      className="relative w-full aspect-[9/16] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl"
      style={{
        background: `linear-gradient(135deg, ${data.color}20 0%, ${data.color}40 100%)`
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, ${data.color} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col p-8">
        {/* Header */}
        <div className="flex-shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-block"
          >
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Phase Census 2026
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.3 }}
            className="text-9xl mb-6"
          >
            {data.emoji}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold mb-4"
            style={{ color: data.color }}
          >
            "{data.phase}"
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-foreground/80 mb-8 max-w-xs"
          >
            {data.description}
          </motion.p>

          {/* Emotions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-2 justify-center mb-8"
          >
            {data.dominantEmotions.map((emotion, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${data.color}20`,
                  color: data.color,
                  border: `1px solid ${data.color}40`
                }}
              >
                {emotion}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex-shrink-0"
        >
          <div className="flex items-center justify-between text-sm">
            <div>
              <div className="font-semibold">{data.userName}</div>
              <div className="text-muted-foreground">{data.city}, {data.age}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">Phase Census</div>
              <div className="text-muted-foreground">2026</div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: data.color }}
        />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: data.color }}
        />
      </div>
    </div>
  )
}