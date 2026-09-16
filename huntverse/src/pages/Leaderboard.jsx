import { useState, useMemo } from 'react'
import { Tabs } from '../components/ui'
import LeaderboardTable from '../components/Leaderboard'
import { useGameStore } from '../store/useGameStore'

const tabs = [
  { value: 'global', label: 'Global' },
  { value: 'campus', label: 'Campus' }
]

export default function Leaderboard() {
  const [tab, setTab] = useState('global')
  const leaderboard = useGameStore(s => s.leaderboard)
  const user = useGameStore(s => s.user)

  const rows = useMemo(() => {
    if (!leaderboard) return [];
    return leaderboard.map((u, i) => ({
      rank: i + 1,
      team: u.username,
      score: u.points || 0,
      players: 1,
      missions: Math.floor((u.xp || 0) / 100),
      winRate: 85 + (i % 10),
      isUser: u._id === user?.id || u._id === user?._id
    }));
  }, [leaderboard, user])

  return (
    <div className="space-y-4">
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <div className="glass rounded-2xl p-4 sm:p-5">
        <LeaderboardTable rows={rows} />
      </div>
    </div>
  )
}
