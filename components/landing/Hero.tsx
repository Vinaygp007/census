'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 100])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
              radial-gradient(circle at ${30 + mousePosition.x * 0.5}% ${70 + mousePosition.y * 0.5}%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
              radial-gradient(circle at ${70 + mousePosition.x * 0.3}% ${30 + mousePosition.y * 0.3}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
            `
          }}
        />
      </div>

      {/* Floating Grid */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: y1 }}
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          y: y1,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          y: y2,
        }}
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 relative"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              boxShadow: '0 0 40px rgba(99, 102, 241, 0.2), inset 0 0 20px rgba(99, 102, 241, 0.1)',
            }}
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className="w-5 h-5 text-blue-400" />
            </motion.div>
            <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              India's First Phase Census
            </span>
            <motion.div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{
                background: 'rgba(99, 102, 241, 0.2)',
              }}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(99, 102, 241, 0.4)',
                  '0 0 0 10px rgba(99, 102, 241, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-bold text-blue-400">100K+ Live</span>
            </motion.div>
          </motion.div>

          {/* Main Heading with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-7xl md:text-9xl font-black leading-[0.9] tracking-tight">
              <motion.span 
                className="block text-white mb-6"
                style={{
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.5)',
                }}
              >
                What
              </motion.span>
              <motion.span 
                className="block relative inline-block"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(99, 102, 241, 0.5)',
                    '0 0 60px rgba(168, 85, 247, 0.8)',
                    '0 0 20px rgba(99, 102, 241, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(99, 102, 241, 0.5))',
                  }}
                >
                  Phase
                </span>
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 blur-3xl opacity-50"
                  style={{
                    background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.span>
              <motion.span 
                className="block text-white mt-6"
                style={{
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.5)',
                }}
              >
                Are You In?
              </motion.span>
            </h1>
          </motion.div>

          {/* Subheading with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Join <span className="font-bold text-white">millions of Indians</span> discovering their emotional state through{' '}
              <span className="relative inline-block">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  our most relatable phrases
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </p>
          </motion.div>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            <Link href="/participate">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 rounded-full overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                  boxShadow: '0 20px 60px rgba(99, 102, 241, 0.4), 0 0 40px rgba(168, 85, 247, 0.3)',
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #6366f1 100%)',
                  }}
                  initial={{ x: '100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-3 text-white font-bold text-lg">
                  <Zap className="w-5 h-5" fill="white" />
                  Discover Your Phase
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>

            <Link href="/reveal">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-full font-bold text-lg text-white backdrop-blur-sm"
                style={{
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '2px solid rgba(99, 102, 241, 0.3)',
                  boxShadow: '0 0 30px rgba(99, 102, 241, 0.2)',
                }}
              >
                Explore Phase Map
              </motion.button>
            </Link>
          </motion.div>

          {/* 3D Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: 'Participants', value: '100K+', icon: '👥', color: 'from-blue-500 to-cyan-500' },
              { label: 'Unique Phases', value: '50+', icon: '✨', color: 'from-purple-500 to-pink-500' },
              { label: 'Cities', value: '200+', icon: '🏙️', color: 'from-pink-500 to-rose-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                }}
                className="group relative p-8 rounded-3xl backdrop-blur-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Gradient Overlay on Hover */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="text-5xl mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className={`text-4xl md:text-5xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-br ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-blue-200 tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                  }}
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "linear",
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-blue-400/50 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-blue-400 rounded-full"
            />
          </div>
          <span className="text-xs text-blue-400 font-medium">Scroll to explore</span>
        </motion.div>
      </motion.div>
    </section>
  )
}