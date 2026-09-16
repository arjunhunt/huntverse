import { useMemo, useState } from 'react'
import { Tabs } from '../components/ui'
import { MissionCard } from '../components/MissionCard'
import { MissionModal, VerificationModal } from '../components/MissionModal'
import { useGameStore } from '../store/useGameStore'

const tabs = [
  { value: 'active', label: 'Active' },
  { value: 'available', label: 'Available' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
  { value: 'bonus', label: 'Bonus' }
]

export default function Missions() {
  const missions = useGameStore((s) => s.missions)
  const startMission = useGameStore((s) => s.startMission)
  const completeMission = useGameStore((s) => s.completeMission)
  const [tab, setTab] = useState('active')
  const [selected, setSelected] = useState(null)
  const [verifyMission, setVerifyMission] = useState(null)

  const filtered = useMemo(() => missions.filter((m) => m.status === tab), [missions, tab])

  return (
    <div className="space-y-4">
      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center text-sm text-slate-500">
          No {tab} missions right now. New objectives appear as the AI Game Master scans the area.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((m) => (
            <MissionCard key={m._id || m.id} mission={m} onOpen={setSelected} onStart={startMission} />
          ))}
        </div>
      )}

      <MissionModal
        mission={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onStart={startMission}
        onUpload={(m) => setVerifyMission(m)}
      />
      <VerificationModal
        mission={verifyMission}
        open={!!verifyMission}
        onClose={() => setVerifyMission(null)}
        onConfirm={() => verifyMission && completeMission(verifyMission._id || verifyMission.id)}
      />
    </div>
  )
}
