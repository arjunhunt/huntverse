import { useState } from 'react'
import GameHUD from '../components/GameHUD'
import MapView from '../components/MapView'
import { CurrentMissionCard } from '../components/MissionCard'
import { AIAdvisor, AIClueModal } from '../components/AIAdvisor'
import { VerificationModal } from '../components/MissionModal'
import { useGameStore } from '../store/useGameStore'

export default function Game() {
  const [verifyOpen, setVerifyOpen] = useState(false)
  const [clueOpen, setClueOpen] = useState(false)
  const completeMission = useGameStore((s) => s.completeMission)
  const pushNotification = useGameStore((s) => s.pushNotification)
  const missions = useGameStore((s) => s.missions)
  const currentMission = missions.find(m => m.status === 'active') || missions[0] || {}

  return (
    <div className="space-y-4">
      <GameHUD />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <MapView height="h-[520px]" />
        <div className="space-y-4">
          <CurrentMissionCard
            mission={currentMission}
            onHint={() => pushNotification('🤖', currentMission.hint)}
            onUpload={() => setVerifyOpen(true)}
            onNavigate={() => pushNotification('🧭', 'Navigation started — follow the compass North-East.')}
          />
          <AIAdvisor onAccept={() => pushNotification('🎯', 'New AI mission accepted.')} onHint={() => setClueOpen(true)} />
        </div>
      </div>
      <VerificationModal mission={currentMission} open={verifyOpen} onClose={() => setVerifyOpen(false)} onConfirm={() => completeMission(currentMission._id || currentMission.id)} />
      <AIClueModal open={clueOpen} onClose={() => setClueOpen(false)} />
    </div>
  )
}
