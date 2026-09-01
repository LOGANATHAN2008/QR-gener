// src/pages/Profile.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User, Sun, Moon, Bell, Key, Copy, RefreshCw, Check, Shield,
  Globe, Mail, Phone, Camera, ChevronRight, Zap
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const API_KEY = 'qrv_live_xK9mN2pQ8rT5yW3jL6hD1cV4bZ7nF0eA'

function Section({ title, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card p-6"
    >
      <h3 className="font-bold text-white/80 mb-5 pb-3 border-b border-white/[0.08]">{title}</h3>
      {children}
    </motion.div>
  )
}

function InputField({ label, value, onChange, type = 'text', icon: Icon, disabled }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/40 mb-2 uppercase tracking-wide">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />}
        <input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`input-glass w-full ${Icon ? 'pl-10' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      </div>
    </div>
  )
}

function Toggle({ enabled, onChange, label, desc }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-semibold text-white/80">{label}</p>
        {desc && <p className="text-xs text-white/40 mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${enabled ? 'bg-primary' : 'bg-white/20'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${enabled ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  )
}

export default function Profile() {
  const { theme, toggleTheme, showSuccess } = useAppStore()
  const [copied, setCopied] = useState(false)
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex@qrverse.app',
    phone: '+1 (555) 234-5678',
    website: 'https://alexjohnson.dev',
    bio: 'Digital marketing specialist and QR enthusiast. Building awesome campaigns.',
    plan: 'Pro',
  })
  const [notifications, setNotifications] = useState({
    scans: true, weekly: true, updates: false, marketing: false,
  })
  const [showKey, setShowKey] = useState(false)

  const handleCopyKey = () => {
    navigator.clipboard.writeText(API_KEY)
    setCopied(true)
    showSuccess('API key copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-6">
      <div className="container-app max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black mb-1">
            My <span className="text-gradient">Profile</span>
          </h1>
          <p className="text-white/50 text-sm">Manage your account settings and preferences</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass-card p-6 mb-5 flex flex-col sm:flex-row items-center sm:items-start gap-5"
        >
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl shadow-glow-sm">
              👨‍💻
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
              <Camera className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-black text-white mb-1">{user.name}</h2>
            <p className="text-white/50 text-sm mb-3">{user.email}</p>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                <Zap className="w-3 h-3" /> {user.plan} Plan
              </span>
              <span className="text-xs text-white/30">Member since Aug 2025</span>
            </div>
          </div>
          <button className="btn-glass text-xs py-2 px-4">Upgrade Plan</button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Personal Info */}
          <Section title="Personal Information" delay={0.1}>
            <div className="space-y-4">
              <InputField label="Full Name" value={user.name} onChange={e => setUser({...user, name: e.target.value})} icon={User} />
              <InputField label="Email Address" value={user.email} onChange={e => setUser({...user, email: e.target.value})} icon={Mail} type="email" />
              <InputField label="Phone Number" value={user.phone} onChange={e => setUser({...user, phone: e.target.value})} icon={Phone} type="tel" />
              <InputField label="Website" value={user.website} onChange={e => setUser({...user, website: e.target.value})} icon={Globe} type="url" />
              <div>
                <label className="block text-xs font-semibold text-white/40 mb-2 uppercase tracking-wide">Bio</label>
                <textarea
                  value={user.bio}
                  onChange={e => setUser({...user, bio: e.target.value})}
                  rows={3}
                  className="input-glass w-full resize-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => showSuccess('Profile updated!')}
                className="btn-primary w-full py-3"
              >
                Save Changes
              </motion.button>
            </div>
          </Section>

          {/* Theme & Appearance */}
          <div className="space-y-5">
            <Section title="Appearance" delay={0.15}>
              <div className="space-y-1 divide-y divide-white/[0.06]">
                <Toggle
                  enabled={theme === 'dark'}
                  onChange={() => toggleTheme()}
                  label="Dark Mode"
                  desc="Use dark theme throughout the app"
                />
                <Toggle enabled={true} onChange={() => {}} label="Glassmorphism Effects" desc="Premium glass UI components" />
                <Toggle enabled={true} onChange={() => {}} label="Animations" desc="Framer Motion page transitions" />
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-white/40 mb-3 uppercase tracking-wide">Theme Color</label>
                <div className="flex gap-2">
                  {['#007AFF', '#5E5CE6', '#30D158', '#FF375F', '#FF9F0A', '#BF5AF2'].map(c => (
                    <button
                      key={c}
                      className="w-8 h-8 rounded-xl border-2 border-transparent hover:border-white/30 transition-all"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>
            </Section>

            {/* Notifications */}
            <Section title="Notifications" delay={0.2}>
              <div className="divide-y divide-white/[0.06]">
                <Toggle enabled={notifications.scans} onChange={v => setNotifications({...notifications, scans: v})} label="Scan Alerts" desc="When your QR hits milestones" />
                <Toggle enabled={notifications.weekly} onChange={v => setNotifications({...notifications, weekly: v})} label="Weekly Report" desc="Summary email every Monday" />
                <Toggle enabled={notifications.updates} onChange={v => setNotifications({...notifications, updates: v})} label="Product Updates" desc="New features and improvements" />
                <Toggle enabled={notifications.marketing} onChange={v => setNotifications({...notifications, marketing: v})} label="Marketing Emails" desc="Tips, offers, and case studies" />
              </div>
            </Section>
          </div>
        </div>

        {/* API Keys */}
        <Section title="API Access" delay={0.25}>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-white/40" />
                  <span className="text-xs font-semibold text-white/60 uppercase tracking-wide">Live API Key</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="text-xs text-white/40 hover:text-white/70 transition-colors"
                  >
                    {showKey ? 'Hide' : 'Reveal'}
                  </button>
                  <button
                    onClick={handleCopyKey}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <p className="font-mono text-sm text-white/80 break-all">
                {showKey ? API_KEY : '•'.repeat(20) + API_KEY.slice(-8)}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'Daily Limit', value: '1,000' },
                { label: 'Used Today', value: '247' },
                { label: 'Remaining', value: '753' },
              ].map(({ label, value }) => (
                <div key={label} className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <p className="text-sm font-black text-primary">{value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <Shield className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-white/60">
                Keep your API key secure. Never share it in public repositories or client-side code.
                Regenerate immediately if compromised.
              </p>
            </div>

            <button className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <RefreshCw className="w-4 h-4" />
              Regenerate API Key
            </button>
          </div>
        </Section>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 border border-red-500/20 mt-5"
        >
          <h3 className="font-bold text-red-400 mb-4">Danger Zone</h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
            <div>
              <p className="text-sm font-semibold text-white/80">Delete Account</p>
              <p className="text-xs text-white/40 mt-0.5">Permanently delete your account and all data. This cannot be undone.</p>
            </div>
            <button className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/10 transition-all flex-shrink-0">
              Delete Account
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
