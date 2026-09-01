import { motion } from 'framer-motion'
import { Rocket, Target, Globe, Code2 } from 'lucide-react'

export default function About() {
  return (
    <div className="pt-32 pb-24 container-app">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-20"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
          <Rocket className="w-4 h-4" /> Welcome to QRVerse
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
          Simpler, Smarter QR Codes
        </h1>
        <p className="text-lg text-white/60 leading-relaxed">
          QRVerse is a modern QR Code Generator platform designed to help individuals, students, businesses, and creators generate professional QR codes instantly.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 text-center"
        >
          <div className="w-12 h-12 mx-auto rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-4">Our Mission</h3>
          <p className="text-white/60">
            To make QR technology simple, beautiful, and accessible for everyone.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 text-center"
        >
          <div className="w-12 h-12 mx-auto rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-4">Our Vision</h3>
          <p className="text-white/60">
            To become the world's most trusted QR platform.
          </p>
        </motion.div>
      </div>

      {/* Features */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose QRVerse</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            'Dynamic QR Codes',
            'Custom QR Design',
            'QR Analytics',
            'Bulk Generation',
            'Cloud Storage'
          ].map((feat, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <span className="font-semibold text-sm">{feat}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-card p-10 mb-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-50" />
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">1M+</div>
            <div className="text-white/60 font-medium">QR Codes Generated</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-secondary mb-2">100K+</div>
            <div className="text-white/60 font-medium">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent mb-2">50+</div>
            <div className="text-white/60 font-medium">Countries</div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Meet the founder */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 flex items-center gap-6"
        >
          <div className="w-24 h-24 rounded-full bg-white/10 flex-shrink-0 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
            <Code2 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">Meet The Founder</h3>
            <div className="text-2xl font-bold mb-1">Loganathan M</div>
            <p className="text-white/50">Founder & Developer</p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <h3 className="text-xl font-bold mb-6">Timeline</h3>
          <div className="space-y-6 border-l-2 border-white/10 ml-3 pl-6 mt-4">
            {[
              { year: '2026', text: 'QRVerse Started' },
              { year: '2027', text: '100K Users' },
              { year: '2028', text: 'Global Expansion' },
            ].map((item, i) => (
              <div key={i} className="relative">
                {/* Dot */}
                <div className="absolute -left-[35px] top-2 w-5 h-5 rounded-full border-2 border-white/10 bg-surface flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                {/* Content */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                  <div className="font-bold text-primary mb-1">{item.year}</div>
                  <div className="text-sm text-white/80">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
