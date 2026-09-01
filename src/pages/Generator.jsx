// src/pages/Generator.jsx
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe, Type, Mail, Phone, MessageSquare, MessageCircle, Wifi,
  Contact, MapPin, Calendar, Share2, Palette, Image as ImageIcon,
  Download, Save, RefreshCw, ChevronRight, Eye, Layers, RotateCcw,
  Copy, Check, Zap, Sparkles
} from 'lucide-react'
import QRPreview, { useQRInstance } from '../components/qr/QRPreview'
import { useAppStore } from '../store/useAppStore'
import { exportQR } from '../lib/exportUtils'
import { QR_TYPES, DOT_STYLES, CORNER_STYLES } from '../lib/qrUtils'
import { trackQRGenerated, trackQRDownloaded } from '../lib/firebase'

// ─── QR TYPE ICONS MAP ────────────────────────────────────────────────────────
const ICONS = { Globe, Type, Mail, Phone, MessageSquare, MessageCircle, Wifi, Contact, MapPin, Calendar, Share2 }

// ─── INPUT FIELDS BY TYPE ─────────────────────────────────────────────────────
const TYPE_FIELDS = {
  url: [{ id: 'url', label: 'Website URL', placeholder: 'https://your-website.com', type: 'url' }],
  text: [{ id: 'text', label: 'Text Content', placeholder: 'Enter any text...', type: 'textarea' }],
  email: [
    { id: 'email', label: 'Email Address', placeholder: 'user@example.com', type: 'email' },
    { id: 'subject', label: 'Subject (optional)', placeholder: 'Hello!', type: 'text' },
    { id: 'body', label: 'Body (optional)', placeholder: 'Your message...', type: 'textarea' },
  ],
  phone: [{ id: 'phone', label: 'Phone Number', placeholder: '+1 234 567 8900', type: 'tel' }],
  sms: [
    { id: 'phone', label: 'Phone Number', placeholder: '+1 234 567 8900', type: 'tel' },
    { id: 'message', label: 'Pre-filled Message', placeholder: 'Hello!', type: 'textarea' },
  ],
  whatsapp: [
    { id: 'phone', label: 'WhatsApp Number', placeholder: '+1 234 567 8900', type: 'tel' },
    { id: 'message', label: 'Pre-filled Message (optional)', placeholder: 'Hi there!', type: 'textarea' },
  ],
  wifi: [
    { id: 'ssid', label: 'Network Name (SSID)', placeholder: 'MyWiFiNetwork', type: 'text' },
    { id: 'password', label: 'Password', placeholder: 'WiFiPassword123', type: 'password' },
    { id: 'security', label: 'Security Type', type: 'select', options: ['WPA', 'WEP', 'None'] },
  ],
  vcard: [
    { id: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text' },
    { id: 'org', label: 'Organization', placeholder: 'Company Name', type: 'text' },
    { id: 'phone', label: 'Phone', placeholder: '+1 234 567 8900', type: 'tel' },
    { id: 'email', label: 'Email', placeholder: 'john@company.com', type: 'email' },
    { id: 'website', label: 'Website', placeholder: 'https://website.com', type: 'url' },
    { id: 'address', label: 'Address', placeholder: '123 Main St, City', type: 'text' },
  ],
  location: [
    { id: 'lat', label: 'Latitude', placeholder: '37.7749', type: 'text' },
    { id: 'lng', label: 'Longitude', placeholder: '-122.4194', type: 'text' },
    { id: 'label', label: 'Location Label', placeholder: 'San Francisco, CA', type: 'text' },
  ],
  event: [
    { id: 'title', label: 'Event Title', placeholder: 'Annual Conference 2026', type: 'text' },
    { id: 'start', label: 'Start Date & Time', type: 'datetime-local' },
    { id: 'end', label: 'End Date & Time', type: 'datetime-local' },
    { id: 'location', label: 'Location', placeholder: 'Conference Center, NYC', type: 'text' },
    { id: 'description', label: 'Description', placeholder: 'Event details...', type: 'textarea' },
  ],
  social: [
    { id: 'url', label: 'Social Profile URL', placeholder: 'https://twitter.com/yourusername', type: 'url' },
  ],
}

const EXPORT_FORMATS = [
  { id: 'png', label: 'PNG', desc: 'Best for web' },
  { id: 'jpg', label: 'JPG', desc: 'Smaller size' },
  { id: 'svg', label: 'SVG', desc: 'For print' },
  { id: 'pdf', label: 'PDF', desc: 'Document' },
]

const PREMIUM_STYLES = [
  { id: 'standard', label: 'Standard Classic', color1: '#000000', color2: '#000000', bgColor: '#FFFFFF', gradient: false, dotStyle: 'square', cornerStyle: 'square', transparent: false },
  { id: 'cyber', label: 'Cyberpunk', color1: '#FF00FF', color2: '#00FFFF', bgColor: '#09090B', gradient: true, dotStyle: 'classy', cornerStyle: 'extra-rounded', transparent: false },
  { id: 'ocean', label: 'Ocean Glass', color1: '#007AFF', color2: '#5E5CE6', bgColor: '#FFFFFF', gradient: true, dotStyle: 'dots', cornerStyle: 'dot', transparent: true },
  { id: 'emerald', label: 'Emerald City', color1: '#30D158', color2: '#007AFF', bgColor: '#FFFFFF', gradient: true, dotStyle: 'classy-rounded', cornerStyle: 'extra-rounded', transparent: false },
  { id: 'sunset', label: 'Sunset Glow', color1: '#FF375F', color2: '#FF9F0A', bgColor: '#FFFFFF', gradient: true, dotStyle: 'rounded', cornerStyle: 'extra-rounded', transparent: false },
  { id: 'luxury', label: 'Gold Luxury', color1: '#FFD60A', color2: '#FF9F0A', bgColor: '#1A1A1A', gradient: true, dotStyle: 'classy', cornerStyle: 'square', transparent: false },
  { id: 'minimal', label: 'Minimalist', color1: '#333333', color2: '#888888', bgColor: '#F5F5F7', gradient: true, dotStyle: 'dots', cornerStyle: 'dot', transparent: false },
]

// ─── PANEL TABS ───────────────────────────────────────────────────────────────
const TABS = [
  { id: 'content', label: 'Content', icon: Type },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'export', label: 'Export', icon: Download },
]

