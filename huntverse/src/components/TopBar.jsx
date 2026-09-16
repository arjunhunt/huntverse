import { Coins, Bell, Menu } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'

export default function TopBar({ title, subtitle, onMenu }) {
  const coins = useGameStore((s) => s.coins)
  const points = useGameStore((s) => s.points)

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-white/8 bg-void-900/80 px-4 py-4 backdrop-blur-lg lg:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="focus-ring rounded-lg p-1.5 text-slate-400 hover:bg-white/10 lg:hidden">
          <Menu size={20} />
        </button>
        <div>
          <h1 className="font-display text-lg font-semibold text-white lg:text-xl">{title}</h1>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        <div className="glass hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-signal-gold sm:flex">
          <Coins size={14} /> {(coins || 0).toLocaleString()}
        </div>
        <div className="glass hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-signal-green md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-signal-green animate-pulse" /> {(points || 0).toLocaleString()} pts
        </div>
        <button className="focus-ring relative rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-white/10">
          <Bell size={17} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-signal-red" />
        </button>
      </div>
    </header>
  )
}
