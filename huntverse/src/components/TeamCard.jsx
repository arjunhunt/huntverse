import { MapPin } from 'lucide-react'
import { Badge } from './ui'

export function TeamCard({ member }) {
  return (
    <div className="glass flex items-center gap-3 rounded-xl p-3">
      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-signal-blue to-signal-purple font-display text-sm font-bold text-white">
          {member.avatar}
        </div>
        <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-void-900 ${member.online ? 'bg-signal-green' : 'bg-slate-600'}`} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-white">{member.name}</p>
          <Badge tone="gray" className="!py-0.5">{member.role}</Badge>
        </div>
        <p className="truncate text-xs text-slate-500">{member.mission}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-signal-gold">{member.points}</p>
        <p className="flex items-center justify-end gap-0.5 text-[10px] text-slate-500"><MapPin size={10} /> {member.distance}</p>
      </div>
    </div>
  )
}
