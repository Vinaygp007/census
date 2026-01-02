'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Heart, Mail, Twitter, Instagram, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  const footerLinks = {
    product: [
      { name: 'Take Census', href: '/participate' },
      { name: "India's Phase Map", href: '/reveal' },
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
    ],
    support: [
      { name: 'Help Center', href: '/support' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact Us', href: '/support' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
  ]

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/">
              <motion.div
                className="flex items-center gap-3 mb-6 cursor-pointer group"
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)',
                  }}
                >
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black">
                    <span className="text-white">Phase </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      Census
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
            
            <p className="text-blue-200 mb-6 leading-relaxed">
              India's first emotional census capturing the collective mood through our most relatable phrases.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl backdrop-blur-sm transition-all"
                  style={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-blue-400" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="text-blue-200 hover:text-white transition-colors cursor-pointer inline-block"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="text-blue-200 hover:text-white transition-colors cursor-pointer inline-block"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="text-blue-200 hover:text-white transition-colors cursor-pointer inline-block"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 p-8 rounded-3xl backdrop-blur-xl"
          style={{
            background: 'rgba(99, 102, 241, 0.05)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
          }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Stay Updated
            </h3>
            <p className="text-blue-200 mb-6">
              Get the latest insights on India's emotional journey
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400/50 transition-colors"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full font-bold text-white whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
                }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)',
          }}
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-blue-200">
            <span>© 2026 Phase Census.</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-pink-500 fill-current" /> in India
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-blue-200">
            <span>Powered by</span>
            <a
              href="https://guisedup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-all"
            >
              Guised Up
            </a>
          </div>
        </div>
      </div>

      {/* Glow Effect at Bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent)',
          boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
        }}
      />
    </footer>
  )
}