
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle } from 'lucide-react'
import { trackEvent } from '@/lib/clarity'
import { validateEmail, validatePhone } from '@/lib/utils'
import { phasePrompts } from '@/lib/phases'
import SuggestionRow from './SuggestionRow'
import EmotionSelector from './EmotionSelector'
import { useRouter } from 'next/navigation'

interface FormData {
  name: string
  contact: string
  age: string
  city: string
  studyOrOccupation: string
  responses: Record<number, any>
}

export default function ParticipationForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    age: '',
    city: '',
    studyOrOccupation: '',
    responses: {}
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = 2 + phasePrompts.length

  const validateBasicInfo = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.contact.trim()) {
      newErrors.contact = 'Email or phone is required'
    } else if (!validateEmail(formData.contact) && !validatePhone(formData.contact)) {
      newErrors.contact = 'Please enter a valid email or 10-digit phone number'
    }
    if (!formData.age || parseInt(formData.age) < 13 || parseInt(formData.age) > 100) {
      newErrors.age = 'Please enter a valid age (13-100)'
    }
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.studyOrOccupation.trim()) newErrors.studyOrOccupation = 'This field is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 0 && !validateBasicInfo()) {
      trackEvent('form_validation_error', { step: 'basic_info' })
      return
    }

    trackEvent('form_step_completed', { step })
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    trackEvent('form_submission_started')

    try {
      const response = await fetch('/api/submit-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        trackEvent('form_submission_success')
        router.push(`/phase-card?id=${data.responseId}`)
      } else {
        throw new Error(data.error || 'Submission failed')
      }
    } catch (error) {
      trackEvent('form_submission_error', { error: String(error) })
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = ((step + 1) / totalSteps) * 100

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Step {step + 1} of {totalSteps}
        </p>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="basic-info"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Let's get to know you</span>
              </motion.div>
              <h1 className="text-4xl font-bold mb-4">Tell us about yourself</h1>
              <p className="text-muted-foreground">This helps us understand your phase better</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email or Phone</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com or 9876543210"
                />
                {errors.contact && <p className="text-sm text-red-500 mt-1">{errors.contact}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="25"
                    min="13"
                    max="100"
                  />
                  {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Mumbai"
                  />
                  {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Study or Occupation</label>
                <input
                  type="text"
                  value={formData.studyOrOccupation}
                  onChange={(e) => setFormData({ ...formData, studyOrOccupation: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Software Engineer, Student, etc."
                />
                {errors.studyOrOccupation && <p className="text-sm text-red-500 mt-1">{errors.studyOrOccupation}</p>}
              </div>
            </div>
          </motion.div>
        )}

        {step > 0 && step <= phasePrompts.length && (
          <motion.div
            key={`prompt-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                {phasePrompts[step - 1].question}
              </h2>
            </div>

            {phasePrompts[step - 1].type === 'emotion' ? (
              <EmotionSelector
                selectedEmotions={formData.responses[phasePrompts[step - 1].id] || []}
                onSelect={(emotions) => setFormData({
                  ...formData,
                  responses: { ...formData.responses, [phasePrompts[step - 1].id]: emotions }
                })}
              />
            ) : (
              <>
                <textarea
                  value={formData.responses[phasePrompts[step - 1].id] || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    responses: { ...formData.responses, [phasePrompts[step - 1].id]: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
                  placeholder="Type your answer here..."
                />
                <SuggestionRow
                  suggestions={phasePrompts[step - 1].suggestions}
                  onSelect={(suggestion) => setFormData({
                    ...formData,
                    responses: { ...formData.responses, [phasePrompts[step - 1].id]: suggestion }
                  })}
                />
              </>
            )}
          </motion.div>
        )}

        {step > phasePrompts.length && (
          <motion.div
            key="review"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <CheckCircle className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-3xl font-bold">You're all set!</h2>
            <p className="text-muted-foreground">Ready to discover your phase?</p>
            
            {errors.submit && (
              <p className="text-red-500">{errors.submit}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {step < totalSteps - 1 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:shadow-lg transition-all"
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Discover My Phase'}
            <Sparkles className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}