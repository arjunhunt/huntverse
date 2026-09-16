import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui'
import { useGameStore } from '../store/useGameStore'

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`focus-ring relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-signal-green' : 'bg-white/10'}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )
}

const initialSettings = [
  { key: 'notifications', label: 'Push notifications', desc: 'Mission alerts, zone changes, and team messages.', on: true },
  { key: 'location', label: 'Precise location sharing', desc: 'Share your exact GPS position with teammates.', on: true },
  { key: 'sound', label: 'Sound effects', desc: 'Play sounds for missions, powers, and chat.', on: true },
  { key: 'darkmap', label: 'Tactical map mode', desc: 'Use the dark tactical map theme.', on: true }
]

export default function Settings() {
  const [settings, setSettings] = useState(initialSettings)
  const logout = useGameStore((s) => s.logout)
  const navigate = useNavigate()

  const toggle = (key) => setSettings((s) => s.map((i) => i.key === key ? { ...i, on: !i.on } : i))

  return (
    <div className="max-w-2xl space-y-4">
      <div className="glass divide-y divide-white/8 rounded-2xl">
        {settings.map((s) => (
          <div key={s.key} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="text-sm font-semibold text-white">{s.label}</p>
              <p className="mt-0.5 text-xs text-slate-500">{s.desc}</p>
            </div>
            <Toggle checked={s.on} onChange={() => toggle(s.key)} />
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-4">
        <p className="mb-1 text-sm font-semibold text-white">Account</p>
        <p className="mb-3 text-xs text-slate-500">Manage your session and account access.</p>
        <Button variant="danger" onClick={() => { logout(); navigate('/login') }}>
          <LogOut size={15} /> Log out
        </Button>
      </div>
    </div>
  )
}
