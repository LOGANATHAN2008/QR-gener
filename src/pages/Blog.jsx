import { motion } from 'framer-motion'
import { Search, ChevronRight, Hash } from 'lucide-react'

const ARTICLES = [
  { id: 1, title: 'How QR Codes Work', category: 'Technology', date: 'Oct 12, 2026', read: '5 min read' },
  { id: 2, title: 'Best QR Marketing Strategies', category: 'Marketing', date: 'Oct 10, 2026', read: '8 min read' },
  { id: 3, title: 'QR Codes For Students', category: 'Education', date: 'Oct 05, 2026', read: '4 min read' },
  { id: 4, title: 'QR Codes For Businesses', category: 'Business', date: 'Sep 28, 2026', read: '6 min read' },
  { id: 5, title: 'Dynamic vs Static QR Codes', category: 'Guide', date: 'Sep 20, 2026', read: '7 min read' },
  { id: 6, title: 'QR Security Guide', category: 'Security', date: 'Sep 15, 2026', read: '10 min read' },
]

export default function Blog() {
  return (
    <div className="pt-32 pb-24 container-app">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">QRVerse Blog</h1>
        <p className="text-white/60">Insights, guides, and updates from the QRVerse team.</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-2/3 space-y-6">
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
          {ARTICLES.map((article, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={article.id}
              className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group cursor-pointer hover:border-primary/50 transition-all"
            >
              <div>
                <div className="flex items-center gap-3 text-xs font-medium text-white/50 mb-2">
                  <span className="text-primary">{article.category}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.read}</span>
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{article.title}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all">
                <ChevronRight className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:w-1/3 space-y-8">
          <div className="glass-card p-6">
            <h3 className="font-bold mb-4">Search</h3>
            <div className="relative">
              <input type="text" placeholder="Search articles..." className="input-glass pl-10 w-full" />
              <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-bold mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {['Technology', 'Marketing', 'Education', 'Business', 'Guide', 'Security'].map(cat => (
                <button key={cat} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 hover:border-white/20 transition-all text-white/70">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-bold mb-4">Trending Topics</h3>
            <ul className="space-y-3">
              {[
                'How to customize your QR code logo',
                'Top 5 tracking features in QRVerse',
                'Understanding Dynamic vs Static',
              ].map((topic, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/60 hover:text-white transition-colors cursor-pointer">
                  <Hash className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
