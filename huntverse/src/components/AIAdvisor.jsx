import { useState } from 'react'
import { Bot, Sparkles, RefreshCw } from 'lucide-react'
import { Button, Modal } from './ui'
import { aiAdvisorFeed } from '../data/mockData'

export function AIAdvisor({ onAccept, onHint }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-signal-purple/15 text-signal-purple">
          <Bot size={16} />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-signal-green animate-ping-slow" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-signal-green" />
        </div>
        <p className="font-display text-sm font-bold text-white">AI Game Master</p>
      </div>

      <div className="space-y-2">
        {aiAdvisorFeed.map((f) => (
          <p key={f.id} className="rounded-lg bg-white/5 px-3 py-2 text-xs leading-relaxed text-slate-300">{f.text}</p>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button variant="purple" className="!px-3 !py-1.5 !text-xs" onClick={onAccept}>Accept Mission</Button>
        <Button variant="ghost" className="!px-3 !py-1.5 !text-xs" onClick={onHint}>Ask AI for Hint</Button>
        <Button variant="ghost" className="!px-3 !py-1.5 !text-xs">View Strategy</Button>
      </div>
    </div>
  )
}

export function AIClueModal({ open, onClose }) {
  const [difficulty, setDifficulty] = useState('Hard')
  const [clue, setClue] = useState('Thousands of stories sleep inside me, but I have no dreams. Find the place where knowledge waits silently.')

  const clues = {
    Easy: 'I have many books but I am not a shop. Find me where students go quiet.',
    Medium: 'Rows of silence hold thousands of voices. Where knowledge waits, that is where you look.',
    Hard: 'Thousands of stories sleep inside me, but I have no dreams. Find the place where knowledge waits silently.'
  }

  const regenerate = () => setClue(clues[difficulty])

  return (
    <Modal open={open} onClose={onClose} title="AI Clue Generator">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="glass rounded-lg p-3">
            <p className="text-[10px] uppercase text-slate-500">Target</p>
            <p className="font-semibold text-white">College Library</p>
          </div>
          <div className="glass rounded-lg p-3">
            <p className="text-[10px] uppercase text-slate-500">Difficulty</p>
            <p className="font-semibold text-white">{difficulty}</p>
          </div>
        </div>

        <div className="glass rounded-xl border border-signal-purple/30 p-4">
          <div className="mb-2 flex items-center gap-1.5 text-signal-purple">
            <Sparkles size={14} />
            <span className="text-[11px] font-bold uppercase tracking-wider">AI Generated Clue</span>
          </div>
          <p className="text-sm italic text-slate-200">"{clue}"</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" className="!text-xs" onClick={regenerate}><RefreshCw size={13} /> Regenerate</Button>
          <Button variant="ghost" className="!text-xs" onClick={() => { setDifficulty('Hard'); setClue(clues.Hard) }}>Make Harder</Button>
          <Button variant="ghost" className="!text-xs" onClick={() => { setDifficulty('Easy'); setClue(clues.Easy) }}>Make Easier</Button>
          <Button className="!text-xs" onClick={onClose}>Use Clue</Button>
        </div>
      </div>
    </Modal>
  )
}
