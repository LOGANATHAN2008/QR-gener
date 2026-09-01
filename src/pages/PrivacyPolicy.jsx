import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 container-app max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary">
          <Shield className="w-5 h-5" />
          <span className="font-semibold uppercase tracking-wider text-sm">Legal Document</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Privacy Policy</h1>
        <p className="text-white/60 text-lg">Last updated: October 2026</p>
      </motion.div>

      <div className="glass-card p-8 md:p-14 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="space-y-12 relative z-10">
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary text-sm font-bold">1</span>
              Information We Collect
            </h2>
            <div className="text-white/70 leading-relaxed space-y-4 text-lg">
              <p>When you use QRVerse, we may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-primary">
                <li><strong className="text-white">Account Information:</strong> Name, email address, and password.</li>
                <li><strong className="text-white">Usage Data:</strong> How you interact with our generator, IP addresses, browser types, and access times.</li>
                <li><strong className="text-white">QR Data:</strong> Data you embed within your QR codes.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary text-sm font-bold">2</span>
              How We Use Data
            </h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>The data we collect is used to provide, maintain, and improve our services. This includes authenticating users, generating analytics reports, and personalizing the user experience.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary text-sm font-bold">3</span>
              Cookies
            </h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>We use cookies and similar tracking technologies to track the activity on our service and hold certain information. For detailed information, please read our <a href="/cookie-policy" className="text-primary font-medium hover:underline">Cookie Policy</a>.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary text-sm font-bold">4</span>
              Data Security
            </h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. We strive to use commercially acceptable means to protect your Personal Data.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary text-sm font-bold">5</span>
              User Rights
            </h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>Depending on your location, you may have rights under GDPR or CCPA to access, correct, delete, or restrict the use of your personal data.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary text-sm font-bold">6</span>
              Account Deletion
            </h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>You can delete your account and all associated data at any time from your account settings. This action is irreversible.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary text-sm font-bold">7</span>
              Contact Information
            </h2>
            <div className="text-white/70 leading-relaxed text-lg bg-white/5 p-6 rounded-2xl border border-white/10 mt-6">
              <p>If you have any questions about this Privacy Policy, please contact our legal team directly at <strong className="text-white">support.loga@gmail.com</strong>.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
