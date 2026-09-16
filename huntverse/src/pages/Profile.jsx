import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts'
import { StatCard } from '../components/StatCard'
import { ProgressBar } from '../components/ui'
import { useGameStore } from '../store/useGameStore'
import { weeklyPerformance, missionCompletionData, winRateTrend } from '../data/mockData'

const pieColors = ['#39FF88', '#FF4D5E', '#3AB4FF']

export default function Profile() {
  const user = useGameStore((s) => s.user)
  const xp = useGameStore((s) => s.xp)

  return (
    <div className="space-y-4">
      <div className="glass flex flex-wrap items-center gap-5 rounded-2xl p-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-signal-green to-signal-blue font-display text-2xl font-bold text-void-950">
          {user?.avatar || user?.username?.[0] || '?'}
        </div>
        <div className="min-w-[200px] flex-1">
          <h2 className="font-display text-2xl font-bold text-white">{user?.name || user?.username}</h2>
          <p className="text-sm text-slate-500">{user?.title || 'Hunter'} · {user?.team || 'Solo'}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-signal-purple/15 px-2.5 py-0.5 text-xs font-semibold text-signal-purple">Level {user?.level || Math.floor(xp / 1000) + 1}</span>
            <span className="text-xs text-slate-500">{xp.toLocaleString()} / {user?.xpToNext || ((Math.floor(xp / 1000) + 1) * 1000).toLocaleString()} XP</span>
          </div>
          <ProgressBar value={xp % 1000} max={1000} tone="purple" className="mt-2 max-w-xs" />
        </div>
        <div className="text-right">
          <p className="text-2xl font-display font-bold text-signal-gold">{user?.huntRating || 1200}</p>
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Hunt Rating</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Missions" value={user?.stats?.missionsCompleted || user?.achievements?.length || 0} icon="Target" tone="green" />
        <StatCard label="Hunts" value={user?.stats?.successfulHunts || 0} icon="Crosshair" tone="blue" />
        <StatCard label="Accuracy" value={`${user?.stats?.accuracy || 90}%`} icon="Percent" tone="gold" />
        <StatCard label="Avg. Time" value={user?.stats?.avgTime || '5.2 min'} icon="Timer" tone="purple" />
        <StatCard label="Zones" value={user?.stats?.zonesCaptured || 0} icon="Flag" tone="green" />
        <StatCard label="Win Rate" value={`${user?.stats?.winRate || 75}%`} icon="TrendingUp" tone="blue" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-4 lg:col-span-2">
          <p className="mb-3 font-display text-sm font-bold text-white">Weekly Performance</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyPerformance}>
              <defs>
                <linearGradient id="pts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#39FF88" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#39FF88" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={30} />
              <Tooltip contentStyle={{ background: '#0d1220', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="points" stroke="#39FF88" fill="url(#pts)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-4">
          <p className="mb-3 font-display text-sm font-bold text-white">Mission Completion</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={missionCompletionData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {missionCompletionData.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0d1220', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-2xl p-4">
        <p className="mb-3 font-display text-sm font-bold text-white">Win Rate Trend</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={winRateTrend}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={30} />
            <Tooltip contentStyle={{ background: '#0d1220', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 12 }} />
            <Line type="monotone" dataKey="rate" stroke="#3AB4FF" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
