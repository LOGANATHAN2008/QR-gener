import { motion } from 'framer-motion'
import { FileText, Book, Code, Settings, ChevronRight } from 'lucide-react'

const TOPICS = [
  { title: 'Getting Started', icon: Book, items: ['Quick Start Guide', 'Account Setup', 'Billing & Plans'] },
  { title: 'Create QR Code', icon: FileText, items: ['Supported Data Types', 'Dynamic vs Static', 'Bulk Creation'] },
  { title: 'Customize QR', icon: Settings, items: ['Logo Integration', 'Color Gradients', 'Shape Styling'] },
  { title: 'Analytics', icon: Code, items: ['Tracking Scans', 'Location Data', 'Exporting Reports'] },
]

export default function Docs() {
  return (
    <div className="pt-32 pb-24 container-app">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Documentation</h1>
        <p className="text-white/60 text-lg">Everything you need to know about using QRVerse.</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/4">
          <div className="glass-card p-6 sticky top-24">
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Getting Started', 'Create QR Code', 'Customize QR', 'Download QR', 'Analytics Guide', 'API Guide', 'Account Settings'].map((link) => (
                <li key={link}>
                  <button className="text-sm text-white/60 hover:text-primary transition-colors text-left w-full">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:w-3/4 space-y-8">
          <div className="glass-card p-8 bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-bold mb-4">Welcome to QRVerse Docs</h2>
            <p className="text-white/70 mb-6 leading-relaxed">
              QRVerse provides a comprehensive suite of tools to create, manage, and track QR codes. Whether you're a small business owner creating a simple menu or a developer integrating our API, you'll find everything you need here.
            </p>
            <button className="btn-primary">Read the Quick Start Guide</button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {TOPICS.map((topic, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={topic.title}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <topic.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{topic.title}</h3>
                </div>
                <ul className="space-y-3">
                  {topic.items.map(item => (
                    <li key={item} className="flex items-center justify-between text-sm text-white/60 hover:text-white cursor-pointer group">
                      <span>{item}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
