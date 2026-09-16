import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, MapPin } from 'lucide-react'
import { Button } from '../components/ui'
import { gameModes } from '../data/mockData'
import { useGameStore } from '../store/useGameStore'
import api from '../api'

const steps = ['Name', 'Location', 'Boundary', 'Mode', 'Duration', 'Teams', 'Missions', 'Scoring', 'Launch']

export default function CreateGame() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '', location: 'Main Campus Quad', mode: 'classic', duration: 60,
    teams: 4, missions: 10, scoring: 'standard'
  })
  const navigate = useNavigate()
  const pushNotification = useGameStore((s) => s.pushNotification)

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const next = () => setStep((s) => Math.min(steps.length - 1, s + 1))
  const back = () => setStep((s) => Math.max(0, s - 1))

  const launch = async () => {
    try {
      await api.post('/game/create', form)
      pushNotification('🚀', `${form.name || 'Your game'} is now live!`)
      navigate('/host-dashboard')
    } catch (err) {
      pushNotification('🚫', 'Failed to create game')
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <div key={s} className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${
            i === step ? 'border-signal-green text-signal-green bg-signal-green/10' : i < step ? 'border-white/10 text-signal-green/70' : 'border-white/10 text-slate-500'
          }`}>
            {i < step ? <Check size={12} /> : <span>{i + 1}</span>} {s}
          </div>
        ))}
      </div>

      <div className="glass min-h-[280px] rounded-2xl p-6">
        {step === 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase text-slate-500">Game Name</p>
            <input
              value={form.name} onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Campus Hunt 2026"
              className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500"
            />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-xs font-semibold uppercase text-slate-500">Select Location</p>
              <button 
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (pos) => set('location', `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`),
                      () => pushNotification('🚫', 'GPS access denied')
                    )
                  }
                }}
                className="text-[10px] font-bold text-signal-green hover:text-white transition-colors flex items-center gap-1"
              >
                <MapPin size={12} /> USE REAL GPS
              </button>
            </div>
            <input
              value={form.location} onChange={(e) => set('location', e.target.value)}
              placeholder="Enter location or use GPS"
              className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            />
            <div className="relative h-48 overflow-hidden rounded-xl hex-grid-bg border border-white/10 flex items-center justify-center text-xs text-slate-500">
              {form.location.match(/^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/) ? (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(57,255,136,0.15),transparent_70%)]" />
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-signal-green shadow-glow animate-pulse" />
                    <span className="font-mono text-[10px] text-signal-green">{form.location}</span>
                  </div>
                </>
              ) : (
                "Map location preview"
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase text-slate-500">Draw Game Boundary (Polygon)</p>
            <div 
              className="relative h-64 overflow-hidden rounded-xl border border-white/10 hex-grid-bg bg-void-850 cursor-crosshair"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const pts = Array.isArray(form.boundary) ? form.boundary : [];
                setForm({ ...form, boundary: [...pts, { x, y }] });
              }}
            >
              {(!form.boundary || form.boundary.length === 0) ? (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs text-slate-500">
                  Click on the map to drop points and draw a custom shape
                </div>
              ) : (
                <svg className="pointer-events-none absolute inset-0 h-full w-full">
                  <polygon 
                    points={form.boundary.map(p => `${p.x},${p.y}`).join(' ')} 
                    fill="rgba(57,255,136,0.2)" 
                    stroke="#39FF88" 
                    strokeWidth="2" 
                    strokeDasharray="4"
                  />
                  {form.boundary.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="4" fill="#fff" stroke="#39FF88" strokeWidth="2" />
                  ))}
                </svg>
              )}
            </div>
            {form.boundary && form.boundary.length > 0 && (
              <div className="flex justify-between items-center text-[10px] text-signal-green">
                <span>{form.boundary.length} Points Dropped</span>
                <button className="hover:text-white" onClick={() => setForm({ ...form, boundary: null })}>Clear Boundary</button>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase text-slate-500">Select Game Mode</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {gameModes.map((m) => (
                <button
                  key={m.id} onClick={() => set('mode', m.id)}
                  className={`focus-ring rounded-xl border p-3 text-left ${form.mode === m.id ? 'border-signal-green bg-signal-green/10' : 'border-white/10 bg-white/5'}`}
                >
                  <p className="text-sm font-semibold text-white">{m.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase text-slate-500">Set Duration (minutes)</p>
            <input type="range" min="15" max="180" step="15" value={form.duration} onChange={(e) => set('duration', +e.target.value)} className="w-full accent-signal-green" />
            <p className="font-display text-2xl font-bold text-signal-green">{form.duration} min</p>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500 mb-2">Create Teams</p>
              <div className="flex items-center gap-4">
                <input type="number" min="2" max="16" value={form.teams} onChange={(e) => set('teams', +e.target.value)} className="focus-ring w-32 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                <p className="text-xs text-slate-500">Number of teams competing.</p>
              </div>
            </div>
            
            <div className="space-y-2 border-t border-white/10 pt-4">
              <p className="text-[10px] font-bold text-signal-green uppercase tracking-wider">Generated Team Join Codes</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {Array.from({ length: form.teams }).map((_, i) => {
                  const code = `HT-${String.fromCharCode(65 + (i % 26))}${Math.floor(Math.random() * 90 + 10)}-${i + 1}X`;
                  return (
                    <div key={i} className="flex justify-between items-center bg-void-950 px-3 py-2 rounded-lg border border-white/5">
                      <span className="text-xs font-medium text-slate-400">Team {i + 1}</span>
                      <code className="text-signal-gold font-mono text-xs font-bold tracking-widest">{code}</code>
                    </div>
                  )
                })}
              </div>
              <p className="text-[9px] text-slate-500">Players will use these codes to join their specific teams.</p>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase text-slate-500">Add Missions</p>
            <input type="number" min="1" max="40" value={form.missions} onChange={(e) => set('missions', +e.target.value)} className="focus-ring w-32 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
            <p className="text-xs text-slate-500">Total missions to generate for this game.</p>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase text-slate-500">Configure Scoring</p>
            <div className="flex gap-2">
              {['standard', 'aggressive', 'balanced'].map((s) => (
                <button key={s} onClick={() => set('scoring', s)} className={`focus-ring rounded-lg border px-3 py-2 text-xs font-semibold capitalize ${form.scoring === s ? 'border-signal-green text-signal-green bg-signal-green/10' : 'border-white/10 text-slate-400'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 8 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase text-slate-500">Review & Launch</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-slate-500">Name</p><p className="font-semibold text-white">{form.name || 'Untitled Game'}</p></div>
              <div><p className="text-slate-500">Location</p><p className="font-semibold text-white">{form.location}</p></div>
              <div><p className="text-slate-500">Mode</p><p className="font-semibold text-white">{gameModes.find((m) => m.id === form.mode)?.name}</p></div>
              <div><p className="text-slate-500">Duration</p><p className="font-semibold text-white">{form.duration} min</p></div>
              <div><p className="text-slate-500">Teams</p><p className="font-semibold text-white">{form.teams}</p></div>
              <div><p className="text-slate-500">Missions</p><p className="font-semibold text-white">{form.missions}</p></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={back} disabled={step === 0}>Back</Button>
        {step < steps.length - 1
          ? <Button onClick={next}>Continue</Button>
          : <Button variant="gold" onClick={launch}>Launch Game</Button>}
      </div>
    </div>
  )
}
