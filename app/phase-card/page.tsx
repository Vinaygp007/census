'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import PhaseCard from '@/components/phase-card/PhaseCard'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

function PhaseCardContent() {
  const searchParams = useSearchParams()
  const responseId = searchParams.get('id')

  if (!responseId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Response</h1>
          <p className="text-muted-foreground">No response ID found</p>
        </div>
      </div>
    )
  }

  return <PhaseCard responseId={responseId} />
}

export default function PhaseCardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="w-12 h-12 text-primary" />
          </motion.div>
        </div>
      }
    >
      <PhaseCardContent />
    </Suspense>
  )
}