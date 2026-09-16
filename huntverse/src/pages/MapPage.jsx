import MapView from '../components/MapView'
import { Badge } from '../components/ui'
import { zones as zoneMeta } from '../data/mockData'
import { useGameStore } from '../store/useGameStore'

const legend = [
  { label: 'Safe Zone', tone: 'blue' },
  { label: 'Bonus Zone', tone: 'gold' },
  { label: 'Contested / Danger', tone: 'red' },
  { label: 'Secret Zone', tone: 'purple' }
]

export default function MapPage() {
  const zones = useGameStore((s) => s.zones)

  return (
    <div className="space-y-4">
      <MapView height="h-[calc(100vh-220px)] min-h-[420px]" />
      <div className="flex flex-wrap gap-2">
        {legend.map((l) => <Badge key={l.label} tone={l.tone}>{l.label}</Badge>)}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {zones.map((z) => (
          <div key={z._id || z.id} className="glass rounded-xl p-3">
            <p className="text-sm font-semibold text-white">{z.name}</p>
            <p className="mt-1 text-xs capitalize text-slate-500">{z.type} zone{z.owner ? ` · Owned by ${z.owner}` : ''}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
