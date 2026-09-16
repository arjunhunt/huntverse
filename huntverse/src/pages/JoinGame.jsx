import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, MapPin, Clock, Shield } from 'lucide-react'
import { Button } from '../components/ui'

const previewData = {
  name: 'Campus Hunt 2026',
  host: 'HuntMaster_Priya',
  location: 'Main Campus, Block C',
  players: '12 / 20',
  teams: 4,
  duration: '60 min',
  mode: 'Team Battle'
}

import api from '../api'

export default function JoinGame() {
  const [code, setCode] = useState('')
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const findGame = async (e) => {
    e.preventDefault()
    if (!code.trim()) return
    try {
      setError('')
      const res = await api.post('/game/join', { code })
      setPreview({
        name: res.data.name,
        host: 'Host',
        location: 'Local',
        players: res.data.players.length + ' / 20',
        mode: res.data.mode,
        duration: '60 min'
      })
    } catch (err) {
      setError('Game not found or invalid code.')
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-5">
      <form onSubmit={findGame} className="glass space-y-4 rounded-2xl p-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500">Enter Game Code</p>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="HV-7X92K"
          className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center font-display text-xl font-bold tracking-[0.3em] text-signal-green placeholder:text-slate-600"
        />
        {error && <p className="text-center text-xs text-signal-red">{error}</p>}
        <Button type="submit" className="w-full">Find Game</Button>
      </form>

      {preview && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="glass space-y-4 rounded-2xl p-6"
        >
          <div>
            <h3 className="font-display text-lg font-bold text-white">{preview.name}</h3>
            <p className="text-xs text-slate-500">Hosted by {preview.host}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-slate-300"><MapPin size={14} className="text-signal-blue" /> {preview.location}</div>
            <div className="flex items-center gap-2 text-slate-300"><Users size={14} className="text-signal-purple" /> {preview.players}</div>
            <div className="flex items-center gap-2 text-slate-300"><Clock size={14} className="text-signal-gold" /> {preview.duration}</div>
            <div className="flex items-center gap-2 text-slate-300"><Shield size={14} className="text-signal-green" /> {preview.mode}</div>
          </div>
          <Button className="w-full" variant="gold" onClick={() => navigate('/game')}>Join Game</Button>
        </motion.div>
      )}
    </div>
  )
}
