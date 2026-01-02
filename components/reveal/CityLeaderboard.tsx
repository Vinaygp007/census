'use client'

import { motion } from 'framer-motion'
import { Trophy, TrendingUp } from 'lucide-react'

export default function CityLeaderboard() {
  const cities = [
    { name: 'Mumbai', responses: 18234, phase: 'Chalta hai', emoji: '🤷‍♂️', rank: 1 },
    { name: 'Delhi', responses: 15678, phase: 'Bas kar bhai', emoji: '😤', rank: 2 },
    { name: 'Bangalore', responses: 14523, phase: 'Jugaad mode on', emoji: '🔧', rank: 3 },
    { name: 'Pune', responses: 12456, phase: 'Kuch bhi ho sakta hai', emoji: '🎲', rank: 4 },
    { name: 'Chennai', responses: 11234, phase: 'Sab moh maya hai', emoji: '🧘', rank: 5 },
  ]

  return (
    <div className="p-8 rounded-2xl bg-background border border-border">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-primary" />
        <h3 className="text-2xl font-bold">Top Cities</h3>
      </div>

      <div className="space-y-4">
        {cities.map((city, index) => (
          <motion.div
            key={city.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all"
          >
            {/* Rank */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              city.rank === 1 ? 'bg-yellow-500 text-white' :
              city.rank === 2 ? 'bg-gray-400 text-white' :
              city.rank === 3 ? 'bg-orange-600 text-white' :
              'bg-muted-foreground/20'
            }`}>
              {city.rank}
            </div>

            {/* City info */}
            <div className="flex-1">
              <div className="font-semibold">{city.name}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <span>{city.emoji}</span>
                <span>{city.phase}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="text-right">
              <div className="font-bold">{city.responses.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                responses
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}