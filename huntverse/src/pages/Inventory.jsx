import { InventoryCard } from '../components/PowerCard'
import { useGameStore } from '../store/useGameStore'

export default function Inventory() {
  const inventory = useGameStore((s) => s.inventory)
  const pushNotification = useGameStore((s) => s.pushNotification)

  const useItem = (id) => {
    const item = inventory.find((i) => i.id === id)
    if (!item || item.qty <= 0) return
    useGameStore.setState((s) => ({ inventory: s.inventory.map((i) => i.id === id ? { ...i, qty: i.qty - 1 } : i) }))
    pushNotification('🎒', `Used ${item.name}.`)
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {(inventory || []).map((item) => (
        <InventoryCard key={item.id} item={item} onUse={useItem} />
      ))}
    </div>
  )
}
