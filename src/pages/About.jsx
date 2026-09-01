import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Target, Globe, Code2, CheckCircle2, QrCode } from 'lucide-react'

export default function About() {
  useEffect(() => {
    document.title = "About Loganathan QR – Professional QR Code Generator Platform"
  }, [])

  const features = [
    'Fast QR Code Generation',
    'Modern Apple-Inspired Interface',
    'Mobile Friendly Design',
    'Secure QR Creation',
    'High-Quality Downloads',
    'Advanced Customization',
    'Business Ready Features',
    'Student Friendly Platform',
    'Free and Easy to Use'
  ]

  const useCases = [
    'Website URLs', 'WiFi Networks', 'Contact Cards (vCard)',
    'WhatsApp Links', 'Email Addresses', 'Phone Numbers',
    'Social Media Profiles', 'Event Registrations', 'Business Promotions',
    'Digital Payments', 'Location Sharing'
  ]

  return (
    <div className="pt-28 md:pt-36 pb-24 container-app px-4 sm:px-6">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl mx-auto mb-20 md:mb-28"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20 backdrop-blur-md">
          <Rocket className="w-4 h-4" /> Welcome to Loganathan QR
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient leading-tight">
          Create Powerful QR Codes Instantly
        </h1>
        <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
          Loganathan QR is a modern QR Code Generator platform developed by Loganathan M. Generate beautiful, customizable, and professional QR codes for websites, WiFi, social media, contact cards, payments, events, and business use cases in seconds.
        </p>
      </motion.div>

      {/* About Section */}
      <div className="grid lg:grid-cols-2 gap-10 md:gap-16 mb-20 md:mb-28 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">About The Platform</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Welcome to Loganathan QR, a next-generation QR Code Generator platform built to simplify the way people create and share digital information.
            </p>
            <p>
              Founded by Loganathan M, Loganathan QR provides a fast, secure, and user-friendly solution for generating high-quality QR codes for personal, educational, and business purposes.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-10 bg-gradient-to-br from-primary/5 to-secondary/5"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <QrCode className="w-6 h-6 text-primary" />
            Supported Use Cases
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {useCases.map((useCase, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {useCase}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-20 md:mb-28">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-10 text-center group hover:border-primary/30 transition-colors"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Target className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-white/70 leading-relaxed">
            To make QR technology accessible, simple, and powerful for everyone.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 md:p-10 text-center group hover:border-purple-500/30 transition-colors"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Globe className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
          <p className="text-white/70 leading-relaxed">
            To become one of the most trusted QR code platforms globally by delivering innovative features, premium design, and reliable performance.
          </p>
        </motion.div>
      </div>

      {/* Features */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 md:mb-28"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Loganathan QR?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feat, i) => (
            <div key={i} className="glass-card p-5 flex items-center gap-4 hover:bg-white/5 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              <span className="font-medium text-white/90">{feat}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Founder & Stats */}
      <div className="grid lg:grid-cols-2 gap-10 md:gap-12 mb-20 md:mb-28">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Code2 className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <h3 className="text-sm font-bold text-primary mb-2 uppercase tracking-widest">About Founder</h3>
            <h2 className="text-3xl font-bold mb-6">Loganathan M</h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Loganathan M is a BCA student, web developer, UI designer, and technology enthusiast from India.
              </p>
              <p>
                Passionate about building innovative digital products, Loganathan focuses on creating modern web applications that combine functionality, simplicity, and excellent user experience.
              </p>
              <p>
                Through Loganathan QR, he aims to help students, professionals, businesses, and creators leverage QR technology efficiently.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-10 bg-gradient-to-br from-surface to-surface-lighter flex flex-col justify-center"
        >
          <h3 className="text-xl font-bold mb-8 text-center">Platform Impact</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="text-3xl font-bold text-primary mb-2">20+</div>
              <div className="text-sm text-white/60">Projects Completed</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="text-3xl font-bold text-secondary mb-2">1000+</div>
              <div className="text-sm text-white/60">Development Hours</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="text-3xl font-bold text-accent mb-2">10K+</div>
              <div className="text-sm text-white/60">Community Reach</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="text-3xl font-bold text-green-400 mb-2">India</div>
              <div className="text-sm text-white/60">Growing User Base</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center pb-10"
      >
        <p className="text-xl md:text-2xl font-medium italic text-white/80 mb-4">
          "Transforming Ideas into Digital Connections Through QR Technology."
        </p>
        <p className="text-primary font-semibold">— Loganathan M</p>
      </motion.div>
    </div>
  )
}
