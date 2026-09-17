import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent, setAnalyticsCollectionEnabled } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCuQV-quDAlW8t5v5xJ6E7KhvMjx1fr9Bs",
  authDomain: "qr-generate-ff148.firebaseapp.com",
  projectId: "qr-generate-ff148",
  storageBucket: "qr-generate-ff148.firebasestorage.app",
  messagingSenderId: "247082768515",
  appId: "1:247082768515:web:7f8638daa420e61f88a3b6",
  measurementId: "G-9QSQXYSEC8"
}

export let app
export let analytics
export let database = null
export let storage = null

// In dev mode, every event includes debug_mode: true so Firebase DebugView shows them live
const IS_DEV = import.meta.env.DEV

export function initFirebase() {
  try {
    app = initializeApp(firebaseConfig)
    analytics = getAnalytics(app)
    database = getDatabase(app)
    setAnalyticsCollectionEnabled(analytics, true)

    // Inject gtag shim so GA4 script picks up debug_mode via URL/cookie trick
    if (IS_DEV) {
      // Append ?measurement_id=..&debug_mode=1 signal for GA4 DebugView
      // This is the official GA4 method to activate DebugView for a browser session
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${firebaseConfig.measurementId}&l=dataLayer&cx=c`
      document.head.appendChild(script)

      window.dataLayer = window.dataLayer || []
      window.gtag = function () { window.dataLayer.push(arguments) }
      window.gtag('js', new Date())
      // debug_mode=true activates GA4 DebugView
      window.gtag('config', firebaseConfig.measurementId, {
        debug_mode: true,
        send_page_view: false  // Firebase SDK handles page_view
      })

      console.info('%c🔥 Firebase Analytics — DebugView ENABLED', 'color:#FF9F0A;font-weight:bold;font-size:13px')
      console.info('%c📊 Open DebugView: https://console.firebase.google.com/project/qr-generate-ff148/analytics/debugview', 'color:#5E5CE6')
    }
  } catch (e) {
    console.warn('Firebase Analytics init failed:', e.message)
  }
}

// All events automatically include debug_mode in dev so they appear in DebugView
export function trackEvent(eventName, params = {}) {
  if (analytics) {
    const payload = IS_DEV ? { ...params, debug_mode: true } : params
    logEvent(analytics, eventName, payload)
    if (IS_DEV) {
      console.log(`📡 Firebase event: ${eventName}`, payload)
    }
  }
}

export function trackPageView(pageName) {
  trackEvent('page_view', {
    page_title: pageName,
    page_location: window.location.href,
    page_path: window.location.pathname
  })
}

export function trackQRGenerated(qrType) {
  trackEvent('qr_generated', { qr_type: qrType })
}

export function trackQRDownloaded(format) {
  trackEvent('qr_downloaded', { format })
}
