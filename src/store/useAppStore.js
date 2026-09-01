// src/store/useAppStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const DEFAULT_QR_OPTIONS = {
  type: 'url',
  fields: { url: 'https://qrverse.app' },
  color1: '#007AFF',
  color2: '#5E5CE6',
  bgColor: '#FFFFFF',
  dotStyle: 'rounded',
  cornerStyle: 'extra-rounded',
  cornerDotStyle: 'dot',
  cornerColor: '#007AFF',
  cornerDotColor: '#5E5CE6',
  gradient: true,
  transparent: false,
  size: 300,
  logo: null,
  frame: 'none',
  name: '',
}

const MOCK_SAVED_QRS = [
  { id: '1', name: 'My Website', type: 'url', createdAt: '2026-08-15', scans: 1247, favorite: true, color1: '#007AFF', color2: '#5E5CE6' },
  { id: '2', name: 'WhatsApp Business', type: 'whatsapp', createdAt: '2026-08-20', scans: 842, favorite: false, color1: '#25D366', color2: '#128C7E' },
  { id: '3', name: 'Restaurant Menu', type: 'url', createdAt: '2026-08-25', scans: 3021, favorite: true, color1: '#FF9F0A', color2: '#FF375F' },
  { id: '4', name: 'WiFi - Office', type: 'wifi', createdAt: '2026-08-28', scans: 156, favorite: false, color1: '#BF5AF2', color2: '#5E5CE6' },
  { id: '5', name: 'Business Card', type: 'vcard', createdAt: '2026-08-30', scans: 589, favorite: true, color1: '#FF375F', color2: '#FF9F0A' },
  { id: '6', name: 'Product Promo', type: 'url', createdAt: '2026-09-01', scans: 74, favorite: false, color1: '#30D158', color2: '#007AFF' },
]

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Theme
      theme: 'dark',
      setTheme: (theme) => {
        set({ theme })
        document.documentElement.className = theme
      },
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        get().setTheme(next)
      },

      // QR Options
      qrOptions: DEFAULT_QR_OPTIONS,
      setQROptions: (opts) => set((s) => ({ qrOptions: { ...s.qrOptions, ...opts } })),
      resetQROptions: () => set({ qrOptions: DEFAULT_QR_OPTIONS }),

      // Saved QRs
      savedQRs: MOCK_SAVED_QRS,
      addQR: (qr) => set((s) => ({ savedQRs: [{ ...qr, id: Date.now().toString(), createdAt: new Date().toISOString().slice(0, 10), scans: 0, favorite: false }, ...s.savedQRs] })),
      deleteQR: (id) => set((s) => ({ savedQRs: s.savedQRs.filter(q => q.id !== id) })),
      toggleFavorite: (id) => set((s) => ({ savedQRs: s.savedQRs.map(q => q.id === id ? { ...q, favorite: !q.favorite } : q) })),

      // Toast notifications
      toasts: [],
      addToast: (toast) => {
        const id = Date.now().toString()
        set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }))
        setTimeout(() => get().removeToast(id), toast.duration || 3500)
        return id
      },
      removeToast: (id) => set((s) => ({ toasts: s.toasts.filter(t => t.id !== id) })),
      showSuccess: (msg) => get().addToast({ type: 'success', message: msg }),
      showError: (msg) => get().addToast({ type: 'error', message: msg }),
      showInfo: (msg) => get().addToast({ type: 'info', message: msg }),

      // Command palette
      commandOpen: false,
      setCommandOpen: (v) => set({ commandOpen: v }),

      // Download history
      downloadHistory: [],
      addDownload: (item) => set((s) => ({ downloadHistory: [{ ...item, id: Date.now().toString(), time: new Date().toLocaleTimeString() }, ...s.downloadHistory.slice(0, 49)] })),
    }),
    {
      name: 'qrverse-store',
      partialize: (s) => ({ theme: s.theme, savedQRs: s.savedQRs, downloadHistory: s.downloadHistory }),
    }
  )
)
