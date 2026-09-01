import { motion } from 'framer-motion'
import { LifeBuoy, Search, ChevronDown, MessageCircle } from 'lucide-react'

const FAQS = [
  { q: 'How to create a QR code?', a: 'Simply go to our Generator page, select your desired data type (URL, Text, WiFi, etc.), enter the details, customize the design, and hit download!' },
  { q: 'How to add a logo to my QR code?', a: 'In the Generator page, click on the "Design" tab and scroll down to the "Logo / Image" section. Click "Upload Logo" to embed your brand.' },
  { q: 'How to track scans?', a: 'You need to create a Dynamic QR code. Once created, head over to the Analytics dashboard to view scan locations, devices, and total scan counts in real-time.' },
  { q: 'How to upgrade my plan?', a: 'Go to the Pricing page or your Account Settings, select the plan that fits your needs, and follow the checkout process.' },
  { q: 'How to delete my account?', a: 'You can delete your account permanently from the Profile settings page under the "Danger Zone" section.' },
]

export default function HelpCenter() {
  return (
    <div className="pt-32 pb-24 container-app max-w-3xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-6">
          <LifeBuoy className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold mb-6">How can we help?</h1>
        <div className="relative max-w-xl mx-auto">
          <input 
            type="text" 
            placeholder="Search for answers..." 
            className="input-glass w-full pl-12 py-4 text-lg rounded-2xl"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-6 h-6" />
        </div>
      </motion.div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Popular Questions</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <motion.details 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="glass-card group"
            >
              <summary className="flex items-center justify-between p-6 font-semibold cursor-pointer list-none">
                {faq.q}
                <ChevronDown className="w-5 h-5 text-white/40 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-6 pt-0 text-white/60 leading-relaxed border-t border-white/5">
                {faq.a}
              </div>
            </motion.details>
          ))}
        </div>
      </div>

      <div className="glass-card p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
        <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
        <p className="text-white/60 mb-8 max-w-lg mx-auto">
          Our support team is available 24/7 to help you with any issues or questions you might have.
        </p>
        <a href="https://www.loganathanm.in/#contact" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Create Support Ticket
        </a>
      </div>
    </div>
  )
}
