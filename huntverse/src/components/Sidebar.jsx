import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Play, PlusCircle, LogIn, Users, Map, Target, MessageSquare,
  Trophy, Backpack, Zap, Award, ShoppingBag, Settings, Crosshair
} from 'lucide-react'
import { useGameStore } from '../store/useGameStore'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/game', label: 'Quick Play', icon: Play },
  { to: '/create-game', label: 'Create Game', icon: PlusCircle },
  { to: '/join-game', label: 'Join Game', icon: LogIn },
  { to: '/team', label: 'My Team', icon: Users },
  { to: '/map', label: 'Map', icon: Map },
  { to: '/missions', label: 'Missions', icon: Target },
  { to: '/chat', label: 'Chat', icon: MessageSquare },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/inventory', label: 'Inventory', icon: Backpack },
  { to: '/powers', label: 'Powers', icon: Zap },
  { to: '/achievements', label: 'Achievements', icon: Award },
  { to: '/store', label: 'Store', icon: ShoppingBag },
  { to: '/settings', label: 'Settings', icon: Settings }
]

export default function Sidebar({ mobile = false }) {
  const user = useGameStore((s) => s.user)
  const xp = useGameStore((s) => s.xp)

  return (
    <aside className={`${mobile ? 'flex w-64' : 'hidden lg:flex lg:w-64'} flex-col shrink-0 border-r border-white/8 bg-void-950/60 h-full`}>
      <div className="flex items-center gap-2 px-5 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal-green/15 text-signal-green">
          <Crosshair size={20} />
        </div>
        <div>
          <p className="font-display text-lg font-bold leading-none tracking-wide text-white">HUNTVERSE</p>
          <p className="text-[10px] uppercase tracking-widest text-slate-500">Real world game map</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `focus-ring group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-signal-green/12 text-signal-green' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <NavLink to="/profile" className="focus-ring m-3 flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 p-3 hover:bg-white/8">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-signal-green to-signal-blue font-display font-bold text-void-950">
          {user?.avatar || user?.username?.[0] || '?'}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{user?.name || user?.username}</p>
          <p className="text-[11px] text-slate-500">Level {user?.level || Math.floor((xp || 0) / 1000) + 1}</p>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-signal-green" style={{ width: `${((xp || 0) % 1000) / 10}%` }} />
          </div>
        </div>
      </NavLink>
    </aside>
  )
}
