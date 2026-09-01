// src/components/ui/CommandPalette.jsx
import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, QrCode, BarChart2, Layout, User, DollarSign, Zap, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'

const COMMANDS = [
  { id: 'home', label: 'Go to Home', icon: Layout, to: '/', group: 'Navigation' },
  { id: 'generator', label: 'Open QR Generator', icon: QrCode, to: '/generator', group: 'Navigation' },
  { id: 'dashboard', label: 'View Dashboard', icon: Layout, to: '/dashboard', group: 'Navigation' },
  { id: 'analytics', label: 'Open Analytics', icon: BarChart2, to: '/analytics', group: 'Navigation' },
  { id: 'pricing', label: 'See Pricing', icon: DollarSign, to: '/pricing', group: 'Navigation' },
  { id: 'profile', label: 'Go to Profile', icon: User, to: '/profile', group: 'Navigation' },
  { id: 'generate-url', label: 'Generate URL QR Code', icon: Zap, to: '/generator?type=url', group: 'Actions' },
  { id: 'generate-wifi', label: 'Generate WiFi QR Code', icon: Zap, to: '/generator?type=wifi', group: 'Actions' },
  { id: 'generate-vcard', label: 'Generate vCard QR', icon: Zap, to: '/generator?type=vcard', group: 'Actions' },
]

export default function CommandPalette() {
  const { commandOpen, setCommandOpen } = useAppStore()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const filtered = query
    ? COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : COMMANDS

  useEffect(() => {
    if (commandOpen) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [commandOpen])

  useEffect(() => {
    const handle = (e) => {
      if (!commandOpen) return
      if (e.key === 'Escape') setCommandOpen(false)
      if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, filtered.length - 1))
      if (e.key === 'ArrowUp') setSelected(s => Math.max(s - 1, 0))
      if (e.key === 'Enter' && filtered[selected]) {
        navigate(filtered[selected].to)
        setCommandOpen(false)
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [commandOpen, filtered, selected])

  const groups = [...new Set(filtered.map(c => c.group))]

  return (
    <AnimatePresence>
      {commandOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={() => setCommandOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card w-full max-w-xl overflow-hidden shadow-premium"
          >
            {/* Search */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
              <Search className="w-4 h-4 text-white/40 flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(0) }}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/30"
              />
              <button onClick={() => setCommandOpen(false)} className="text-white/30 hover:text-white/60 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {groups.map(group => (
                <div key={group}>
                  <p className="px-3 py-2 text-xs font-semibold text-white/30 uppercase tracking-wider">{group}</p>
                  {filtered.filter(c => c.group === group).map((cmd, i) => {
                    const globalIdx = filtered.indexOf(cmd)
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => { navigate(cmd.to); setCommandOpen(false) }}
                        onMouseEnter={() => setSelected(globalIdx)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                          selected === globalIdx ? 'bg-primary/15 text-white' : 'text-white/70 hover:bg-white/5'
                        }`}
                      >
                        <cmd.icon className="w-4 h-4 text-primary" />
                        {cmd.label}
                      </button>
                    )
                  })}
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="text-center py-8 text-sm text-white/30">No commands found</p>
              )}
            </div>

            <div className="px-4 py-3 border-t border-white/10 flex items-center gap-4 text-xs text-white/30">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>Esc Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
