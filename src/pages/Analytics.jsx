// src/pages/Analytics.jsx
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { TrendingUp, Users, Smartphone, Globe2, MapPin, Download, BarChart2, Activity } from 'lucide-react'

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const DAILY_SCANS = [
  { day: 'Aug 3', scans: 820 }, { day: 'Aug 5', scans: 1240 }, { day: 'Aug 7', scans: 980 },
  { day: 'Aug 9', scans: 1650 }, { day: 'Aug 11', scans: 1320 }, { day: 'Aug 13', scans: 2100 },
  { day: 'Aug 15', scans: 1890 }, { day: 'Aug 17', scans: 2400 }, { day: 'Aug 19', scans: 2100 },
  { day: 'Aug 21', scans: 3100 }, { day: 'Aug 23', scans: 2700 }, { day: 'Aug 25', scans: 3500 },
  { day: 'Aug 27', scans: 3200 }, { day: 'Aug 29', scans: 4100 }, { day: 'Sep 1', scans: 4800 },
]

const DEVICE_DATA = [
  { name: 'Mobile', value: 68, color: '#007AFF' },
  { name: 'Desktop', value: 22, color: '#5E5CE6' },
  { name: 'Tablet', value: 10, color: '#30D158' },
]

const COUNTRY_DATA = [
  { country: 'United States', scans: 28400, flag: '🇺🇸' },
  { country: 'United Kingdom', scans: 12300, flag: '🇬🇧' },
  { country: 'Germany', scans: 9800, flag: '🇩🇪' },
  { country: 'India', scans: 15200, flag: '🇮🇳' },
  { country: 'Canada', scans: 7100, flag: '🇨🇦' },
  { country: 'Australia', scans: 5800, flag: '🇦🇺' },
  { country: 'France', scans: 4900, flag: '🇫🇷' },
]

const MONTHLY_DATA = [
  { month: 'Apr', scans: 12400 }, { month: 'May', scans: 19200 }, { month: 'Jun', scans: 16800 },
  { month: 'Jul', scans: 24600 }, { month: 'Aug', scans: 32100 }, { month: 'Sep', scans: 8600 },
]

const CITY_DATA = [
  { city: 'New York', scans: 8200 },
  { city: 'London', scans: 6100 },
  { city: 'Mumbai', scans: 5400 },
  { city: 'Los Angeles', scans: 4800 },
  { city: 'Berlin', scans: 3900 },
  { city: 'Toronto', scans: 3200 },
  { city: 'Sydney', scans: 2800 },
]

// Custom tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card px-3 py-2 text-xs shadow-premium">
      <p className="font-semibold text-white/70 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-bold" style={{ color: p.color || '#007AFF' }}>
          {p.name}: {p.value?.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

// ─── METRIC CARD ─────────────────────────────────────────────────────────────
function MetricCard({ label, value, change, icon: Icon, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-wide">{label}</p>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon className="w-4.5 h-4.5" style={{ color }} />
        </div>
      </div>
      <p className="text-3xl font-black mb-1" style={{ color }}>{value}</p>
      <div className="flex items-center gap-1.5 text-xs">
        <TrendingUp className="w-3.5 h-3.5 text-accent" />
        <span className="text-accent font-semibold">{change}</span>
        <span className="text-white/30">vs last month</span>
      </div>
    </motion.div>
  )
}

export default function Analytics() {
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
              QR <span className="text-gradient">Analytics</span>
            </h1>
            <p className="text-white/50 text-sm">Real-time insights across all your QR codes</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="input-glass text-xs py-2 px-3 w-auto" style={{ colorScheme: 'dark' }}>
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
            </select>
            <button className="btn-glass flex items-center gap-2 text-xs py-2">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </motion.div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Total Scans" value="89.2K" change="+34%" icon={Activity} color="#007AFF" delay={0} />
          <MetricCard label="Unique Users" value="41.5K" change="+28%" icon={Users} color="#5E5CE6" delay={0.07} />
          <MetricCard label="Mobile Rate" value="68%" change="+5%" icon={Smartphone} color="#30D158" delay={0.14} />
          <MetricCard label="Countries" value="140" change="+12" icon={Globe2} color="#FF9F0A" delay={0.21} />
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-3 gap-5 mb-5">
          {/* Daily Scans – Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-white/90">Daily Scans</h3>
                <p className="text-xs text-white/40">Last 30 days trend</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs glass-card px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-white/60">Live</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={DAILY_SCANS} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="scans" name="Scans" stroke="#007AFF" strokeWidth={2.5} fill="url(#scanGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Device Breakdown – Pie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="font-bold text-white/90 mb-1">Device Types</h3>
            <p className="text-xs text-white/40 mb-4">Scan distribution</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={DEVICE_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" stroke="none">
                  {DEVICE_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-2">
              {DEVICE_DATA.map(({ name, value, color }) => (
                <div key={name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                    <span className="text-white/60">{name}</span>
                  </div>
                  <span className="font-bold text-white/80">{value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-2 gap-5 mb-5">
          {/* Monthly Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass-card p-6"
          >
            <h3 className="font-bold text-white/90 mb-1">Monthly Report</h3>
            <p className="text-xs text-white/40 mb-4">Scans per month</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={MONTHLY_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5E5CE6" />
                    <stop offset="100%" stopColor="#007AFF" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="scans" name="Scans" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Country Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="font-bold text-white/90 mb-1">Top Countries</h3>
            <p className="text-xs text-white/40 mb-4">By scan volume</p>
            <div className="space-y-3">
              {COUNTRY_DATA.map(({ country, scans, flag }, i) => {
                const max = COUNTRY_DATA[0].scans
                const pct = (scans / max) * 100
                return (
                  <div key={country}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="flex items-center gap-2 text-white/70 font-medium">
                        <span>{flag}</span> {country}
                      </span>
                      <span className="text-white/50 font-semibold">{scans.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.05 }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, #007AFF, #5E5CE6)` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* City Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-white/90">Top Cities</h3>
              <p className="text-xs text-white/40">Breakdown by city</p>
            </div>
            <MapPin className="w-4 h-4 text-white/30" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {CITY_DATA.map(({ city, scans }, i) => (
              <div key={city} className="text-center p-3 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                <p className="text-lg font-black text-primary">{(scans / 1000).toFixed(1)}K</p>
                <p className="text-xs text-white/50 mt-1">{city}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
