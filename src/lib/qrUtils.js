// src/lib/qrUtils.js
import QRCodeStyling from 'qr-code-styling'

export const QR_TYPES = [
  { id: 'url', label: 'Website URL', icon: 'Globe', color: '#007AFF', placeholder: 'https://example.com' },
  { id: 'text', label: 'Plain Text', icon: 'Type', color: '#5E5CE6', placeholder: 'Enter your text here...' },
  { id: 'email', label: 'Email', icon: 'Mail', color: '#FF9F0A', placeholder: 'user@example.com' },
  { id: 'phone', label: 'Phone Number', icon: 'Phone', color: '#30D158', placeholder: '+1 234 567 8900' },
  { id: 'sms', label: 'SMS', icon: 'MessageSquare', color: '#64D2FF', placeholder: '+1 234 567 8900' },
  { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle', color: '#25D366', placeholder: '+1 234 567 8900' },
  { id: 'wifi', label: 'WiFi', icon: 'Wifi', color: '#BF5AF2', placeholder: 'Network SSID' },
  { id: 'vcard', label: 'vCard Contact', icon: 'Contact', color: '#FF375F', placeholder: 'Full Name' },
  { id: 'location', label: 'Location', icon: 'MapPin', color: '#FF6B6B', placeholder: 'Latitude, Longitude' },
  { id: 'event', label: 'Event', icon: 'Calendar', color: '#FFD60A', placeholder: 'Event Name' },
  { id: 'social', label: 'Social Media', icon: 'Share2', color: '#FF2D55', placeholder: 'Profile URL' },
  { id: 'audio', label: 'Audio', icon: 'Music', color: '#E91E63', placeholder: 'Audio URL (MP3, etc.)' },
  { id: 'pdf', label: 'PDF', icon: 'FileText', color: '#F44336', placeholder: 'PDF URL' },
]

export const DOT_STYLES = ['square', 'rounded', 'dots', 'classy', 'classy-rounded', 'extra-rounded']
export const CORNER_STYLES = ['square', 'extra-rounded', 'dot']
export const FRAME_STYLES = ['none', 'shadow', 'border', 'corner-accent', 'rounded']

export function buildQRData(type, fields) {
  switch (type) {
    case 'url':
      return fields.url || 'https://qrverse.app'
    case 'text':
      return fields.text || ''
    case 'email':
      return `mailto:${fields.email}${fields.subject ? `?subject=${fields.subject}` : ''}${fields.body ? `&body=${fields.body}` : ''}`
    case 'phone':
      return `tel:${fields.phone}`
    case 'sms':
      return `sms:${fields.phone}${fields.message ? `:${fields.message}` : ''}`
    case 'whatsapp':
      return `https://wa.me/${fields.phone.replace(/\D/g, '')}${fields.message ? `?text=${encodeURIComponent(fields.message)}` : ''}`
    case 'wifi':
      return `WIFI:T:${fields.security || 'WPA'};S:${fields.ssid};P:${fields.password};H:${fields.hidden ? 'true' : 'false'};;`
    case 'vcard':
      return `BEGIN:VCARD\nVERSION:3.0\nFN:${fields.name || ''}\nORG:${fields.org || ''}\nTEL:${fields.phone || ''}\nEMAIL:${fields.email || ''}\nURL:${fields.website || ''}\nADR:;;${fields.address || ''};;;;\nEND:VCARD`
    case 'location':
      return `geo:${fields.lat || 0},${fields.lng || 0}?q=${fields.lat || 0},${fields.lng || 0}(${encodeURIComponent(fields.label || 'Location')})`
    case 'event':
      return `BEGIN:VEVENT\nSUMMARY:${fields.title || ''}\nDTSTART:${fields.start || ''}\nDTEND:${fields.end || ''}\nLOCATION:${fields.location || ''}\nDESCRIPTION:${fields.description || ''}\nEND:VEVENT`
    case 'social':
      return fields.url || ''
    case 'audio':
      return fields.fileUrl || ''
    case 'pdf':
      return fields.fileUrl || ''
    default:
      return fields.url || ''
  }
}

export function createQRInstance(options) {
  return new QRCodeStyling({
    width: options.size || 300,
    height: options.size || 300,
    type: 'svg',
    data: options.data || 'https://qrverse.app',
    image: options.logo || undefined,
    dotsOptions: {
      type: options.dotStyle || 'rounded',
      gradient: options.gradient ? {
        type: options.gradient.type || 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: options.color1 || '#007AFF' },
          { offset: 1, color: options.color2 || '#5E5CE6' },
        ],
      } : undefined,
      color: options.gradient ? undefined : (options.color1 || '#007AFF'),
    },
    backgroundOptions: {
      color: options.transparent ? 'transparent' : (options.bgColor || '#FFFFFF'),
    },
    cornersSquareOptions: {
      type: options.cornerStyle || 'extra-rounded',
      color: options.cornerColor || options.color1 || '#007AFF',
    },
    cornersDotOptions: {
      type: options.cornerDotStyle || 'dot',
      color: options.cornerDotColor || options.color1 || '#5E5CE6',
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 4,
      imageSize: 0.3,
    },
    qrOptions: {
      errorCorrectionLevel: options.logo ? 'H' : 'M',
    },
  })
}