export default function Generator() {
  const { qrOptions, setQROptions, resetQROptions, addQR, showSuccess, showError, addDownload } = useAppStore()
  const [activeTab, setActiveTab] = useState('content')
  const [exporting, setExporting] = useState(null)
  const [saved, setSaved] = useState(false)
  const { getInstance } = useQRInstance()
  const logoInputRef = useRef(null)

  const currentType = QR_TYPES.find(t => t.id === qrOptions.type) || QR_TYPES[0]
  const fields = TYPE_FIELDS[qrOptions.type] || TYPE_FIELDS.url

  const handleFieldChange = useCallback((id, value) => {
    setQROptions({ fields: { ...qrOptions.fields, [id]: value } })
  }, [qrOptions.fields, setQROptions])

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    // Limit logo to 2MB to keep localStorage healthy
    if (file.size > 2 * 1024 * 1024) {
      showError('Logo too large. Please use an image under 2MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      setQROptions({ logo: ev.target.result })
      showSuccess('Logo uploaded! QR preview updating...')
    }
    reader.onerror = () => showError('Failed to read logo file.')
    reader.readAsDataURL(file)
    // Reset input so same file can be re-uploaded
    e.target.value = ''
  }

  const handleExport = async (format) => {
    setExporting(format)
    try {
      // getInstance is async — must await
      const instance = await getInstance()
      await exportQR(instance, format, `qrverse-${qrOptions.type}`)
      trackQRDownloaded(format)
      addDownload({ format, type: qrOptions.type, name: `qrverse-${qrOptions.type}.${format}` })
      showSuccess(`Downloaded as ${format.toUpperCase()} successfully!`)
    } catch (err) {
      console.error('Export error:', err)
      showError('Export failed. Please try again.')
    } finally {
      setExporting(null)
    }
  }

  const handleSave = () => {
    addQR({ name: currentType.label + ' Code', type: qrOptions.type, ...qrOptions })
    trackQRGenerated(qrOptions.type)
    setSaved(true)
    showSuccess('QR Code saved to dashboard!')
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-6">
      <div className="container-app">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-white/80">Advanced QR Generator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            Create Your <span className="text-gradient">Perfect QR</span>
          </h1>
          <p className="text-white/50">Customize every pixel. Export in any format.</p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* ── LEFT PANEL ─────────────────────────────────────────────────── */}
          <div className="space-y-5">
            {/* QR Type Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-5"
            >
              <h3 className="font-bold text-sm text-white/70 mb-4 uppercase tracking-wider">QR Code Type</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {QR_TYPES.map((type) => {
                  const Icon = ICONS[type.icon] || Globe
                  const active = qrOptions.type === type.id
                  return (
                    <motion.button
                      key={type.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setQROptions({ type: type.id, fields: {} })}
                      className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-200 ${
                        active
                          ? 'border-primary/40 bg-primary/10'
                          : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20'
                      }`}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: `${type.color}20` }}
                      >
                        <Icon className="w-4.5 h-4.5" style={{ color: type.color }} />
                      </div>
                      <span className={`text-xs font-semibold leading-tight text-center ${active ? 'text-primary' : 'text-white/60'}`}>
                        {type.label}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            {/* Tab Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="glass-card overflow-hidden"
            >
              {/* Tabs */}
              <div className="flex border-b border-white/[0.08]">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all duration-200 ${
                      activeTab === id
                        ? 'text-primary border-b-2 border-primary bg-primary/5'
                        : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {/* ── CONTENT TAB ─────────────────────────────────────── */}
                  {activeTab === 'content' && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      {fields.map((field) => (
                        <div key={field.id}>
                          <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">
                            {field.label}
                          </label>
                          {field.type === 'textarea' ? (
                            <textarea
                              value={qrOptions.fields?.[field.id] || ''}
                              onChange={(e) => handleFieldChange(field.id, e.target.value)}
                              placeholder={field.placeholder}
                              rows={3}
                              className="input-glass resize-none"
                            />
                          ) : field.type === 'select' ? (
                            <select
                              value={qrOptions.fields?.[field.id] || field.options[0]}
                              onChange={(e) => handleFieldChange(field.id, e.target.value)}
                              className="input-glass"
                            >
                              {field.options.map(opt => (
                                <option key={opt} value={opt} className="bg-[#09090b] text-white">
                                  {opt}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              value={qrOptions.fields?.[field.id] || ''}
                              onChange={(e) => handleFieldChange(field.id, e.target.value)}
                              placeholder={field.placeholder}
                              className="input-glass"
                            />
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* ── DESIGN TAB ──────────────────────────────────────── */}
                  {activeTab === 'design' && (
                    <motion.div
                      key="design"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-6"
                    >
                      {/* Premium Templates */}
                      <div>
                        <label className="block text-xs font-semibold text-white/50 mb-3 uppercase tracking-wide">
                          Premium Templates
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {PREMIUM_STYLES.map((style) => {
                            const isActive = qrOptions.color1 === style.color1 && qrOptions.color2 === style.color2 && qrOptions.dotStyle === style.dotStyle
                            return (
                              <button
                                key={style.id}
                                onClick={() => {
                                  const { id, label, ...rest } = style
                                  setQROptions(rest)
                                }}
                                className={`relative p-3 rounded-2xl border text-left transition-all ${
                                  isActive
                                    ? 'border-primary/40 bg-primary/10'
                                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                                }`}
                              >
                                <div
                                  className="w-full h-8 rounded-lg mb-2 shadow-inner"
                                  style={{
                                    background: style.gradient
                                      ? `linear-gradient(135deg, ${style.color1}, ${style.color2})`
                                      : style.color1
                                  }}
                                />
                                <p className={`text-xs font-semibold truncate ${isActive ? 'text-primary' : 'text-white/80'}`}>
                                  {style.label}
                                </p>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Custom Colors */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">
                            Primary Color
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={qrOptions.color1}
                              onChange={(e) => setQROptions({ color1: e.target.value })}
                              className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
                            />
                            <input
                              type="text"
                              value={qrOptions.color1}
                              onChange={(e) => setQROptions({ color1: e.target.value })}
                              className="input-glass flex-1 font-mono text-xs"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">
                            Secondary Color
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={qrOptions.color2}
                              onChange={(e) => setQROptions({ color2: e.target.value })}
                              className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
                            />
                            <input
                              type="text"
                              value={qrOptions.color2}
                              onChange={(e) => setQROptions({ color2: e.target.value })}
                              className="input-glass flex-1 font-mono text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Gradient Toggle */}
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                        <div>
                          <p className="text-sm font-semibold text-white/80">Gradient Colors</p>
                          <p className="text-xs text-white/40">Blend primary to secondary</p>
                        </div>
                        <button
                          onClick={() => setQROptions({ gradient: !qrOptions.gradient })}
                          className={`relative w-12 h-6 rounded-full transition-all duration-300 ${qrOptions.gradient ? 'bg-primary' : 'bg-white/20'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${qrOptions.gradient ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>

                      {/* Background Color */}
                      <div>
                        <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">
                          Background
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={qrOptions.transparent ? '#ffffff' : qrOptions.bgColor}
                            onChange={(e) => setQROptions({ bgColor: e.target.value, transparent: false })}
                            className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
                          />
                          <input
                            type="text"
                            value={qrOptions.bgColor}
                            onChange={(e) => setQROptions({ bgColor: e.target.value })}
                            className="input-glass flex-1 font-mono text-xs"
                          />
                          <button
                            onClick={() => setQROptions({ transparent: !qrOptions.transparent })}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                              qrOptions.transparent
                                ? 'border-primary/40 bg-primary/10 text-primary'
                                : 'border-white/10 bg-white/5 text-white/40 hover:text-white'
                            }`}
                          >
                            Transparent
                          </button>
                        </div>
                      </div>

                      {/* Dot Style */}
                      <div>
                        <label className="block text-xs font-semibold text-white/50 mb-3 uppercase tracking-wide">
                          Dot Style
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {DOT_STYLES.map((style) => (
                            <button
                              key={style}
                              onClick={() => setQROptions({ dotStyle: style })}
                              className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all capitalize ${
                                qrOptions.dotStyle === style
                                  ? 'border-primary/40 bg-primary/10 text-primary'
                                  : 'border-white/10 bg-white/[0.03] text-white/50 hover:text-white hover:border-white/20'
                              }`}
                            >
                              {style.replace('-', ' ')}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Corner Style */}
                      <div>
                        <label className="block text-xs font-semibold text-white/50 mb-3 uppercase tracking-wide">
                          Corner Style
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {CORNER_STYLES.map((style) => (
                            <button
                              key={style}
                              onClick={() => setQROptions({ cornerStyle: style })}
                              className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all capitalize ${
                                qrOptions.cornerStyle === style
                                  ? 'border-secondary/40 bg-secondary/10 text-secondary-400'
                                  : 'border-white/10 bg-white/[0.03] text-white/50 hover:text-white hover:border-white/20'
                              }`}
                            >
                              {style.replace('-', ' ')}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Logo Upload */}
                      <div>
                        <label className="block text-xs font-semibold text-white/50 mb-3 uppercase tracking-wide">
                          Logo / Image
                        </label>
                        <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => logoInputRef.current?.click()}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-dashed border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-all text-sm"
                          >
                            <ImageIcon className="w-4 h-4" />
                            {qrOptions.logo ? 'Change Logo' : 'Upload Logo'}
                          </button>
                          {qrOptions.logo && (
                            <button
                              onClick={() => setQROptions({ logo: null })}
                              className="p-3 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        {qrOptions.logo && (
                          <div className="mt-3 flex items-center gap-3 p-3 rounded-xl bg-white/5">
                            <img src={qrOptions.logo} alt="Logo" className="w-10 h-10 rounded-lg object-contain bg-white/10" />
                            <span className="text-xs text-white/60">Logo embedded in QR</span>
                          </div>
                        )}
                      </div>

                      {/* Reset */}
                      <button
                        onClick={resetQROptions}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all text-sm"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Reset to Default
                      </button>
                    </motion.div>
                  )}

                  {/* ── EXPORT TAB ──────────────────────────────────────── */}
                  {activeTab === 'export' && (
                    <motion.div
                      key="export"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      <p className="text-sm text-white/50 mb-2">Choose your export format:</p>
                      <div className="grid grid-cols-2 gap-3">
                        {EXPORT_FORMATS.map(({ id, label, desc }) => (
                          <motion.button
                            key={id}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleExport(id)}
                            disabled={!!exporting}
                            className="flex flex-col items-start p-4 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-primary/30 transition-all disabled:opacity-50"
                          >
                            {exporting === id ? (
                              <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
                                <RefreshCw className="w-4 h-4 text-primary animate-spin" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center mb-3">
                                <Download className="w-4 h-4 text-white/60" />
                              </div>
                            )}
                            <span className="font-bold text-white text-base">.{label}</span>
                            <span className="text-xs text-white/40 mt-1">{desc}</span>
                          </motion.button>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <p className="text-xs text-white/30 mb-3">Export settings</p>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                            <span className="text-xs text-white/60">Resolution</span>
                            <span className="text-xs font-semibold text-white/80">1024 × 1024 px</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                            <span className="text-xs text-white/60">Format</span>
                            <span className="text-xs font-semibold text-white/80">High Quality</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT PANEL – QR PREVIEW ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Live Preview */}
            <div className="glass-card p-6 flex flex-col items-center">
              <div className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Live Preview
              </div>
              <QRPreview size={260} animated />
              <div className="mt-5 text-center">
                <p className="text-xs text-white/30">Scan with your phone to test</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                className="w-full btn-primary flex items-center justify-center gap-2 py-4"
              >
                {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                {saved ? 'Saved!' : 'Save to Dashboard'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleExport('png')}
                disabled={!!exporting}
                className="w-full btn-glass flex items-center justify-center gap-2 py-4"
              >
                {exporting === 'png' ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                Quick Download PNG
              </motion.button>
            </div>

            {/* QR Info */}
            <div className="glass-card p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Type</span>
                <span className="font-semibold text-white/80" style={{ color: currentType.color }}>
                  {currentType.label}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Style</span>
                <span className="font-semibold text-white/80 capitalize">{qrOptions.dotStyle}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Gradient</span>
                <span className="font-semibold text-white/80">{qrOptions.gradient ? 'On' : 'Off'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Logo</span>
                <span className="font-semibold text-white/80">{qrOptions.logo ? 'Embedded' : 'None'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
