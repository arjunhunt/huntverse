import { PowerCard } from '../components/PowerCard'
import { useGameStore } from '../store/useGameStore'

export default function Powers() {
  const powers = useGameStore((s) => s.powers)
  const usePower = useGameStore((s) => s.usePower)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {(powers || []).map((p) => (
        <PowerCard key={p.id} power={p} onActivate={usePower} />
      ))}
    </div>
  )
}
