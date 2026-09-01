import { motion } from 'framer-motion'
import { Terminal, Key, Database, Webhook, Link2 } from 'lucide-react'

export default function ApiReference() {
  return (
    <div className="pt-32 pb-24 container-app">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">API Reference</h1>
        <p className="text-white/60 text-lg max-w-2xl">Integrate QRVerse capabilities directly into your applications using our powerful REST API.</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/4">
          <div className="glass-card p-6 sticky top-24">
            <h3 className="font-bold mb-4 text-xs uppercase tracking-wider text-white/50">Endpoints</h3>
            <ul className="space-y-1">
              {[
                { label: 'Authentication', icon: Key },
                { label: 'Generate QR', icon: Terminal },
                { label: 'Analytics API', icon: Database },
                { label: 'User API', icon: Link2 },
                { label: 'Webhook API', icon: Webhook },
              ].map(({ label, icon: Icon }) => (
                <li key={label}>
                  <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 text-sm text-white/60 hover:text-white transition-colors text-left">
                    <Icon className="w-4 h-4" /> {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:w-3/4 space-y-10">
          <div className="glass-card overflow-hidden">
            <div className="p-6 md:p-8 border-b border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 rounded-md bg-green-500/20 text-green-400 font-mono text-sm font-bold">POST</span>
                <h2 className="text-2xl font-bold font-mono">/v1/qr/generate</h2>
              </div>
              <p className="text-white/60">Generate a new custom QR code programmatically.</p>
            </div>
            <div className="bg-black/40 p-6 md:p-8">
              <h3 className="text-sm font-semibold text-white/40 mb-4 uppercase tracking-wider">Example Request (JavaScript)</h3>
              <pre className="font-mono text-sm text-green-300 overflow-x-auto">
{`const response = await fetch('https://api.qrverse.com/v1/qr/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: 'url',
    data: 'https://example.com',
    style: {
      dotType: 'rounded',
      color: '#007AFF',
      logo: 'https://example.com/logo.png'
    }
  })
});

const data = await response.json();
console.log(data.qr_url);`}
              </pre>
            </div>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="p-6 md:p-8 border-b border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-400 font-mono text-sm font-bold">GET</span>
                <h2 className="text-2xl font-bold font-mono">/v1/analytics/{'{id}'}</h2>
              </div>
              <p className="text-white/60">Retrieve scan analytics for a specific QR code.</p>
            </div>
            <div className="bg-black/40 p-6 md:p-8">
              <h3 className="text-sm font-semibold text-white/40 mb-4 uppercase tracking-wider">Example Response</h3>
              <pre className="font-mono text-sm text-blue-300 overflow-x-auto">
{`{
  "id": "qr_12345abcde",
  "total_scans": 1450,
  "unique_scans": 1205,
  "top_locations": [
    { "country": "US", "scans": 450 },
    { "country": "UK", "scans": 210 }
  ],
  "devices": {
    "ios": 800,
    "android": 600,
    "desktop": 50
  }
}`}
              </pre>
            </div>
          </div>

          <div className="glass-card p-8 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Need API Access?</h3>
              <p className="text-white/60">Get your API keys from the developer dashboard.</p>
            </div>
            <button className="btn-primary">Go to Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  )
}
