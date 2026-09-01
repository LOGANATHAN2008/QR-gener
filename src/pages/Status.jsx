import { motion } from 'framer-motion'
import { Activity, CheckCircle2, Server, Globe2, Database } from 'lucide-react'

export default function Status() {
  return (
    <div className="pt-32 pb-24 container-app max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold mb-4">System Status</h1>
          <p className="text-white/60 text-lg">Real-time status of QRVerse services and APIs.</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400">
          <Activity className="w-5 h-5" />
          <span className="font-bold">All Systems Operational</span>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
          <div className="text-5xl font-bold text-white mb-2">99.99%</div>
          <div className="text-white/50 font-medium">Uptime Last 90 Days</div>
        </div>
        <div className="glass-card p-8 flex flex-col justify-center">
          <p className="text-sm text-white/50 mb-2">Last Incident</p>
          <p className="text-lg font-medium text-white">45 days ago</p>
          <p className="text-sm text-white/50 mt-4">Next Maintenance</p>
          <p className="text-lg font-medium text-white">No scheduled maintenance</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden mb-12">
        <div className="p-6 border-b border-white/5 bg-white/[0.02]">
          <h3 className="font-bold text-lg">Current Status</h3>
        </div>
        <div className="divide-y divide-white/5">
          {[
            { label: 'API Services', icon: Server, status: 'Operational' },
            { label: 'Website & Dashboard', icon: Globe2, status: 'Operational' },
            { label: 'Database & Storage', icon: Database, status: 'Operational' },
            { label: 'Global CDN', icon: Activity, status: 'Operational' },
          ].map((service, i) => (
            <div key={i} className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <service.icon className="w-5 h-5 text-white/70" />
                </div>
                <span className="font-medium text-lg">{service.label}</span>
              </div>
              <div className="flex items-center gap-2 text-green-400 font-medium">
                <CheckCircle2 className="w-5 h-5" /> {service.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-8">
        <h3 className="font-bold text-xl mb-6">Recent Incidents</h3>
        <div className="p-8 text-center border-2 border-dashed border-white/10 rounded-2xl">
          <p className="text-white/50">No Issues Found in the past 30 days.</p>
        </div>
      </div>
    </div>
  )
}
