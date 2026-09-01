import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

export default function Terms() {
  return (
    <div className="pt-32 pb-24 container-app max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary">
          <FileText className="w-5 h-5" />
          <span className="font-semibold uppercase tracking-wider text-sm">Legal Document</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Terms of Service</h1>
        <p className="text-white/60 text-lg">Last updated: October 2026</p>
      </motion.div>

      <div className="glass-card p-8 md:p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="space-y-12 relative z-10">
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary text-sm font-bold">1</span>
              Account Rules
            </h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>You must be at least 13 years old to use our service. You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary text-sm font-bold">2</span>
              Acceptable Use
            </h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>You agree not to use the service to generate QR codes that link to malicious software, phishing websites, illegal content, or any material that infringes on intellectual property rights.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary text-sm font-bold">3</span>
              User Responsibilities
            </h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>You retain all rights to the data you embed in your QR codes. However, by using our dynamic QR codes, you grant us the right to process the URL routing and collect scan analytics on your behalf.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary text-sm font-bold">4</span>
              Subscription Policy
            </h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>Certain parts of the service are billed on a subscription basis ("Premium"). You will be billed in advance on a recurring and periodic basis (monthly or annually).</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary text-sm font-bold">5</span>
              Refund Policy
            </h2>
            <div className="text-white/70 leading-relaxed text-lg">
              <p>Except when required by law, paid subscription fees are non-refundable. Certain refund requests may be considered by QRVerse on a case-by-case basis.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary text-sm font-bold">6</span>
              Termination Policy
            </h2>
            <div className="text-white/70 leading-relaxed text-lg bg-white/5 p-6 rounded-2xl border border-white/10 mt-6">
              <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
