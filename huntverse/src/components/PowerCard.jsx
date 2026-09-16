import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Button, Badge } from './ui'

const toneMap = {
  blue: 'bg-signal-blue/15 text-signal-blue',
  green: 'bg-signal-green/15 text-signal-green',
  purple: 'bg-signal-purple/15 text-signal-purple',
  gold: 'bg-signal-gold/15 text-signal-gold',
  red: 'bg-signal-red/15 text-signal-red'
}

export function PowerCard({ power, onActivate }) {
  const [firing, setFiring] = useState(false)
  const Icon = Icons[power.icon] || Icons.Zap
  const disabled = power.qty <= 0

  const handle = () => {
    if (disabled) return
    setFiring(true)
    onActivate(power.id)
    setTimeout(() => setFiring(false), 700)
  }

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-4">
      <AnimatePresence>
        {firing && (
          <motion.div
            className="pointer-events-none absolute inset-0 bg-white/20"
            initial={{ opacity: 0.6 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
      <div className="mb-3 flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneMap[power.color]}`}>
          <Icon size={18} />
        </div>
        <Badge tone="gray">x{power.qty}</Badge>
      </div>
      <p className="font-display text-sm font-bold text-white">{power.name}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">{power.desc}</p>
      <Button
        className="mt-3 w-full !text-xs"
        variant={power.color === 'green' ? 'primary' : power.color}
        disabled={disabled}
        onClick={handle}
      >
        {disabled ? 'Empty' : 'Activate'}
      </Button>
    </div>
  )
}

export function InventoryCard({ item, onUse }) {
  const Icon = Icons[item.icon] || Icons.Package
  return (
    <div className="glass flex flex-col gap-3 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal-blue/15 text-signal-blue">
          <Icon size={18} />
        </div>
        <Badge tone="gray">x{item.qty}</Badge>
      </div>
      <div>
        <p className="font-display text-sm font-bold text-white">{item.name}</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.desc}</p>
      </div>
      <Button variant="outline" className="!text-xs" disabled={item.qty <= 0} onClick={() => onUse(item.id)}>
        {item.qty <= 0 ? 'Empty' : 'Use Item'}
      </Button>
    </div>
  )
}
