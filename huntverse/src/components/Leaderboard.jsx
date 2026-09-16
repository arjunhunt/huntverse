import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'

export default function LeaderboardTable({ rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500">
            <th className="pb-2 pl-2">Rank</th>
            <th className="pb-2">Team</th>
            <th className="pb-2">Players</th>
            <th className="pb-2">Score</th>
            <th className="pb-2">Missions</th>
            <th className="pb-2 pr-2">Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <motion.tr
              key={r.rank}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl ${r.isUser ? 'bg-signal-green/8' : ''}`}
            >
              <td className="rounded-l-xl py-3 pl-2 font-display font-bold">
                <span className={r.rank <= 3 ? 'text-signal-gold flex items-center gap-1' : 'text-slate-400'}>
                  {r.rank <= 3 && <Trophy size={13} />} #{r.rank}
                </span>
              </td>
              <td className="py-3 font-semibold text-white">{r.team}{r.isUser && <span className="ml-2 rounded-full bg-signal-green/15 px-2 py-0.5 text-[10px] text-signal-green">YOU</span>}</td>
              <td className="py-3 text-slate-400">{r.players}</td>
              <td className="py-3 font-semibold text-signal-green">{r.score.toLocaleString()}</td>
              <td className="py-3 text-slate-400">{r.missions}</td>
              <td className="rounded-r-xl py-3 pr-2 text-slate-400">{r.winRate}%</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
