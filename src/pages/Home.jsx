// src/pages/Home.jsx
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Zap, Globe, Smartphone, BarChart2, Shield, Layers,
  ChevronDown, ChevronRight, Star, ArrowRight, Sparkles,
  QrCode, Download, Palette, Wifi, Mail, MapPin, Users,
  TrendingUp, Check, Play
} from 'lucide-react'
import Footer from '../components/layout/Footer'
import { useCountUp, formatNumber } from '../hooks/useCountUp'

// ─── STATS DATA ───────────────────────────────────────────────────────────────
const STATS = [
  { label: 'QR Codes Generated', value: 2400000, suffix: '+', color: '#007AFF' },
  { label: 'Active Users', value: 87000, suffix: '+', color: '#5E5CE6' },
  { label: 'Countries Reached', value: 140, suffix: '', color: '#30D158' },
  { label: 'Scans per Day', value: 500000, suffix: '+', color: '#FF9F0A' },
]

// ─── FEATURES DATA ────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Palette,
    title: 'Full Customization',
    desc: 'Colors, gradients, logos, dot shapes, eye styles — design your perfect QR code.',
    color: '#007AFF',
  },
  {
    icon: BarChart2,
    title: 'Real-time Analytics',
    desc: 'Track scans, unique users, devices, and locations with live dashboards.',
    color: '#5E5CE6',
  },
  {
    icon: Download,
    title: 'Multi-format Export',
    desc: 'Download in PNG, JPG, SVG, or PDF. Print-ready high resolution outputs.',
    color: '#30D158',
  },
  {
    icon: Wifi,
    title: '11+ QR Types',
    desc: 'URL, WiFi, vCard, WhatsApp, Email, SMS, Location, Events and more.',
    color: '#FF9F0A',
  },
  {
    icon: Shield,
    title: 'Dynamic QR Codes',
    desc: 'Edit destination URLs anytime without reprinting. Expiry & password protection.',
    color: '#FF375F',
  },
  {
    icon: Layers,
    title: 'Bulk Generation',
    desc: 'Generate thousands of QR codes at once with our powerful batch API.',
    color: '#BF5AF2',
  },
]

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Marketing Director, TechFlow',
    avatar: '👩‍💼',
    rating: 5,
    text: "QRVerse transformed how we run our marketing campaigns. The analytics are incredibly detailed — we can see exactly which locations and devices are scanning our codes in real-time.",
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Restaurant Owner',
    avatar: '👨‍🍳',
    rating: 5,
    text: "We replaced all our physical menus with QR codes from QRVerse. The customization options let us match our brand perfectly. Scan tracking showed us a 40% increase in menu engagement!",
  },
  {
    name: 'Priya Patel',
    role: 'Event Manager, EventPro',
    avatar: '👩‍🎤',
    rating: 5,
    text: "The dynamic QR codes are game-changing. I update event details without reprinting anything. The PDF export is also perfect for print vendors.",
  },
  {
    name: 'David Kim',
    role: 'Startup Founder',
    avatar: '👨‍💻',
    rating: 5,
    text: "The API access and bulk generation saved us weeks of dev time. The QR quality and customization are unmatched in the market.",
  },
]

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Are the QR codes free?',
    a: "Yes! The Free plan lets you generate unlimited static QR codes with basic customization. Pro and Enterprise unlock dynamic codes, analytics, and advanced features.",
  },
  {
    q: 'What is a Dynamic QR Code?',
    a: "Dynamic QR codes let you change the destination URL after creation — without reprinting the code. They also include scan analytics, expiry dates, and password protection.",
  },
  {
    q: 'What file formats can I export?',
    a: "You can export QR codes as PNG, JPG, SVG (vector), and PDF. SVG is best for print as it scales infinitely without quality loss.",
  },
  {
    q: 'Can I add my logo to a QR code?',
    a: "Absolutely! Upload any PNG/JPG logo and it will be embedded in the center of your QR code. The error correction level is automatically set to ensure scannability.",
  },
  {
    q: 'Do QR codes expire?',
    a: "Static QR codes never expire. Dynamic QR codes on the Pro plan can optionally have an expiry date. After expiry, scanners see a custom page you define.",
  },
  {
    q: 'Is there an API available?',
    a: "Yes! The Enterprise plan includes full REST API access for QR generation, management, and analytics. Perfect for building QR functionality into your own products.",
  },
]

