import { motion } from 'framer-motion'
import { Globe2 } from 'lucide-react'

export default function GDPR() {
  return (
    <div className="pt-32 pb-24 container-app max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary">
          <Globe2 className="w-5 h-5" />
          <span className="font-semibold uppercase tracking-wider text-sm">Legal Document</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">GDPR Compliance</h1>
        <p className="text-white/60 text-lg">Information for EU Citizens</p>
      </motion.div>

      <div className="glass-card p-8 md:p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="space-y-12 relative z-10">
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Your Data Rights</h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>Under the General Data Protection Regulation (GDPR), if you are a resident of the European Economic Area (EEA), you have certain data protection rights. QRVerse aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Download Your Data</h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>You have the right to request a copy of your Personal Data in a structured, machine-readable format. You can request your data export by navigating to Account Settings &gt; Data Export.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Delete Your Data</h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>The right to erasure ("right to be forgotten"): You have the right to request that we delete your Personal Data under certain conditions. Deleting your account will automatically trigger a full purge of your data within 30 days.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Consent Management</h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>You have the right to withdraw consent at any time where QRVerse relied on your consent to process your personal information.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Data Protection Officer</h2>
            <div className="text-white/70 leading-relaxed text-lg bg-white/5 p-6 rounded-2xl border border-white/10 mt-6">
              <p>If you have questions regarding your data privacy, you can contact our Data Protection Officer at <strong className="text-white">support.loga@gmail.com</strong>.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
