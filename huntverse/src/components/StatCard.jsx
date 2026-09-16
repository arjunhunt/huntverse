import * as Icons from 'lucide-react'
import { ProgressBar } from './ui'

export function StatCard({ label, value, icon, tone = 'green' }) {
  const Icon = Icons[icon] || Icons.Activity
  const tones = { green: 'text-signal-green bg-signal-green/12', blue: 'text-signal-blue bg-signal-blue/12', purple: 'text-signal-purple bg-signal-purple/12', gold: 'text-signal-gold bg-signal-gold/12' }
  return (
    <div className="glass flex items-center gap-3 rounded-xl p-4">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-lg font-display font-bold text-white leading-none">{value}</p>
        <p className="mt-1 text-[11px] uppercase tracking-wide text-slate-500">{label}</p>
      </div>
    </div>
  )
}

export function AchievementCard({ achievement }) {
  const Icon = Icons[achievement.icon] || Icons.Award
  return (
    <div className={`glass rounded-2xl p-4 ${achievement.unlocked ? '' : 'opacity-70'}`}>
      <div className="mb-3 flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${achievement.unlocked ? 'bg-signal-gold/15 text-signal-gold' : 'bg-white/5 text-slate-500'}`}>
          <Icon size={20} />
        </div>
        {achievement.unlocked ? (
          <span className="rounded-full bg-signal-green/15 px-2 py-0.5 text-[10px] font-bold uppercase text-signal-green">Unlocked</span>
        ) : (
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500">Locked</span>
        )}
      </div>
      <p className="font-display text-sm font-bold text-white">{achievement.name}</p>
      <p className="mt-1 text-xs text-slate-500">{achievement.desc}</p>
      <div className="mt-3 flex items-center gap-2">
        <ProgressBar value={achievement.progress} tone={achievement.unlocked ? 'gold' : 'green'} />
        <span className="w-9 shrink-0 text-right text-[10px] text-slate-500">{achievement.progress}%</span>
      </div>
    </div>
  )
}
