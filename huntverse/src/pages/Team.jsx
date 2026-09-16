import { MessageSquare, Mic, UserPlus } from 'lucide-react'
import { TeamCard } from '../components/TeamCard'
import { Button } from '../components/ui'
import { useGameStore } from '../store/useGameStore'
import { useNavigate } from 'react-router-dom'

export default function Team() {
  const navigate = useNavigate()
  const team = useGameStore((s) => s.team)
  const pushNotification = useGameStore((s) => s.pushNotification)

  return (
    <div className="space-y-4">
      <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
        <div>
          <h2 className="font-display text-xl font-bold text-white">{team.name}</h2>
          <p className="text-sm text-slate-500">Team Score: <span className="font-semibold text-signal-green">{team.score.toLocaleString()}</span> · Rank #{team.rank || 'N/A'}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-slate-400">Invite Code:</span>
            <code className="bg-void-950 px-2 py-1 rounded text-signal-gold font-mono text-sm border border-signal-gold/30">{team.inviteCode || 'HUNT-XYZ-2026'}</code>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
          <Button onClick={() => navigate('/chat')}><MessageSquare size={15} /> Team Chat</Button>
          <Button variant="purple" onClick={() => pushNotification('🎙️', 'Voice chat connecting…')}><Mic size={15} /> Voice Chat</Button>
          <Button variant="ghost" onClick={() => {
            navigator.clipboard.writeText(team.inviteCode || 'HUNT-XYZ-2026')
            pushNotification('✉️', `Invite code ${team.inviteCode || 'HUNT-XYZ-2026'} copied!`)
          }}><UserPlus size={15} /> Invite Member</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {team.members.map((m) => <TeamCard key={m.id} member={m} />)}
      </div>
    </div>
  )
}
