'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Smartphone, Download, Sparkles, Zap, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/clarity'

export default function AppDownloadEasterEgg() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [500, 600], [0, 1])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleDownloadClick = () => {
    trackEvent('app_download_clicked', { location: 'easter_egg' })
    window.open('https://guisedup.com', '_blank')
  }

  if (!isVisible) return null

  return (
    <>
      {/* Floating Button */}
      <motion.div
        style={{ opacity }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDownloadClick}
          className="group relative"
        >
          {/* Pulsing rings */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              filter: 'blur(10px)',
            }}
          />
          
          {/* Button */}
          <div 
            className="relative flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl backdrop-blur-sm"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
              boxShadow: '0 10px 40px rgba(99, 102, 241, 0.5), 0 0 30px rgba(168, 85, 247, 0.3)',
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-white" fill="white" />
            </motion.div>
            <span className="font-bold text-white whitespace-nowrap">Try Guised Up</span>
            <Download className="w-5 h-5 text-white group-hover:translate-y-1 transition-transform" />
          </div>
        </motion.button>
      </motion.div>

      {/* Inline Section */}
      <section className="py-40 relative overflow-hidden bg-gradient-to-b from-slate-950 via-purple-950 to-blue-950">
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
            }}
          />
        </div>

        {/* Decorative Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              {/* Icon with Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 1 }}
                className="inline-flex items-center justify-center mb-8"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative"
                >
                  <div
                    className="w-24 h-24 rounded-3xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                      boxShadow: '0 20px 60px rgba(99, 102, 241, 0.4), 0 0 40px rgba(168, 85, 247, 0.3)',
                    }}
                  >
                    <Smartphone className="w-12 h-12 text-white" />
                  </div>
                  {/* Floating particles around icon */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-blue-400 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                      }}
                      animate={{
                        x: [0, Math.cos(i * 120 * Math.PI / 180) * 60],
                        y: [0, Math.sin(i * 120 * Math.PI / 180) * 60],
                        opacity: [1, 0],
                        scale: [1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                <span className="block text-white mb-3">Continue Your Journey</span>
                <span className="block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    on Guised Up
                  </span>
                </span>
              </h2>

              <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto leading-relaxed">
                Discover your phase, connect with like-minded people, and express yourself authentically every day
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadClick}
                  className="group px-10 py-5 rounded-full font-bold text-lg text-white flex items-center gap-3"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                    boxShadow: '0 20px 60px rgba(99, 102, 241, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)',
                  }}
                >
                  <Download className="w-5 h-5" />
                  Download Guised Up
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <a 
                  href="https://guisedup.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors font-semibold"
                >
                  Learn more →
                </a>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: '🎭',
                    title: 'Express Freely',
                    description: 'Share your phases without judgment',
                    color: 'from-blue-500 to-cyan-500',
                  },
                  {
                    icon: '🤝',
                    title: 'Find Your Tribe',
                    description: 'Connect with people in similar phases',
                    color: 'from-purple-500 to-pink-500',
                  },
                  {
                    icon: '📊',
                    title: 'Track Your Journey',
                    description: 'See how your phases evolve over time',
                    color: 'from-green-500 to-emerald-500',
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group relative p-8 rounded-3xl backdrop-blur-xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    {/* Gradient Overlay */}
                    <motion.div
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />

                    <div className="relative z-10">
                      <motion.div 
                        className="text-5xl mb-4"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-blue-200 leading-relaxed">
                        {feature.description}
                      </p>
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
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}