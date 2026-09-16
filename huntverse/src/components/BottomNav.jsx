import { NavLink } from 'react-router-dom'
import { Home, Map, Target, MessageSquare, User } from 'lucide-react'

const links = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/map', label: 'Map', icon: Map },
  { to: '/missions', label: 'Missions', icon: Target },
  { to: '/chat', label: 'Chat', icon: MessageSquare },
  { to: '/profile', label: 'Profile', icon: User }
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-white/10 bg-void-950/95 backdrop-blur-lg lg:hidden">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `focus-ring flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium ${
              isActive ? 'text-signal-green' : 'text-slate-500'
            }`
          }
        >
          <Icon size={19} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
