'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { trackEvent } from '@/lib/clarity'

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

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  phaseData: PhaseData
  responseId: string
}

export default function ShareModal({ isOpen, onClose, phaseData, responseId }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/phase-card?id=${responseId}`
  const shareText = `I just discovered my phase: "${phaseData.phase}" ${phaseData.emoji}\n\nTake the Phase Census and discover yours!`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    trackEvent('share_link_copied', { phase: phaseData.phase })
    setTimeout(() => setCopied(false), 2000)
  }

  const socialShares = [
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`,
      color: '#25D366'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: '#1DA1F2'
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: '#4267B2'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: '#0077B5'
    },
  ]

  const handleSocialShare = (platform: string, url: string) => {
    trackEvent('social_share_clicked', { platform, phase: phaseData.phase })
    window.open(url, '_blank', 'width=600,height=400')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-background border border-border rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Share Your Phase</h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preview */}
              <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{phaseData.emoji}</span>
                  <div>
                    <div className="font-semibold">"{phaseData.phase}"</div>
                    <div className="text-sm text-muted-foreground">My current phase</div>
                  </div>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3">Share on social media</p>
                <div className="grid grid-cols-4 gap-3">
                  {socialShares.map((social) => (
                    <motion.button
                      key={social.name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSocialShare(social.name, social.url)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <span className="text-2xl">{social.icon}</span>
                      <span className="text-xs font-medium">{social.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Copy Link */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">Or copy link</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-4 py-3 rounded-xl border border-border bg-muted text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyLink}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}