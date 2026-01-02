
'use client'

import { motion } from 'framer-motion'
import { emotionsList } from '@/lib/emotion'
import { Check } from 'lucide-react'

interface EmotionSelectorProps {
  selectedEmotions: number[]
  onSelect: (emotions: number[]) => void
}

export default function EmotionSelector({ selectedEmotions, onSelect }: EmotionSelectorProps) {
  const toggleEmotion = (emotionId: number) => {
    if (selectedEmotions.includes(emotionId)) {
      onSelect(selectedEmotions.filter(id => id !== emotionId))
    } else {
      onSelect([...selectedEmotions, emotionId])
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {emotionsList.map((emotion, index) => {
        const isSelected = selectedEmotions.includes(emotion.id)
        
        return (
          <motion.button
            key={emotion.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleEmotion(emotion.id)}
            className={`relative p-6 rounded-2xl border-2 transition-all ${
              isSelected 
                ? 'border-primary bg-primary/5 shadow-lg' 
                : 'border-border bg-background hover:border-primary/30'
            }`}
            style={{
              backgroundColor: isSelected ? `${emotion.color}15` : undefined
            }}
          >
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            )}
            
            <div className="text-4xl mb-2">{emotion.emoji}</div>
            <div className="font-semibold text-sm">{emotion.name}</div>
          </motion.button>
        )
      })}
    </div>
  )
}