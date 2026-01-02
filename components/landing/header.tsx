'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Take Census', href: '/participate' },
    { name: "India's Phase Map", href: '/reveal' },
    { name: 'About', href: '/about' },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between"
          >
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="flex items-center gap-3 cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="relative"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.6 }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                      boxShadow: '0 10px 40px rgba(99, 102, 241, 0.6)',
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                    
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(135deg, transparent, rgba(255,255,255,0.5), transparent)',
                      }}
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </motion.div>
                
                <div className="text-xl font-black">
                  <motion.span
                    animate={{
                      color: isScrolled ? '#ffffff' : '#0f172a'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Phase{' '}
                  </motion.span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Census
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-5 py-2.5 rounded-xl text-sm font-bold transition-colors group"
                    animate={{
                      color: isScrolled ? '#ffffff' : '#0f172a'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {link.name}
                    
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 -z-10"
                      style={{
                        background: isScrolled 
                          ? 'rgba(99, 102, 241, 0.2)' 
                          : 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                  </motion.button>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link href="/participate">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-7 py-3 rounded-xl font-bold text-sm text-white overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    boxShadow: '0 10px 40px rgba(99, 102, 241, 0.5)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <span className="relative z-10">Get Started</span>
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl"
              animate={{
                color: isScrolled ? '#ffffff' : '#0f172a',
                background: isScrolled 
                  ? 'rgba(99, 102, 241, 0.2)' 
                  : 'rgba(255, 255, 255, 0.8)',
              }}
              style={{
                backdropFilter: 'blur(10px)',
              }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </motion.nav>
        </div>

        {/* Scrolled Background - White at top, Dark when scrolled */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isScrolled ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, transparent 100%)',
            backdropFilter: 'blur(10px)',
          }}
        />
        
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
        />
      </header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
        }}
        className="fixed inset-x-4 top-28 z-40 md:hidden"
      >
        <div
          className="rounded-2xl p-6 space-y-2"
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
          }}
        >
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20,
                }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-left px-6 py-4 rounded-xl font-semibold text-white"
                style={{
                  background: 'rgba(99, 102, 241, 0.1)',
                }}
              >
                {link.name}
              </motion.button>
            </Link>
          ))}
          
          <Link href="/participate">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : -20,
              }}
              transition={{ delay: navLinks.length * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full mt-4 px-6 py-4 rounded-xl font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                boxShadow: '0 8px 32px rgba(99, 102, 241, 0.5)',
              }}
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}