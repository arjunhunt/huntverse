import { useState } from 'react'
import { Play, Pause, Plus, Zap, MapPinned, Square, Flag } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { Button, Badge } from '../components/ui'
import MapView from '../components/MapView'
import { hostStats, antiCheatAlerts } from '../data/mockData'
import { useGameStore } from '../store/useGameStore'

const severityTone = { high: 'red', medium: 'gold', low: 'blue' }

export default function HostDashboard() {
  const pushNotification = useGameStore((s) => s.pushNotification)
  const [running, setRunning] = useState(true)

  const act = (label) => pushNotification('🕹️', `Host action: ${label}`)

  return (
    <div className="space-y-4">
      <div className="glass flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
        <p className="font-display text-sm font-bold text-white">Campus Hunt 2026 — Host Controls</p>
        <div className="flex flex-wrap gap-2">
          <Button variant={running ? 'ghost' : 'primary'} className="!text-xs" onClick={() => { setRunning((r) => !r); act(running ? 'Pause Game' : 'Start Game') }}>
            {running ? <Pause size={14} /> : <Play size={14} />} {running ? 'Pause Game' : 'Start Game'}
          </Button>
          <Button variant="ghost" className="!text-xs" onClick={() => act('Create Mission')}><Plus size={14} /> Create Mission</Button>
          <Button variant="purple" className="!text-xs" onClick={() => act('Activate Event')}><Zap size={14} /> Activate Event</Button>
          <Button variant="ghost" className="!text-xs" onClick={() => act('Change Zone')}><MapPinned size={14} /> Change Zone</Button>
          <Button variant="danger" className="!text-xs" onClick={() => act('End Game')}><Square size={14} /> End Game</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Active Players" value={hostStats.activePlayers} icon="Users" tone="green" />
        <StatCard label="Teams" value={hostStats.teams} icon="Shield" tone="blue" />
        <StatCard label="Current Missions" value={hostStats.currentMissions} icon="Target" tone="gold" />
        <StatCard label="Game Time" value={hostStats.gameTime} icon="Clock" tone="purple" />
        <StatCard label="Total Points" value={hostStats.totalPoints.toLocaleString()} icon="Trophy" tone="gold" />
        <StatCard label="Zones" value={hostStats.zones} icon="Flag" tone="green" />
        <StatCard label="Completion Rate" value={`${hostStats.completionRate}%`} icon="CheckCircle2" tone="blue" />
        <StatCard label="Suspicious Activity" value={hostStats.suspiciousActivity} icon="AlertTriangle" tone="purple" />
      </div>

      <MapView height="h-80" />

      <div className="glass rounded-2xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-display text-sm font-bold text-white">Anti-Cheat Monitor</p>
          <Badge tone="red">{antiCheatAlerts.length} Alerts</Badge>
        </div>
        <div className="space-y-2">
          {antiCheatAlerts.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/8 bg-white/5 p-3">
              <div>
                <p className="text-sm font-semibold text-white">{a.player}</p>
                <p className="text-xs text-slate-500">{a.violation} · {a.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={severityTone[a.severity]}>{a.severity}</Badge>
                <Button variant="ghost" className="!px-2 !py-1 !text-[10px]" onClick={() => act(`Review ${a.player}`)}>Review</Button>
                <Button variant="gold" className="!px-2 !py-1 !text-[10px]" onClick={() => act(`Warn ${a.player}`)}>Warn</Button>
                <Button variant="danger" className="!px-2 !py-1 !text-[10px]" onClick={() => act(`Penalize ${a.player}`)}>Penalize</Button>
                <Button variant="ghost" className="!px-2 !py-1 !text-[10px] !text-signal-red" onClick={() => act(`Disqualify ${a.player}`)}>
                  <Flag size={11} /> DQ
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
