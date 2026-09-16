import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'

export default function NotificationStack() {
  const notifications = useGameStore((s) => s.notifications)
  const dismiss = useGameStore((s) => s.dismissNotification)

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-xs flex-col gap-2">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="glass-strong pointer-events-auto flex items-start gap-3 rounded-xl border-l-2 border-signal-green p-3 shadow-2xl"
          >
            <span className="text-lg leading-none">{n.icon}</span>
            <p className="flex-1 text-sm text-slate-200">{n.text}</p>
            <button onClick={() => dismiss(n.id)} className="focus-ring text-slate-500 hover:text-white">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
