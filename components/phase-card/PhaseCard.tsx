'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Share2, Sparkles, ArrowRight } from 'lucide-react'
import { trackEvent } from '@/lib/clarity'
import PhaseCardVisual from './PhaseCardVisual'
import ShareModal from './ShareModal'
import html2canvas from 'html2canvas'

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

interface PhaseCardProps {
  responseId: string
}

export default function PhaseCard({ responseId }: PhaseCardProps) {
  const [phaseData, setPhaseData] = useState<PhaseData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showShareModal, setShowShareModal] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    fetchPhaseData()
  }, [responseId])

  const fetchPhaseData = async () => {
    try {
      const response = await fetch(`/api/get-phase?id=${responseId}`)
      const data = await response.json()
      
      if (response.ok) {
        setPhaseData(data)
        trackEvent('phase_card_viewed', { phase: data.phase, responseId })
      }
    } catch (error) {
      trackEvent('phase_card_error', { error: String(error) })
    } finally {
      setIsLoading(false)
      // Reveal animation after loading
      setTimeout(() => setIsRevealed(true), 500)
    }
  }

  const handleDownload = async () => {
    trackEvent('phase_card_downloaded', { phase: phaseData?.phase })
    
    const cardElement = document.getElementById('phase-card-visual')
    if (!cardElement) return

    try {
      const canvas = await html2canvas(cardElement, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      })

      const link = document.createElement('a')
      link.download = `my-phase-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const handleShare = () => {
    trackEvent('phase_card_share_opened', { phase: phaseData?.phase })
    setShowShareModal(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Discovering Your Phase...</h2>
          <p className="text-muted-foreground">Analyzing your responses</p>
        </motion.div>
      </div>
    )
  }

  if (!phaseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Phase Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find your phase data</p>
          <a href="/participate">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold">
              Take Census Again
            </button>
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Reveal Animation */}
          <AnimatePresence>
            {!isRevealed && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 2 }}
                transition={{ duration: 1 }}
                className="fixed inset-0 z-50 bg-background flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 1 }}
                  className="text-center"
                >
                  <div className="text-8xl mb-4">{phaseData.emoji}</div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                  >
                    {phaseData.phase}
                  </motion.h1>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Your Phase Revealed</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hello, <span className="text-primary">{phaseData.userName}</span>!
            </h1>
            <p className="text-xl text-muted-foreground">
              Here's what we discovered about your current phase
            </p>
          </motion.div>

          {/* Phase Card Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <PhaseCardVisual data={phaseData} />
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Download className="w-5 h-5" />
              Download Card
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-background border-2 border-primary rounded-full font-semibold hover:bg-primary/5 transition-all"
            >
              <Share2 className="w-5 h-5" />
              Share Your Phase
            </motion.button>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
          >
            <h3 className="text-2xl font-bold mb-4">What's Next?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <a href="/reveal" className="group">
                <div className="p-6 rounded-xl bg-background hover:bg-primary/5 border border-border hover:border-primary/30 transition-all">
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    Explore India's Phase Map
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    See how your phase compares with others across India
                  </p>
                  <span className="text-sm text-primary flex items-center gap-1">
                    View Map <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </a>

              <a href="https://guisedup.com" target="_blank" className="group">
                <div className="p-6 rounded-xl bg-background hover:bg-primary/5 border border-border hover:border-primary/30 transition-all">
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    Join Guised Up
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect with others in similar phases
                  </p>
                  <span className="text-sm text-primary flex items-center gap-1">
                    Download App <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        phaseData={phaseData}
        responseId={responseId}
      />
    </>
  )
}