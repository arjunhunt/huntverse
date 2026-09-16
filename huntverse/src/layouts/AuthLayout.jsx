import { Outlet, Navigate } from 'react-router-dom'
import { Crosshair } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { liveGameStats } from '../data/mockData'

export default function AuthLayout() {
  const isAuthenticated = useGameStore((s) => s.isAuthenticated)
  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void-950 px-4 py-10 hex-grid-bg">
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-signal-green/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-72 w-72 rounded-full bg-signal-purple/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-signal-green/15 text-signal-green shadow-glow">
            <Crosshair size={28} />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-wide text-white">HUNTVERSE</h1>
          <p className="mt-1 text-sm text-slate-500">The Real World Is Your Game Map.</p>
        </div>

        <Outlet />

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[11px] text-slate-500">
          <span><span className="font-semibold text-signal-green">{liveGameStats.hunters.toLocaleString()}</span> Hunters Online</span>
          <span><span className="font-semibold text-signal-blue">{liveGameStats.missions.toLocaleString()}</span> Active Missions</span>
          <span><span className="font-semibold text-signal-gold">{liveGameStats.games.toLocaleString()}</span> Live Games</span>
        </div>
      </div>
    </div>
  )
}
