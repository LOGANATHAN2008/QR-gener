// src/App.jsx
import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import ToastContainer from './components/ui/Toast'
import CommandPalette from './components/ui/CommandPalette'
import Home from './pages/Home'
import Generator from './pages/Generator'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Pricing from './pages/Pricing'
import Profile from './pages/Profile'
import About from './pages/About'
import Blog from './pages/Blog'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Docs from './pages/Docs'
import ApiReference from './pages/ApiReference'
import Status from './pages/Status'
import HelpCenter from './pages/HelpCenter'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import CookiePolicy from './pages/CookiePolicy'
import GDPR from './pages/GDPR'
import { useAppStore } from './store/useAppStore'
import { initFirebase, trackPageView } from './lib/firebase'

// Page transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  const { theme } = useAppStore()

  // Apply theme class on mount and change
  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  // Init Firebase
  useEffect(() => {
    initFirebase()
  }, [])

  // Track page views
  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-surface-400 text-white">
      {/* Background mesh */}
      <div className="fixed inset-0 mesh-bg pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-radial from-primary/3 via-transparent to-transparent pointer-events-none z-0" />

      {/* Navigation */}
      <Navbar />

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/generator" element={<PageTransition><Generator /></PageTransition>} />
          <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="/analytics" element={<PageTransition><Analytics /></PageTransition>} />
          <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
          <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
          
          {/* Company Pages */}
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          
          {/* Support Pages */}
          <Route path="/docs" element={<PageTransition><Docs /></PageTransition>} />
          <Route path="/api-reference" element={<PageTransition><ApiReference /></PageTransition>} />
          <Route path="/status" element={<PageTransition><Status /></PageTransition>} />
          <Route path="/help-center" element={<PageTransition><HelpCenter /></PageTransition>} />
          
          {/* Legal Pages */}
          <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
          <Route path="/cookie-policy" element={<PageTransition><CookiePolicy /></PageTransition>} />
          <Route path="/gdpr" element={<PageTransition><GDPR /></PageTransition>} />
        </Routes>
      </AnimatePresence>

      {/* Global UI */}
      <ToastContainer />
      <CommandPalette />
    </div>
  )
}
