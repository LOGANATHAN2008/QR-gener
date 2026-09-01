import { motion } from 'framer-motion'
import { Mail, MessageSquare, MapPin, Instagram, Linkedin, Github, Twitter, Send } from 'lucide-react'

export default function Contact() {
  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 container-app px-4 sm:px-6 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-10 md:mb-16"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-white/60 text-sm md:text-base">We'd love to hear from you. Please fill out this form or get in touch using the information below.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass-card p-5 sm:p-6 md:p-8"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-6">Send a Message</h2>
          <form className="space-y-5 md:space-y-6" onSubmit={e => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">Name</label>
                <input type="text" className="input-glass w-full" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">Email</label>
                <input type="email" className="input-glass w-full" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">Subject</label>
              <input type="text" className="input-glass w-full" placeholder="How can we help?" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">Message</label>
              <textarea rows={5} className="input-glass w-full resize-none" placeholder="Your message here..." />
            </div>
            <button className="btn-primary w-full flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </motion.div>

        <div className="space-y-4 md:space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-5 md:p-6 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Support Email</h3>
              <p className="text-sm text-white/60">support.loga@gmail.com</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-5 md:p-6 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Business Email</h3>
              <p className="text-sm text-white/60">support.loga@gmail.com</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-5 md:p-6"
          >
            <h3 className="font-bold mb-4">Social Media</h3>
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-2 gap-3">
              {[
                { name: 'Instagram', icon: Instagram },
                { name: 'LinkedIn', icon: Linkedin },
                { name: 'GitHub', icon: Github },
                { name: 'Twitter/X', icon: Twitter },
              ].map(social => (
                <button key={social.name} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium text-white/70">
                  <social.icon className="w-4 h-4 shrink-0" /> <span className="truncate">{social.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
