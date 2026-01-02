
'use client'

import { motion } from 'framer-motion'

interface SuggestionRowProps {
  suggestions: string[]
  onSelect: (suggestion: string) => void
}

export default function SuggestionRow({ suggestions, onSelect }: SuggestionRowProps) {
  if (!suggestions || suggestions.length === 0) return null

  return (
    <div className="mt-4">
      <p className="text-sm text-muted-foreground mb-3">Quick suggestions:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(suggestion)}
            className="px-4 py-2 rounded-full bg-muted hover:bg-primary/10 border border-border hover:border-primary/30 text-sm transition-all"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </div>
  )
}