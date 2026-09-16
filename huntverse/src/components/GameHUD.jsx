import { Users, Trophy, Clock, Radio } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'

export default function GameHUD() {
  const points = useGameStore((s) => s.points)
  const team = useGameStore((s) => s.team)

  return (
    <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4">
      <div>
        <p className="font-display text-base font-bold text-white">Campus Hunt 2026</p>
        <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-signal-green">
          <Radio size={12} className="animate-pulse" /> LIVE
        </div>
      </div>

      <div className="flex items-center gap-5 text-sm">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Clock size={15} className="text-signal-gold" />
          <span className="font-mono font-semibold">58:12</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <Users size={15} className="text-signal-blue" />
          <span className="font-semibold">{team?.members?.length || 1}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <Trophy size={15} className="text-signal-purple" />
          <span className="font-semibold">#{team?.rank || 3}</span>
        </div>
        <div className="hidden items-center gap-1.5 text-signal-green sm:flex">
          <span className="font-display font-bold">{(points || 0).toLocaleString()} pts</span>
        </div>
      </div>
    </div>
  )
}
