import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '../components/ui'
import { useGameStore } from '../store/useGameStore'

export default function Login() {
  const login = useGameStore((s) => s.login)
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    const success = await login(email, password)
    if (success) {
      navigate('/dashboard')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <form onSubmit={submit} className="glass-strong space-y-4 rounded-2xl p-6 sm:p-8">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-400">Email</label>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-500"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-400">Password</label>
        <div className="relative">
          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type={showPass ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
            className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-slate-500"
            placeholder="••••••••"
          />
          <button type="button" onClick={() => setShowPass((v) => !v)} className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-2 text-slate-400">
          <input type="checkbox" checked={remember} onChange={() => setRemember((v) => !v)} className="focus-ring h-3.5 w-3.5 rounded accent-signal-green" />
          Remember me
        </label>
        <a href="#" className="text-signal-blue hover:underline">Forgot password?</a>
      </div>

      <Button type="submit" className="w-full">Enter the Hunt</Button>

      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[10px] uppercase tracking-widest text-slate-600">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <Button type="button" variant="ghost" className="w-full">Continue with Google</Button>

      <p className="pt-2 text-center text-xs text-slate-500">
        New to HUNTVERSE?{' '}
        <Link to="/register" className="font-semibold text-signal-green hover:underline">Create account</Link>
      </p>
    </form>
  )
}

