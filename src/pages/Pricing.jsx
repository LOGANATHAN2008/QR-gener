// src/pages/Pricing.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Star, Building2, ArrowRight } from 'lucide-react'
import Footer from '../components/layout/Footer'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    icon: '🎯',
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: '#30D158',
    description: 'Perfect for personal projects and testing.',
    cta: 'Get Started Free',
    popular: false,
    features: [
      '50 Static QR codes/month',
      'Basic customization (colors)',
      'PNG & JPG export',
      '11 QR code types',
      'Basic analytics',
      'Community support',
    ],
    notIncluded: [
      'Dynamic QR codes',
      'SVG & PDF export',
      'Logo embedding',
      'Scan tracking',
      'API access',
      'Custom domain',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: '⚡',
    monthlyPrice: 12,
    yearlyPrice: 8,
    color: '#007AFF',
    description: 'For professionals and growing businesses.',
    cta: 'Start Pro Trial',
    popular: true,
    features: [
      'Unlimited QR codes',
      'Full customization (gradients, logos)',
      'PNG, JPG, SVG & PDF export',
      '11 QR code types',
      'Advanced analytics & tracking',
      'Dynamic QR codes',
      'QR expiry & scheduling',
      'Password protected QR',
      'Priority support',
      'API access (1K calls/day)',
    ],
    notIncluded: [
      'Bulk generation',
      'Custom domain',
      'Team collaboration',
      'Unlimited API calls',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: '🏢',
    monthlyPrice: 49,
    yearlyPrice: 36,
    color: '#BF5AF2',
    description: 'For large teams and enterprise-scale operations.',
    cta: 'Contact Sales',
    popular: false,
    features: [
      'Everything in Pro',
      'Bulk QR generation',
      'Custom domain & white-label',
      'Team collaboration (unlimited seats)',
      'Unlimited API calls',
      'Priority + dedicated support',
      'SLA guarantee',
      'Custom integrations',
      'SAML SSO',
      'Advanced security & audit logs',
    ],
    notIncluded: [],
  },
]

const COMPARISON_FEATURES = [
  { feature: 'QR Codes per Month', free: '50', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Dynamic QR Codes', free: false, pro: true, enterprise: true },
  { feature: 'Export Formats', free: 'PNG, JPG', pro: 'PNG, JPG, SVG, PDF', enterprise: 'All formats' },
  { feature: 'Logo Embedding', free: false, pro: true, enterprise: true },
  { feature: 'Analytics', free: 'Basic', pro: 'Advanced', enterprise: 'Full + Export' },
  { feature: 'Scan Tracking', free: false, pro: true, enterprise: true },
  { feature: 'QR Expiry', free: false, pro: true, enterprise: true },
  { feature: 'Password Protection', free: false, pro: true, enterprise: true },
  { feature: 'API Access', free: false, pro: '1K calls/day', enterprise: 'Unlimited' },
  { feature: 'Bulk Generation', free: false, pro: false, enterprise: true },
  { feature: 'Custom Domain', free: false, pro: false, enterprise: true },
  { feature: 'Team Collaboration', free: false, pro: false, enterprise: true },
  { feature: 'Support', free: 'Community', pro: 'Priority', enterprise: 'Dedicated' },
]

function PlanCard({ plan, yearly, index }) {
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className={`relative glass-card p-7 flex flex-col ${plan.popular ? 'border-primary/40 ring-1 ring-primary/20' : ''}`}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <div className="px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-glow-sm whitespace-nowrap">
            ✨ Most Popular
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <div className="text-3xl mb-3">{plan.icon}</div>
        <h3 className="text-xl font-black text-white mb-1">{plan.name}</h3>
        <p className="text-xs text-white/50">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-end gap-1">
          <span className="text-5xl font-black" style={{ color: plan.color }}>
            ${price}
          </span>
          <span className="text-white/40 text-sm mb-2">/mo{yearly && price > 0 ? ' (billed yearly)' : ''}</span>
        </div>
        {yearly && plan.monthlyPrice > 0 && (
          <p className="text-xs text-accent mt-1">
            Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
          </p>
        )}
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.97 }}
        className={`w-full py-3.5 rounded-2xl font-semibold text-sm mb-6 transition-all ${
          plan.popular
            ? 'btn-primary'
            : 'border border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/25'
        }`}
        style={!plan.popular ? {} : {}}
      >
        {plan.cta}
      </motion.button>

      {/* Features */}
      <div className="space-y-2.5 flex-1">
        {plan.features.map((feat) => (
          <div key={feat} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${plan.color}20` }}>
              <Check className="w-2.5 h-2.5" style={{ color: plan.color }} />
            </div>
            <span className="text-xs text-white/70">{feat}</span>
          </div>
        ))}
        {plan.notIncluded.map((feat) => (
          <div key={feat} className="flex items-start gap-2.5 opacity-30">
            <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/10">
              <span className="text-white text-[8px] font-bold">—</span>
            </div>
            <span className="text-xs text-white/40">{feat}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  const [yearly, setYearly] = useState(true)

  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-20 px-6">
        <div className="container-app">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
              PRICING
            </span>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Simple, <span className="text-gradient">transparent</span> pricing
            </h1>
            <p className="text-white/50 max-w-lg mx-auto mb-8">
              Start free. Scale as you grow. No hidden fees.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center glass-card p-1.5 rounded-2xl gap-1">
              <button
                onClick={() => setYearly(false)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${!yearly ? 'bg-white/10 text-white' : 'text-white/40'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setYearly(true)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${yearly ? 'bg-white/10 text-white' : 'text-white/40'}`}
              >
                Yearly
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent font-bold">-33%</span>
              </button>
            </div>
          </motion.div>

          {/* Plan Cards */}
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-20">
            {PLANS.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} yearly={yearly} index={i} />
            ))}
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card overflow-hidden max-w-5xl mx-auto"
          >
            <div className="p-6 border-b border-white/[0.08]">
              <h3 className="text-xl font-black text-white">Feature Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-wide w-1/2">Feature</th>
                    {PLANS.map(p => (
                      <th key={p.id} className="px-4 py-4 text-center text-sm font-bold" style={{ color: p.color }}>{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map(({ feature, free, pro, enterprise }, i) => (
                    <tr key={feature} className={`border-b border-white/[0.04] ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                      <td className="px-6 py-3.5 text-sm text-white/60">{feature}</td>
                      {[free, pro, enterprise].map((val, j) => (
                        <td key={j} className="px-4 py-3.5 text-center">
                          {typeof val === 'boolean' ? (
                            val
                              ? <Check className="w-4 h-4 text-accent mx-auto" />
                              : <span className="text-white/20 text-lg">—</span>
                          ) : (
                            <span className="text-xs font-semibold text-white/70">{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Enterprise CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-2xl mx-auto text-center glass-card p-10"
          >
            <Building2 className="w-10 h-10 text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-black mb-3">Need a custom plan?</h3>
            <p className="text-white/50 text-sm mb-6">
              Talk to our sales team for volume pricing, custom integrations, and dedicated support.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="btn-primary inline-flex items-center gap-2"
            >
              Contact Enterprise Sales <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
