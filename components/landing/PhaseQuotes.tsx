'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { popularPhases } from '@/lib/phases'
import { Quote, Sparkles, Heart } from 'lucide-react'
import { useRef, useState } from 'react'

export default function PhaseQuotes() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-slate-950 to-blue-950">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 1 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8"
            style={{
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              boxShadow: '0 0 30px rgba(99, 102, 241, 0.2)',
            }}
          >
            <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
            <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Popular Phases
            </span>
          </motion.div>

          <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="block text-white mb-4">India's Most</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
              style={{
                textShadow: '0 0 60px rgba(168, 85, 247, 0.5)',
              }}
            >
              Relatable Phrases
            </span>
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            The words that define us, unite us, and tell our stories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {popularPhases.map((phase, index) => (
            <MagneticCard
              key={index}
              phase={phase}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* Giant Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-32 relative"
        >
          <div className="text-center">
            <motion.div
              className="text-8xl md:text-[12rem] font-black leading-none"
              style={{
                WebkitTextStroke: '2px rgba(99, 102, 241, 0.3)',
                color: 'transparent',
              }}
              animate={{
                WebkitTextStroke: [
                  '2px rgba(99, 102, 241, 0.3)',
                  '2px rgba(168, 85, 247, 0.5)',
                  '2px rgba(99, 102, 241, 0.3)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Yeh Bhi
            </motion.div>
            <motion.div
              className="text-8xl md:text-[12rem] font-black leading-none mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.5))',
              }}
            >
              Theek Hai
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function MagneticCard({ phase, index, isHovered, onHover, onLeave }: {
  phase: string
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative h-full cursor-pointer"
    >
      <div 
        className="relative h-full p-10 rounded-3xl backdrop-blur-xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered 
            ? '0 30px 60px rgba(99, 102, 241, 0.3), 0 0 60px rgba(168, 85, 247, 0.2)'
            : '0 8px 32px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
          }}
        />

        {/* Quote Icon with Glow */}
        <motion.div
          className="absolute top-6 right-6"
          animate={{
            rotate: isHovered ? 15 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
        >
          <Quote className="w-16 h-16 text-blue-400/20 group-hover:text-purple-400/30 transition-colors" />
        </motion.div>
        
        <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
          <motion.h3 
            className="text-3xl md:text-4xl font-bold mb-6 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300"
            style={{
              textShadow: isHovered ? '0 0 30px rgba(99, 102, 241, 0.5)' : 'none',
            }}
          >
            "{phase}"
          </motion.h3>
          
          <motion.div 
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: '3rem' }}
            animate={{ width: isHovered ? '100%' : '3rem' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              boxShadow: isHovered ? '0 0 20px rgba(99, 102, 241, 0.6)' : 'none',
            }}
          />

          {/* Sparkle Effect */}
          {isHovered && (
            <motion.div
              className="absolute -top-4 -right-4"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 180 }}
              exit={{ scale: 0 }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" fill="currentColor" />
            </motion.div>
          )}
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'linear-gradient(115deg, transparent 20%, rgba(255, 255, 255, 0.1) 50%, transparent 80%)',
          }}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ 
            x: isHovered ? '100%' : '-100%',
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  )
}