// src/components/ui/Toast.jsx
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

const ICONS = {
  success: { Icon: CheckCircle, color: 'text-accent' },
  error: { Icon: AlertCircle, color: 'text-red-400' },
  info: { Icon: Info, color: 'text-primary' },
}

export default function ToastContainer() {
  const { toasts, removeToast } = useAppStore()

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const { Icon, color } = ICONS[toast.type] || ICONS.info
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="pointer-events-auto glass-card px-4 py-3.5 flex items-center gap-3 min-w-72 max-w-sm shadow-premium"
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${color}`} />
              <p className="text-sm font-medium flex-1 text-white/90">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/30 hover:text-white/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
