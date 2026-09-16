import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MapView from '../components/MapView'
import GameHUD from '../components/GameHUD'
import { CurrentMissionCard, MissionCard } from '../components/MissionCard'
import { TeamCard } from '../components/TeamCard'
import ChatPanel from '../components/ChatPanel'
import LeaderboardTable from '../components/Leaderboard'
import { AIAdvisor } from '../components/AIAdvisor'
import { PowerCard, InventoryCard } from '../components/PowerCard'
import { VerificationModal } from '../components/MissionModal'
import { useGameStore } from '../store/useGameStore'

export default function Dashboard() {
  const navigate = useNavigate()
  const missions = useGameStore((s) => s.missions)
  const startMission = useGameStore((s) => s.startMission)
  const powers = useGameStore((s) => s.powers)
  const usePower = useGameStore((s) => s.usePower)
  const inventory = useGameStore((s) => s.inventory)
  const pushNotification = useGameStore((s) => s.pushNotification)
  const [verifyOpen, setVerifyOpen] = useState(false)
  const completeMission = useGameStore((s) => s.completeMission)
  const team = useGameStore((s) => s.team)
  const leaderboard = useGameStore((s) => s.leaderboard)

  const active = missions.filter((m) => m.status === 'active').slice(0, 2)
  const currentMission = active[0] || missions[0] || {}

  return (
    <div className="space-y-4">
      <GameHUD />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Center: map + mission */}
        <div className="space-y-4">
          <MapView />
          <CurrentMissionCard
            mission={currentMission}
            onHint={() => pushNotification('🤖', currentMission.hint)}
            onUpload={() => setVerifyOpen(true)}
            onNavigate={() => navigate('/map')}
          />
          <AIAdvisor onAccept={() => pushNotification('🎯', 'New AI mission accepted.')} onHint={() => pushNotification('🤖', currentMission.hint)} />
        </div>

        {/* Right rail */}
        <div className="space-y-4">
          <div className="glass rounded-2xl p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-display text-sm font-bold text-white">{team.name}</p>
              <span className="text-xs text-slate-500">Rank #{team.rank} · {team.score} pts</span>
            </div>
            <div className="space-y-2">
              {team.members.slice(0, 4).map((m) => <TeamCard key={m.id} member={m} />)}
            </div>
          </div>

          <div className="glass rounded-2xl p-4">
            <p className="mb-3 font-display text-sm font-bold text-white">Leaderboard</p>
            <LeaderboardTable rows={(leaderboard || []).slice(0, 5).map((u, i) => ({
              rank: u.rank || i + 1, 
              team: u.team || u.username || 'Unknown', 
              score: u.score || u.points || 0, 
              players: u.players || 1, 
              missions: u.missions || Math.floor((u.xp || 0) / 100), 
              winRate: u.winRate || 100, 
              isUser: u.isUser || false
            }))} />
          </div>

          <ChatPanel compact />
        </div>
      </div>

      {/* Bottom: missions, inventory, powers */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-4">
          <p className="mb-3 font-display text-sm font-bold text-white">Missions</p>
          <div className="space-y-3">
            {active.map((m) => (
              <MissionCard key={m._id || m.id} mission={m} onOpen={() => navigate('/missions')} onStart={startMission} />
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <p className="mb-3 font-display text-sm font-bold text-white">Inventory</p>
          <div className="grid grid-cols-2 gap-3">
            {inventory.slice(0, 2).map((i) => <InventoryCard key={i.id} item={i} onUse={() => pushNotification('🎒', `Used ${i.name}.`)} />)}
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <p className="mb-3 font-display text-sm font-bold text-white">Powers</p>
          <div className="grid grid-cols-2 gap-3">
            {powers.slice(0, 2).map((p) => <PowerCard key={p.id} power={p} onActivate={usePower} />)}
          </div>
        </div>
      </div>

      <VerificationModal mission={currentMission} open={verifyOpen} onClose={() => setVerifyOpen(false)} onConfirm={() => completeMission(currentMission._id || currentMission.id)} />
    </div>
  )
}