// ─── HERO QR DECORATION ───────────────────────────────────────────────────────
function HeroQR() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0], rotate: [0, 1, -1, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative"
    >
      {/* Outer glow ring */}
      <div className="absolute -inset-8 rounded-full bg-primary/10 blur-2xl animate-pulse-glow" />
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />

      {/* QR Card */}
      <div className="relative glass-card p-5 w-64 h-64 flex items-center justify-center">
        {/* Decorative corners */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-lg" />

        {/* Animated scan line */}
        <motion.div
          animate={{ top: ['8%', '92%', '8%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-4 right-4 h-0.5 pointer-events-none z-10"
          style={{ background: 'linear-gradient(90deg, transparent, #007AFF, transparent)' }}
        />

        {/* QR grid pattern */}
        <svg width="180" height="180" viewBox="0 0 180 180" className="relative z-0">
          {/* Top-left finder */}
          <rect x="10" y="10" width="50" height="50" rx="8" fill="none" stroke="#007AFF" strokeWidth="4" />
          <rect x="20" y="20" width="30" height="30" rx="4" fill="#007AFF" />
          {/* Top-right finder */}
          <rect x="120" y="10" width="50" height="50" rx="8" fill="none" stroke="#5E5CE6" strokeWidth="4" />
          <rect x="130" y="20" width="30" height="30" rx="4" fill="#5E5CE6" />
          {/* Bottom-left finder */}
          <rect x="10" y="120" width="50" height="50" rx="8" fill="none" stroke="#30D158" strokeWidth="4" />
          <rect x="20" y="130" width="30" height="30" rx="4" fill="#30D158" />
          {/* Data modules */}
          {[...Array(8)].map((_, r) =>
            [...Array(8)].map((_, c) =>
              Math.random() > 0.4 ? (
                <rect
                  key={`${r}-${c}`}
                  x={72 + c * 9}
                  y={10 + r * 9}
                  width={7}
                  height={7}
                  rx={2}
                  fill={`hsl(${210 + (r + c) * 10}, 80%, 60%)`}
                />
              ) : null
            )
          )}
          {[...Array(8)].map((_, r) =>
            [...Array(8)].map((_, c) =>
              Math.random() > 0.4 ? (
                <rect
                  key={`d-${r}-${c}`}
                  x={10 + c * 9}
                  y={72 + r * 9}
                  width={7}
                  height={7}
                  rx={2}
                  fill={`hsl(${210 + (r + c) * 10}, 80%, 60%)`}
                />
              ) : null
            )
          )}
          {/* Center modules */}
          {[...Array(6)].map((_, r) =>
            [...Array(6)].map((_, c) =>
              Math.random() > 0.5 ? (
                <rect
                  key={`m-${r}-${c}`}
                  x={72 + c * 9}
                  y={72 + r * 9}
                  width={7}
                  height={7}
                  rx={2}
                  fill={`hsl(${240 + (r * c) * 5}, 70%, 65%)`}
                />
              ) : null
            )
          )}
        </svg>
      </div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        className="absolute -top-4 -right-8 glass-card px-3 py-2 flex items-center gap-2 text-xs font-semibold"
      >
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-accent">2.4M QRs</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
        className="absolute -bottom-4 -left-8 glass-card px-3 py-2 flex items-center gap-2 text-xs font-semibold"
      >
        <TrendingUp className="w-3.5 h-3.5 text-primary" />
        <span className="text-white/80">500K scans/day</span>
      </motion.div>
    </motion.div>
  )
}

// ─── STAT ITEM ────────────────────────────────────────────────────────────────
function StatItem({ label, value, suffix, color }) {
  const { count, ref } = useCountUp(value, 2000)
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black mb-2 font-mono" style={{ color }}>
        {formatNumber(count)}{suffix}
      </div>
      <div className="text-sm text-white/50 font-medium">{label}</div>
    </div>
  )
}

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      layout
      className="glass-card overflow-hidden cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-semibold text-sm text-white/90">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-5 text-sm text-white/60 leading-relaxed border-t border-white/[0.06] pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── FEATURE CARD ─────────────────────────────────────────────────────────────
function FeatureCard({ icon: Icon, title, desc, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card p-6 group"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{ background: `${color}20`, border: `1px solid ${color}30` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <h3 className="font-bold text-base mb-2 text-white/90">{title}</h3>
      <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
    </motion.div>
  )
}

// ─── TESTIMONIAL CARD ─────────────────────────────────────────────────────────
function TestimonialCard({ name, role, avatar, rating, text, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-sm text-white/70 leading-relaxed mb-6">"{text}"</p>
      <div className="flex items-center gap-3">
        <div className="text-2xl">{avatar}</div>
        <div>
          <p className="font-semibold text-sm text-white/90">{name}</p>
          <p className="text-xs text-white/40">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── MAIN HOME COMPONENT ──────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-32 pb-20">
        {/* Background */}
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

        <div className="container-app grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-white/80">Apple iOS 26 Design Language</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-bold">NEW</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
            >
              Generate{' '}
              <span className="text-gradient">Beautiful</span>
              <br />
              QR Codes{' '}
              <span className="text-gradient">Instantly</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/60 mb-10 max-w-lg leading-relaxed"
            >
              The world's most advanced QR code platform. Create, customize with gradients & logos,
              track analytics, and share — all in one premium experience.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <Link to="/generator">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary flex items-center gap-2.5 text-base px-8 py-4 rounded-2xl"
                >
                  <Zap className="w-5 h-5" />
                  Generate Free QR
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6"
            >
              <div className="flex -space-x-2">
                {['👨‍💼', '👩‍💻', '👨‍🎨', '👩‍🚀', '👨‍🍳'].map((e, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-surface flex items-center justify-center text-sm">
                    {e}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-xs text-white/40">Trusted by 87,000+ users worldwide</p>
              </div>
            </motion.div>
          </div>

          {/* Right – Hero QR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.3 }}
            className="flex justify-center"
          >
            <HeroQR />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs">Scroll to explore</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-y border-white/[0.06]">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <StatItem key={i} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-50" />
        <div className="container-app relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
              FEATURES
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Everything you need to{' '}
              <span className="text-gradient">stand out</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              From basic URL codes to advanced analytics dashboards, QRVerse has every tool for individuals and enterprises.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <FeatureCard key={i} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── QR TYPES SHOWCASE ────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary-400 text-xs font-semibold mb-4">
              QR TYPES
            </span>
            <h2 className="text-4xl font-black mb-4">
              11+ QR Code <span className="text-gradient">Categories</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: Globe, label: 'URL', color: '#007AFF' },
              { icon: Mail, label: 'Email', color: '#FF9F0A' },
              { icon: Smartphone, label: 'Phone', color: '#30D158' },
              { icon: Wifi, label: 'WiFi', color: '#BF5AF2' },
              { icon: Users, label: 'vCard', color: '#FF375F' },
              { icon: MapPin, label: 'Location', color: '#FF6B6B' },
              { icon: QrCode, label: 'WhatsApp', color: '#25D366' },
              { icon: BarChart2, label: 'Social', color: '#FF2D55' },
            ].map(({ icon: Icon, label, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.08, y: -3 }}
              >
                <Link to={`/generator?type=${label.toLowerCase()}`}>
                  <div className="glass-card px-5 py-3 flex items-center gap-2.5 cursor-pointer hover:border-white/20 transition-all">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: `${color}20` }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <span className="text-sm font-semibold text-white/80">{label}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/generator">
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="btn-glass inline-flex items-center gap-2"
              >
                See All Types <ChevronRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-30" />
        <div className="container-app relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-4">
              TESTIMONIALS
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Loved by <span className="text-gradient">87,000+ users</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} {...t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="container-app max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <FAQItem {...faq} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-4xl overflow-hidden p-12 md:p-16 text-center"
            style={{ background: 'linear-gradient(135deg, #007AFF22, #5E5CE622, #30D15822)' }}
          >
            <div className="absolute inset-0 glass-card rounded-4xl" />
            <div className="absolute inset-0 mesh-bg" />

            <div className="relative z-10">
              <div className="text-6xl mb-6">⚡</div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Start generating for <span className="text-gradient">free</span>
              </h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                No credit card required. Create beautiful QR codes in seconds.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/generator">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary flex items-center gap-2 px-8 py-4 text-base"
                  >
                    <Zap className="w-5 h-5" />
                    Get Started Free
                  </motion.button>
                </Link>
                <Link to="/pricing">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    className="btn-glass px-8 py-4 text-base"
                  >
                    View Pricing
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
