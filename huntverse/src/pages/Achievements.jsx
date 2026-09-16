import { AchievementCard } from '../components/StatCard'
import { achievements as achievementsDict } from '../data/mockData'
import { useGameStore } from '../store/useGameStore'

export default function Achievements() {
  const user = useGameStore((s) => s.user)
  const userAchievements = user?.achievements || []

  const achievements = achievementsDict.map(a => {
    const userA = userAchievements.find(ua => ua.id === a.id)
    return {
      ...a,
      unlocked: userA?.unlocked || false,
      progress: userA?.progress || 0
    }
  })

  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-4">
        <p className="text-sm text-slate-400">
          <span className="font-display text-lg font-bold text-signal-gold">{unlockedCount}</span> / {achievements.length} achievements unlocked
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a) => <AchievementCard key={a.id} achievement={a} />)}
      </div>
    </div>
  )
}
