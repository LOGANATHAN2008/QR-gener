import { motion } from 'framer-motion'
import { Briefcase, Laptop, Clock, BookOpen, TrendingUp, CheckCircle2 } from 'lucide-react'

const POSITIONS = [
  { id: 1, role: 'Frontend Developer', type: 'Full-time', location: 'Remote' },
  { id: 2, role: 'Backend Developer', type: 'Full-time', location: 'Remote' },
  { id: 3, role: 'UI/UX Designer', type: 'Full-time', location: 'Remote' },
  { id: 4, role: 'Marketing Intern', type: 'Internship', location: 'Remote' },
  { id: 5, role: 'Support Executive', type: 'Full-time', location: 'Remote' },
]

export default function Careers() {
  return (
    <div className="pt-32 pb-24 container-app">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <h1 className="text-4xl font-bold mb-4">Careers at QRVerse</h1>
        <p className="text-white/60 text-lg">Join our mission to revolutionize how the world connects through QR technology.</p>
      </motion.div>

      <div className="mb-24">
        <h2 className="text-2xl font-bold text-center mb-10">Why join us?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Laptop, title: 'Remote Work', desc: 'Work from anywhere in the world' },
            { icon: Clock, title: 'Flexible Hours', desc: 'Work when you are most productive' },
            { icon: BookOpen, title: 'Learning Budget', desc: 'Annual stipend for courses and books' },
            { icon: TrendingUp, title: 'Growth', desc: 'Fast-paced growth opportunities' },
          ].map((benefit, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={benefit.title}
              className="glass-card p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">{benefit.title}</h3>
              <p className="text-sm text-white/50">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <Briefcase className="w-6 h-6 text-primary" />
          Open Positions
        </h2>
        <div className="space-y-4">
          {POSITIONS.map((pos, i) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={pos.id}
              className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-primary/40 transition-colors"
            >
              <div>
                <h3 className="text-xl font-bold mb-2">{pos.role}</h3>
                <div className="flex items-center gap-4 text-sm text-white/50">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-primary" /> {pos.type}</span>
                  <span>•</span>
                  <span>{pos.location}</span>
                </div>
              </div>
              <button className="btn-primary py-2 px-6">Apply Now</button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
