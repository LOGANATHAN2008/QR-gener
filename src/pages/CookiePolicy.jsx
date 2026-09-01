import { motion } from 'framer-motion'
import { Cookie } from 'lucide-react'

export default function CookiePolicy() {
  return (
    <div className="pt-32 pb-24 container-app max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary">
          <Cookie className="w-5 h-5" />
          <span className="font-semibold uppercase tracking-wider text-sm">Legal Document</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Cookie Policy</h1>
        <p className="text-white/60 text-lg">Last updated: October 2026</p>
      </motion.div>

      <div className="glass-card p-8 md:p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="space-y-12 relative z-10">
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">What Are Cookies?</h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Why We Use Cookies?</h2>
            <div className="text-white/70 leading-relaxed text-lg space-y-4">
              <p>When you use and access QRVerse, we may place a number of cookies files in your web browser. We use cookies for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-primary">
                <li>To enable certain functions of the Service (e.g. keeping you logged in).</li>
                <li>To store your preferences (like your UI theme and QR code defaults).</li>
                <li>To provide analytics.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Analytics Cookies</h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>We use Google Analytics to track information on how the Service is used so that we can make improvements. We may also use analytics cookies to test new pages, features or new functionality of the Service to see how our users react to them.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Marketing Cookies</h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>We currently do not use marketing or advertising cookies on the QRVerse platform. Your data is not sold to third-party ad networks.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Managing Cookies</h2>
            <div className="text-white/70 leading-relaxed text-lg bg-white/5 p-6 rounded-2xl border border-white/10 mt-6">
              <p>If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
