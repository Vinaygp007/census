'use client'

import { motion } from 'framer-motion'
import { Users, TrendingUp, MapPin, Clock } from 'lucide-react'

interface PhaseStatsProps {
  selectedPhase: string | null
}

export default function PhaseStats({ selectedPhase }: PhaseStatsProps) {
  const stats = [
    {
      icon: Users,
      label: 'Total Participants',
      value: '1,24,567',
      change: '+12.5%',
      color: '#6366f1'
    },
    {
      icon: TrendingUp,
      label: 'Most Growing Phase',
      value: 'Jugaad mode on',
      change: '+28%',
      color: '#8b5cf6'
    },
    {
      icon: MapPin,
      label: 'Most Active City',
      value: 'Mumbai',
      change: '18,234 responses',
      color: '#06b6d4'
    },
    {
      icon: Clock,
      label: 'Updated',
      value: 'Just now',
      change: 'Real-time',
      color: '#10b981'
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all hover:shadow-xl"
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className="p-3 rounded-xl"
              style={{ backgroundColor: `${stat.color}20` }}
            >
              <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
            </div>
          </div>
          
          <div className="text-3xl font-bold mb-1">{stat.value}</div>
          <div className="text-sm font-medium text-muted-foreground mb-2">
            {stat.label}
          </div>
          <div className="text-xs" style={{ color: stat.color }}>
            {stat.change}
          </div>
        </motion.div>
      ))}
    </div>
  )
}