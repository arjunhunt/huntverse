import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ImagePlus, Loader2 } from 'lucide-react'
import { Modal, Button, Badge, ProgressBar } from './ui'

export function MissionModal({ mission, open, onClose, onStart, onUpload }) {
  if (!mission) return null
  return (
    <Modal open={open} onClose={onClose} title={mission.title}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">{mission.type}</Badge>
          <Badge tone="gold">{mission.difficulty}</Badge>
        </div>
        <p className="text-sm text-slate-400">
          {mission.description || 'Locate the objective and complete the required action to earn your reward.'}
        </p>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div><p className="text-[10px] uppercase text-slate-500">Distance</p><p className="font-semibold text-white">{mission.distance}</p></div>
          <div><p className="text-[10px] uppercase text-slate-500">Time</p><p className="font-semibold text-white">{mission.time}</p></div>
          <div><p className="text-[10px] uppercase text-slate-500">Reward</p><p className="font-semibold text-signal-gold">+{mission.reward}</p></div>
        </div>
        {mission.progress > 0 && <ProgressBar value={mission.progress} />}
        <div className="flex gap-2 pt-2">
          <Button onClick={() => { onStart(mission._id || mission.id); onClose() }}>Start Mission</Button>
          <Button variant="gold" onClick={() => { onUpload(mission); onClose() }}>Upload Proof</Button>
        </div>
      </div>
    </Modal>
  )
}

export function VerificationModal({ mission, open, onClose, onConfirm }) {
  const [stage, setStage] = useState('upload') // upload -> verifying -> done

  const handleUpload = () => {
    setStage('verifying')
    setTimeout(() => {
      setStage('done')
    }, 1600)
  }

  const handleClose = () => {
    if (stage === 'done') onConfirm()
    setStage('upload')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="Upload Proof">
      <div className="space-y-4">
        {stage === 'upload' && (
          <button
            onClick={handleUpload}
            className="focus-ring flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 py-10 text-slate-400 hover:border-signal-green/50 hover:text-signal-green"
          >
            <ImagePlus size={28} />
            <span className="text-sm font-medium">Tap to capture / upload photo</span>
          </button>
        )}

        {stage === 'verifying' && (
          <div className="flex flex-col items-center gap-3 py-10">
            <Loader2 size={28} className="animate-spin text-signal-blue" />
            <p className="text-sm text-slate-400">AI verifying your submission…</p>
          </div>
        )}

        {stage === 'done' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-3">
            <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-signal-red/20 to-void-800 flex items-center justify-center text-slate-500 text-xs">
              Photo preview
            </div>
            <div className="glass space-y-1.5 rounded-xl p-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Object detected</span><span className="font-semibold text-white">Fire Extinguisher</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Color</span><span className="font-semibold text-white">Red</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Confidence</span><span className="font-semibold text-signal-green">97%</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Location</span><span className="font-semibold text-signal-green">Verified</span></div>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl bg-signal-green/10 py-3 text-signal-green">
              <CheckCircle2 size={18} />
              <span className="font-display font-bold">MISSION VERIFIED</span>
            </div>
            <p className="text-center font-display text-lg font-bold text-signal-gold">+{mission?.reward || 150} POINTS</p>
            <Button className="w-full" onClick={handleClose}>Done</Button>
          </motion.div>
        )}
      </div>
    </Modal>
  )
}
