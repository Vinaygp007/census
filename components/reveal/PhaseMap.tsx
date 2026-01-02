'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface PhaseMapProps {
  onPhaseSelect: (phase: string | null) => void
}

const phases = [
  { name: 'Chalta hai', emoji: '🤷‍♂️', percentage: 28, color: '#6366f1' },
  { name: 'Bas kar bhai', emoji: '😤', percentage: 18, color: '#f43f5e' },
  { name: 'Jugaad mode on', emoji: '🔧', percentage: 15, color: '#8b5cf6' },
  { name: 'Kuch bhi ho sakta hai', emoji: '🎲', percentage: 14, color: '#06b6d4' },
  { name: 'Sab moh maya hai', emoji: '🧘', percentage: 13, color: '#10b981' },
  { name: 'Time for ghar wapsi', emoji: '🏠', percentage: 12, color: '#f59e0b' },
]

export default function PhaseMap({ onPhaseSelect }: PhaseMapProps) {
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Most Common Phases</h2>
        <p className="text-muted-foreground">Click on a phase to see detailed insights</p>
      </div>

      {/* Phase Bubbles */}
      <div className="relative min-h-[500px] flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {phases.map((phase, index) => {
            const size = 100 + (phase.percentage * 3)
            const isHovered = hoveredPhase === phase.name

            return (
              <motion.button
                key={phase.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredPhase(phase.name)}
                onHoverEnd={() => setHoveredPhase(null)}
                onClick={() => onPhaseSelect(phase.name)}
                className="relative group"
                style={{
                  width: size,
                  height: size,
                }}
              >
                {/* Bubble */}
                <div
                  className="absolute inset-0 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: `${phase.color}20`,
                    border: `3px solid ${phase.color}`,
                    boxShadow: isHovered ? `0 0 40px ${phase.color}60` : `0 0 20px ${phase.color}30`,
                  }}
                />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="text-4xl mb-2">{phase.emoji}</div>
                  <div className="font-semibold text-sm mb-1">{phase.name}</div>
                  <div className="text-2xl font-bold" style={{ color: phase.color }}>
                    {phase.percentage}%
                  </div>
                </div>

                {/* Pulse effect */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: phase.color }}
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.3 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {phases.map((phase) => (
          <div
            key={phase.name}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: phase.color }}
            />
            <span className="text-sm">{phase.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}