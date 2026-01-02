'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Radio } from 'lucide-react'

interface FeedItem {
  id: number
  name: string
  city: string
  phase: string
  emoji: string
  timestamp: string
}

export default function LiveFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    { id: 1, name: 'Rahul', city: 'Mumbai', phase: 'Chalta hai', emoji: '🤷‍♂️', timestamp: 'Just now' },
    { id: 2, name: 'Priya', city: 'Delhi', phase: 'Bas kar bhai', emoji: '😤', timestamp: '2 min ago' },
    { id: 3, name: 'Amit', city: 'Bangalore', phase: 'Jugaad mode on', emoji: '🔧', timestamp: '5 min ago' },
  ])

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newItem: FeedItem = {
        id: Date.now(),
        name: ['Raj', 'Sneha', 'Vikram', 'Ananya', 'Arjun'][Math.floor(Math.random() * 5)],
        city: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai'][Math.floor(Math.random() * 5)],
        phase: ['Chalta hai', 'Bas kar bhai', 'Jugaad mode on'][Math.floor(Math.random() * 3)],
        emoji: ['🤷‍♂️', '😤', '🔧'][Math.floor(Math.random() * 3)],
        timestamp: 'Just now'
      }

      setFeedItems(prev => [newItem, ...prev.slice(0, 4)])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-8 rounded-2xl bg-background border border-border">
      <div className="flex items-center gap-3 mb-6">
        <Radio className="w-6 h-6 text-primary animate-pulse" />
        <h3 className="text-2xl font-bold">Live Feed</h3>
        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          LIVE
        </span>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {feedItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100 }}
              className="p-4 rounded-xl bg-muted/50 border border-border"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.city}</div>
                </div>
                <div className="text-xs text-muted-foreground">{item.timestamp}</div>
              </div>
              <div className="text-sm">
                is now in <span className="font-semibold text-primary">"{item.phase}"</span> phase
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}