import { motion } from 'framer-motion'
import { MapPin, Clock, Compass, ChevronRight } from 'lucide-react'
import { Badge, Button, ProgressBar } from './ui'

const difficultyTone = { EASY: 'green', MEDIUM: 'gold', HARD: 'red', EXTREME: 'purple' }
const statusTone = { active: 'green', available: 'blue', completed: 'gray', failed: 'red', bonus: 'gold' }

export function MissionCard({ mission, onOpen, onStart }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -3 }}
      className="glass flex flex-col gap-3 rounded-2xl p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-sm font-semibold text-white">{mission.title}</p>
          <p className="mt-0.5 text-xs text-slate-500">{mission.type}</p>
        </div>
        <Badge tone={statusTone[mission.status]}>{mission.status}</Badge>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-1"><MapPin size={12} /> {mission.distance}</span>
        <span className="flex items-center gap-1"><Clock size={12} /> {mission.time}</span>
        <Badge tone={difficultyTone[mission.difficulty]}>{mission.difficulty}</Badge>
      </div>

      {mission.progress > 0 && <ProgressBar value={mission.progress} tone={statusTone[mission.status] === 'gray' ? 'green' : statusTone[mission.status]} />}

      <div className="mt-1 flex items-center justify-between">
        <span className="font-display text-sm font-bold text-signal-gold">+{mission.reward} pts</span>
        <div className="flex gap-2">
          {mission.status !== 'completed' && mission.status !== 'failed' && (
            <Button variant={mission.status === 'active' ? 'outline' : 'primary'} className="!px-3 !py-1.5 !text-xs" onClick={() => onStart(mission._id || mission.id)}>
              {mission.status === 'active' ? 'In Progress' : 'Start'}
            </Button>
          )}
          <button onClick={() => onOpen(mission)} className="focus-ring rounded-lg border border-white/10 p-1.5 text-slate-400 hover:bg-white/10 hover:text-white">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export function CurrentMissionCard({ mission, onHint, onUpload, onNavigate }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-widest text-signal-green">Current Mission</p>
        <Badge tone={difficultyTone[mission.difficulty]}>{mission.difficulty}</Badge>
      </div>
      <h3 className="font-display text-xl font-bold text-white">{mission.title}</h3>
      <p className="mt-1 text-sm text-slate-400">{mission.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div>
          <p className="text-[10px] uppercase text-slate-500">Distance</p>
          <p className="font-semibold text-white">{mission.distance}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-slate-500">Direction</p>
          <p className="flex items-center gap-1 font-semibold text-white"><Compass size={13} className="text-signal-blue" /> {mission.direction}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-slate-500">Time Left</p>
          <p className="font-semibold text-white">{mission.time}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-slate-500">Reward</p>
          <p className="font-semibold text-signal-gold">+{mission.reward} pts</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button onClick={onNavigate}>Start Navigation</Button>
        <Button variant="ghost" onClick={onHint}>Hint</Button>
        <Button variant="gold" onClick={onUpload}>Upload Proof</Button>
      </div>
    </div>
  )
}
