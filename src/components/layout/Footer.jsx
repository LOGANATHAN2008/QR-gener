// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom'
import { QrCode, Github, Twitter, Linkedin, Heart, Globe } from 'lucide-react'

const LINKS = {
  Product: [
    { label: 'Generator', to: '/generator' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Analytics', to: '/analytics' },
    { label: 'Pricing', to: '/pricing' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', to: '/contact' },
  ],
  Support: [
    { label: 'Docs', to: '/docs' },
    { label: 'API Reference', to: '/api-reference' },
    { label: 'Status', to: '/status' },
    { label: 'Help Center', to: '/help-center' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Cookie Policy', to: '/cookie-policy' },
    { label: 'GDPR', to: '/gdpr' },
  ],
}

export default function Footer() {
  return (
    <footer className="hidden md:block border-t border-white/[0.08] bg-surface/50 backdrop-blur-xl">
      <div className="container-app section">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-sm">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gradient">QRVerse</span>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-6">
              The world's most advanced QR code generator. Create, customize, and track QR codes instantly.
            </p>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4 text-white/90">{category}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-muted hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © 2026 QRVerse. All rights reserved.
          </p>
          <p className="text-sm text-muted flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> by the QRVerse team
          </p>
        </div>
      </div>
    </footer>
  )
}
