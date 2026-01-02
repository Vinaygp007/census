'use client'

import { motion } from 'framer-motion'

export default function PhaseTimeline() {
  const timelineData = [
    {
      time: '6 AM - 9 AM',
      phase: 'Bas kar bhai',
      emoji: '😤',
      description: 'Morning rush hour stress',
      percentage: 35,
      color: '#f43f5e'
    },
    {
      time: '9 AM - 12 PM',
      phase: 'Jugaad mode on',
      emoji: '🔧',
      description: 'Finding creative solutions at work',
      percentage: 28,
      color: '#8b5cf6'
    },
    {
      time: '12 PM - 3 PM',
      phase: 'Chalta hai',
      emoji: '🤷‍♂️',
      description: 'Accepting the afternoon slump',
      percentage: 42,
      color: '#6366f1'
    },
    {
      time: '3 PM - 6 PM',
      phase: 'Kuch bhi ho sakta hai',
      emoji: '🎲',
      description: 'Unpredictable evening energy',
      percentage: 31,
      color: '#06b6d4'
    },
    {
      time: '6 PM - 9 PM',
      phase: 'Time for ghar wapsi',
      emoji: '🏠',
      description: 'Evening commute and family time',
      percentage: 45,
      color: '#f59e0b'
    },
    {
      time: '9 PM - 12 AM',
      phase: 'Sab moh maya hai',
      emoji: '🧘',
      description: 'Late night philosophical thoughts',
      percentage: 25,
      color: '#10b981'
    },
  ]

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Phase Timeline</h2>
        <p className="text-muted-foreground">How India's mood changes throughout the day</p>
      </div>

      <div className="space-y-6">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center gap-6">
              {/* Time */}
              <div className="w-32 text-sm font-semibold text-muted-foreground flex-shrink-0">
                {item.time}
              </div>

              {/* Timeline dot */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {index < timelineData.length - 1 && (
                  <div
                    className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-12"
                    style={{ backgroundColor: `${item.color}30` }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{item.phase}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                  <div className="mt-2 text-sm" style={{ color: item.color }}>
                    {item.percentage}% of users in this phase
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}