// src/components/qr/QRPreview.jsx
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { buildQRData } from '../../lib/qrUtils'
import { useAppStore } from '../../store/useAppStore'

// ─── Build qr-code-styling options object ─────────────────────────────────────
function makeQROpts(qrOptions, size) {
  const data = buildQRData(qrOptions.type, qrOptions.fields || {}) || 'https://qrverse.app'
  const hasGradient = Boolean(qrOptions.gradient)

  return {
    width: size - 24,
    height: size - 24,
    type: 'svg',
    data,
    image: qrOptions.logo || undefined,
    dotsOptions: {
      type: qrOptions.dotStyle || 'rounded',
      ...(hasGradient
        ? {
            gradient: {
              type: 'linear',
              rotation: 45,
              colorStops: [
                { offset: 0, color: qrOptions.color1 || '#007AFF' },
                { offset: 1, color: qrOptions.color2 || '#5E5CE6' },
              ],
            },
          }
        : { color: qrOptions.color1 || '#007AFF' }),
    },
    backgroundOptions: {
      color: qrOptions.transparent ? '#00000000' : (qrOptions.bgColor || '#FFFFFF'),
    },
    cornersSquareOptions: {
      type: qrOptions.cornerStyle || 'extra-rounded',
      color: qrOptions.color1 || '#007AFF',
    },
    cornersDotOptions: {
      type: 'dot',
      color: qrOptions.color2 || '#5E5CE6',
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 4,
      imageSize: 0.3,
      hideBackgroundDots: true,
    },
    qrOptions: {
      errorCorrectionLevel: qrOptions.logo ? 'H' : 'M',
    },
  }
}

export default function QRPreview({ size = 280, animated = false }) {
  const { qrOptions } = useAppStore()
  const containerRef = useRef(null)
  const qrRef = useRef(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function render() {
      if (!containerRef.current) return
      setLoading(true)

      try {
        const { default: QRCodeStyling } = await import('qr-code-styling')
        if (cancelled) return

        const opts = makeQROpts(qrOptions, size)

        if (!qrRef.current) {
          // First render — create instance and append
          qrRef.current = new QRCodeStyling(opts)
          containerRef.current.innerHTML = ''
          qrRef.current.append(containerRef.current)
        } else {
          // Subsequent renders — use update() for smooth transitions
          qrRef.current.update(opts)
        }
      } catch (err) {
        if (cancelled) return
        console.warn('qr-code-styling failed, using fallback:', err.message)
        // ── Fallback: plain qrcode canvas ────────────────────────────────────
        try {
          const QRCode = await import('qrcode')
          if (cancelled || !containerRef.current) return
          const data = buildQRData(qrOptions.type, qrOptions.fields || {}) || 'https://qrverse.app'
          containerRef.current.innerHTML = ''
          const canvas = document.createElement('canvas')
          await QRCode.toCanvas(canvas, data, {
            width: size - 24,
            margin: 1,
            color: {
              dark: qrOptions.color1 || '#007AFF',
              light: qrOptions.transparent ? '#00000000' : (qrOptions.bgColor || '#FFFFFF'),
            },
          })
          containerRef.current.appendChild(canvas)
        } catch (e2) {
          console.error('Fallback QR also failed:', e2)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    render()
    return () => { cancelled = true }
  }, [
    qrOptions.type,
    qrOptions.fields,
    qrOptions.color1,
    qrOptions.color2,
    qrOptions.gradient,
    qrOptions.bgColor,
    qrOptions.transparent,
    qrOptions.dotStyle,
    qrOptions.cornerStyle,
    qrOptions.logo,
    size,
  ])

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Loading scan line */}
      {loading && (
        <div className="absolute inset-0 z-10 rounded-3xl overflow-hidden pointer-events-none">
          <motion.div
            initial={{ top: '-5%' }}
            animate={{ top: '105%' }}
            transition={{ duration: 0.8, ease: 'linear', repeat: Infinity, repeatDelay: 0.3 }}
            className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm"
          />
        </div>
      )}

      {/* QR frame */}
      <motion.div
        animate={animated ? { y: [0, -8, 0], rotate: [0, 0.5, -0.5, 0] } : {}}
        transition={animated ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : {}}
        className="relative"
        style={{ width: size, height: size }}
      >
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            width: size,
            height: size,
            padding: 12,
            background: qrOptions.transparent
              ? 'rgba(255,255,255,0.06)'
              : (qrOptions.bgColor || '#FFFFFF'),
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          <div
            ref={containerRef}
            className="w-full h-full flex items-center justify-center overflow-hidden"
            style={{ width: size - 24, height: size - 24 }}
          />
        </div>

        {/* Color glow */}
        <div
          className="absolute inset-0 rounded-3xl opacity-20 blur-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${qrOptions.color1 || '#007AFF'}, transparent 70%)`,
          }}
        />
      </motion.div>
    </div>
  )
}

// ─── Hook for exporting high-res QR instance ──────────────────────────────────
export function useQRInstance() {
  const { qrOptions } = useAppStore()

  const getInstance = async () => {
    const { default: QRCodeStyling } = await import('qr-code-styling')
    const opts = makeQROpts(qrOptions, 1048) // 1024 + 24 padding
    return new QRCodeStyling(opts)
  }

  return { getInstance }
}
