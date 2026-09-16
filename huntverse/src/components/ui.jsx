import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const variants = {
  primary: 'bg-signal-green text-void-950 hover:shadow-glow',
  purple: 'bg-signal-purple text-white hover:shadow-glow-purple',
  blue: 'bg-signal-blue text-void-950 hover:shadow-glow-blue',
  gold: 'bg-signal-gold text-void-950 hover:shadow-glow-gold',
  danger: 'bg-signal-red text-white hover:shadow-glow-red',
  ghost: 'bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10',
  outline: 'bg-transparent border border-signal-green/50 text-signal-green hover:bg-signal-green/10'
}

export function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold font-display tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Badge({ children, tone = 'green', className = '' }) {
  const tones = {
    green: 'bg-signal-green/15 text-signal-green border-signal-green/30',
    purple: 'bg-signal-purple/15 text-signal-purple border-signal-purple/30',
    blue: 'bg-signal-blue/15 text-signal-blue border-signal-blue/30',
    gold: 'bg-signal-gold/15 text-signal-gold border-signal-gold/30',
    red: 'bg-signal-red/15 text-signal-red border-signal-red/30',
    gray: 'bg-white/10 text-slate-300 border-white/15'
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}

export function ProgressBar({ value, max = 100, tone = 'green', className = '' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const tones = { green: '#39FF88', purple: '#9B5CFF', blue: '#3AB4FF', gold: '#FBBF3C', red: '#FF4D5E' }
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-white/5 ${className}`}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: tones[tone] }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  )
}

export function Modal({ open, onClose, title, children, wide }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`glass-strong w-full ${wide ? 'max-w-2xl' : 'max-w-md'} rounded-2xl p-6 shadow-2xl`}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
              <button onClick={onClose} className="focus-ring rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white">
                <X size={18} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-xl border border-white/10 bg-white/5 p-1">
      {tabs.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={`focus-ring relative whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
            active === t.value ? 'text-void-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          {active === t.value && (
            <motion.div layoutId="tab-pill" className="absolute inset-0 rounded-lg bg-signal-green" transition={{ type: 'spring', duration: 0.4 }} />
          )}
          <span className="relative z-10">{t.label}</span>
        </button>
      ))}
    </div>
  )
}
