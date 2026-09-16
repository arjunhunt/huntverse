import * as Icons from 'lucide-react'
import { Coins } from 'lucide-react'
import { Button } from '../components/ui'
import { storeCategories } from '../data/mockData'
import { useGameStore } from '../store/useGameStore'

export default function Store() {
  const coins = useGameStore((s) => s.coins)
  const buyItem = useGameStore((s) => s.buyItem)
  const pushNotification = useGameStore((s) => s.pushNotification)

  const buy = async (item) => {
    if (coins < item.price) {
      pushNotification('🚫', `Not enough coins for ${item.name}.`)
      return
    }
    const success = await buyItem(item);
    if (success) {
      pushNotification('🛒', `Purchased ${item.name}.`)
    } else {
      pushNotification('🚫', `Purchase failed.`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="glass flex items-center justify-between rounded-2xl p-4">
        <p className="text-sm text-slate-400">Your balance</p>
        <div className="flex items-center gap-1.5 font-display text-xl font-bold text-signal-gold">
          <Coins size={20} /> {coins.toLocaleString()}
        </div>
      </div>

      {Object.entries(storeCategories).map(([category, items]) => (
        <div key={category}>
          <p className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-white">{category}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => {
              const Icon = Icons[item.icon] || Icons.Package
              return (
                <div key={item.id} className="glass flex flex-col items-center gap-2 rounded-2xl p-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-signal-purple/15 text-signal-purple">
                    <Icon size={20} />
                  </div>
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="flex items-center gap-1 text-xs font-semibold text-signal-gold"><Coins size={12} /> {item.price}</p>
                  <Button variant="outline" className="mt-1 w-full !text-xs" onClick={() => buy(item)}>Buy</Button>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
