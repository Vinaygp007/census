'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Eye, EyeOff, TrendingUp, Users, MapPin, Clock, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function RevealSection() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const controls = useAnimation()

  const stats = [
    { icon: Users, label: 'Most Common Phase', value: 'Chalta hai', color: 'from-blue-500 to-cyan-500', emoji: '🤷‍♂️', gradient: 'from-blue-500/20 to-cyan-500/20' },
    { icon: TrendingUp, label: 'Peak Emotion', value: 'Hopeful', color: 'from-emerald-500 to-green-500', emoji: '🌟', gradient: 'from-emerald-500/20 to-green-500/20' },
    { icon: MapPin, label: 'Top City', value: 'Mumbai', color: 'from-purple-500 to-pink-500', emoji: '🏙️', gradient: 'from-purple-500/20 to-pink-500/20' },
    { icon: Clock, label: 'Peak Time', value: '9 PM - 11 PM', color: 'from-orange-500 to-rose-500', emoji: '⏰', gradient: 'from-orange-500/20 to-rose-500/20' },
  ]

  const handleReveal = () => {
    setIsRevealed(true)
    // Create particle explosion
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 1000)
  }

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-blue-950 via-purple-950 to-slate-950">
      {/* Animated Background Lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${20 * (i + 1)}%`,
              background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)',
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                border: '1px solid rgba(99, 102, 241, 0.3)',
                boxShadow: '0 0 40px rgba(99, 102, 241, 0.3)',
              }}
            >
              <Eye className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Real-Time Insights
              </span>
            </motion.div>

            <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              <span className="block text-white mb-4">Discover What</span>
              <span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.5))',
                }}
              >
                India is Feeling
              </span>
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              A live snapshot of our collective emotional journey
            </p>
          </motion.div>

          {/* Interactive Reveal Card */}
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Blur Overlay with Particles */}
            <motion.div 
              className="absolute inset-0 z-20 flex items-center justify-center"
              animate={{
                opacity: isRevealed ? 0 : 1,
                pointerEvents: isRevealed ? 'none' : 'auto'
              }}
              transition={{ duration: 0.8 }}
              style={{
                backdropFilter: 'blur(20px)',
                background: 'rgba(15, 23, 42, 0.8)',
              }}
            >
              {/* Particles */}
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x: particle.x * 5,
                    y: particle.y * 5,
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              ))}

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleReveal}
                className="relative px-12 py-6 rounded-full overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                  boxShadow: '0 30px 60px rgba(99, 102, 241, 0.5), 0 0 60px rgba(168, 85, 247, 0.4)',
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                  }}
                />
                <span className="relative z-10 flex items-center gap-3 text-white font-bold text-xl">
                  <Eye className="w-7 h-7" />
                  Reveal the Magic
                  <Sparkles className="w-7 h-7" />
                </span>
              </motion.button>
            </motion.div>

            {/* Content */}
            <div className="p-12 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    animate={isRevealed ? { 
                      opacity: 1, 
                      scale: 1, 
                      rotateY: 0,
                    } : {}}
                    transition={{ 
                      delay: index * 0.15, 
                      duration: 0.6,
                      type: "spring",
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      z: 50,
                    }}
                    className="group relative p-8 rounded-2xl backdrop-blur-xl cursor-pointer"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Gradient Overlay */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <motion.div 
                          className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color}`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          style={{
                            boxShadow: `0 10px 30px ${stat.color.includes('blue') ? 'rgba(59, 130, 246, 0.3)' : 'rgba(168, 85, 247, 0.3)'}`,
                          }}
                        >
                          <stat.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <motion.span 
                          className="text-5xl"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        >
                          {stat.emoji}
                        </motion.span>
                      </div>
                      
                      <div className={`text-4xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-br ${stat.color}`}>
                        {stat.value}
                      </div>
                      <div className="text-sm font-semibold text-blue-200 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>

                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                      }}
                      animate={{
                        x: ['-200%', '200%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-12 flex items-center justify-center gap-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsRevealed(false)}
                    className="px-6 py-3 rounded-full backdrop-blur-sm font-semibold text-white"
                    style={{
                      background: 'rgba(99, 102, 241, 0.2)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <EyeOff className="w-4 h-4" />
                      Hide Insights
                    </span>
                  </motion.button>

                  <Link href="/reveal">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-full font-bold text-white"
                      style={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                        boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
                      }}
                    >
                      Explore Full Map →
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}