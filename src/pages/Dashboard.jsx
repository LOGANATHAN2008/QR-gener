// src/pages/Dashboard.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  QrCode, Search, Star, Trash2, Download, BarChart2, Clock,
  Filter, Grid3X3, List, Plus, Heart, Eye, TrendingUp, Zap,
  Globe, Wifi, Contact, MessageCircle, Mail, Phone, MapPin, Calendar, Share2, Type
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const TYPE_ICONS = {
  url: Globe, text: Type, email: Mail, phone: Phone, sms: Phone,
  whatsapp: MessageCircle, wifi: Wifi, vcard: Contact, location: MapPin,
  event: Calendar, social: Share2,
}

const ACTIVITY = [
  { action: 'Generated WiFi QR', time: '2 min ago', icon: Wifi, color: '#BF5AF2' },
  { action: 'Downloaded website.png', time: '1 hour ago', icon: Download, color: '#007AFF' },
  { action: 'Saved vCard Code', time: '3 hours ago', icon: Contact, color: '#FF375F' },
  { action: 'Generated WhatsApp QR', time: 'Yesterday', icon: MessageCircle, color: '#25D366' },
  { action: 'Exported PDF report', time: '2 days ago', icon: Download, color: '#FF9F0A' },
]

export default function Dashboard() {
  const { savedQRs, deleteQR, toggleFavorite, showSuccess, downloadHistory } = useAppStore()
  const [search, setSearch] = useState('')
  const [view, setView] = useState('grid')
  const [filter, setFilter] = useState('all')

  const filtered = savedQRs.filter(qr => {
    const matchSearch = qr.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || (filter === 'favorites' && qr.favorite)
    return matchSearch && matchFilter
  })

  const totalScans = savedQRs.reduce((s, q) => s + q.scans, 0)

  const STATS = [
    { label: 'Total QRs', value: savedQRs.length, icon: QrCode, color: '#007AFF' },
    { label: 'Total Scans', value: totalScans.toLocaleString(), icon: BarChart2, color: '#5E5CE6' },
    { label: 'Favorites', value: savedQRs.filter(q => q.favorite).length, icon: Heart, color: '#FF375F' },
    { label: 'Downloads', value: downloadHistory.length, icon: Download, color: '#30D158' },
  ]

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-6">
      <div className="container-app">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-black mb-1">
              My <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-white/50 text-sm">Manage and track all your QR codes</p>
          </div>
          <Link to="/generator">
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New QR Code
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map(({ label, value, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wide">{label}</p>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
              </div>
              <p className="text-2xl font-black" style={{ color }}>{value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* QR Grid */}
          <div>
            {/* Search & Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search QR codes..."
                  className="input-glass pl-10 w-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center glass-card p-1 rounded-xl gap-1">
                  {['all', 'favorites'].map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                        filter === f ? 'bg-primary/20 text-primary' : 'text-white/40 hover:text-white/70'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <div className="flex items-center glass-card p-1 rounded-xl gap-1">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
                  >
                    <Grid3X3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* QR Cards */}
            <AnimatePresence>
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-12 text-center"
                >
                  <QrCode className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40 text-sm">No QR codes found</p>
                  <Link to="/generator">
                    <button className="btn-primary mt-4 text-sm">Create your first QR</button>
                  </Link>
                </motion.div>
              ) : (
                <div className={view === 'grid' ? 'grid sm:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-3'}>
                  {filtered.map((qr, i) => {
                    const Icon = TYPE_ICONS[qr.type] || Globe
                    return (
                      <motion.div
                        key={qr.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -3 }}
                        className="glass-card p-5 group"
                      >
                        {view === 'grid' ? (
                          <>
                            {/* QR Thumb */}
                            <div
                              className="w-full h-36 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden"
                              style={{ background: `linear-gradient(135deg, ${qr.color1}20, ${qr.color2}20)` }}
                            >
                              <div
                                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                                style={{ background: `linear-gradient(135deg, ${qr.color1}, ${qr.color2})` }}
                              >
                                <Icon className="w-10 h-10 text-white" />
                              </div>
                              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                <button
                                  onClick={() => toggleFavorite(qr.id)}
                                  className={`p-1.5 rounded-lg backdrop-blur-sm ${qr.favorite ? 'bg-red-500/20 text-red-400' : 'bg-black/20 text-white/60'}`}
                                >
                                  <Heart className={`w-3.5 h-3.5 ${qr.favorite ? 'fill-current' : ''}`} />
                                </button>
                                <button
                                  onClick={() => { deleteQR(qr.id); showSuccess('QR deleted') }}
                                  className="p-1.5 rounded-lg bg-black/20 backdrop-blur-sm text-white/60 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <h3 className="font-bold text-sm text-white/90 mb-1 truncate">{qr.name}</h3>
                            <p className="text-xs text-white/40 mb-3">{qr.createdAt}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 text-xs text-white/50">
                                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                                <span className="font-semibold text-primary">{qr.scans.toLocaleString()}</span> scans
                              </div>
                              <span className="text-xs px-2 py-1 rounded-lg bg-white/5 text-white/40 capitalize">{qr.type}</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center gap-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ background: `linear-gradient(135deg, ${qr.color1}, ${qr.color2})` }}
                            >
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-sm text-white/90 truncate">{qr.name}</p>
                              <div className="flex items-center gap-3 text-xs text-white/40 mt-0.5">
                                <span className="capitalize">{qr.type}</span>
                                <span>•</span>
                                <span>{qr.createdAt}</span>
                                <span>•</span>
                                <span className="text-primary font-semibold">{qr.scans.toLocaleString()} scans</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => toggleFavorite(qr.id)} className={qr.favorite ? 'text-red-400' : 'text-white/30 hover:text-red-400'}>
                                <Heart className={`w-4 h-4 ${qr.favorite ? 'fill-current' : ''}`} />
                              </button>
                              <button onClick={() => { deleteQR(qr.id); showSuccess('QR deleted') }} className="text-white/30 hover:text-red-400">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-white/40" />
                <h3 className="font-bold text-sm text-white/80">Recent Activity</h3>
              </div>
              <div className="space-y-3">
                {ACTIVITY.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}20` }}>
                      <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white/70 truncate">{item.action}</p>
                      <p className="text-xs text-white/30">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-5"
            >
              <h3 className="font-bold text-sm text-white/80 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: 'View Analytics', icon: BarChart2, to: '/analytics', color: '#5E5CE6' },
                  { label: 'Generate New QR', icon: Zap, to: '/generator', color: '#007AFF' },
                  { label: 'Upgrade to Pro', icon: Star, to: '/pricing', color: '#FF9F0A' },
                ].map(({ label, icon: Icon, to, color }) => (
                  <Link key={label} to={to}>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer group">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
                        <Icon className="w-3.5 h-3.5" style={{ color }} />
                      </div>
                      <span className="text-xs font-semibold text-white/60 group-hover:text-white/90 transition-colors">{label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Download History */}
            {downloadHistory.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-5"
              >
                <h3 className="font-bold text-sm text-white/80 mb-4">Download History</h3>
                <div className="space-y-2">
                  {downloadHistory.slice(0, 5).map((d) => (
                    <div key={d.id} className="flex items-center justify-between text-xs">
                      <span className="text-white/60 truncate">{d.name}</span>
                      <span className="text-white/30 ml-2 flex-shrink-0">{d.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
