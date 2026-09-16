import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, AtSign, Mail, Lock, Upload } from 'lucide-react'
import { Button } from '../components/ui'
import { useGameStore } from '../store/useGameStore'

function scorePassword(pw) {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong']
const colors = ['bg-signal-red', 'bg-signal-red', 'bg-signal-gold', 'bg-signal-blue', 'bg-signal-green']

export default function Register() {
  const register = useGameStore((s) => s.register)
  const navigate = useNavigate()
  
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const score = useMemo(() => scorePassword(pw), [pw])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!agree) return
    if (pw !== confirmPw) {
      setError('Passwords do not match')
      return
    }
    
    const success = await register(username, email, pw)
    if (success) {
      navigate('/dashboard')
    } else {
      setError('Registration failed. Try a different username/email.')
    }
  }

  const field = (icon, props) => (
    <div className="relative">
      {icon}
      <input
        {...props}
        className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-500"
      />
    </div>
  )

  return (
    <form onSubmit={submit} className="glass-strong space-y-4 rounded-2xl p-6 sm:p-8">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      
      <div className="flex justify-center">
        <label className="focus-ring flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-white/15 text-slate-500 hover:border-signal-green/50 hover:text-signal-green">
          <Upload size={20} />
          <input type="file" accept="image/*" className="hidden" />
        </label>
      </div>

      {field(<User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />, { placeholder: 'Full name', required: true, value: name, onChange: e => setName(e.target.value) })}
      {field(<AtSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />, { placeholder: 'Username', required: true, value: username, onChange: e => setUsername(e.target.value) })}
      {field(<Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />, { placeholder: 'Email address', type: 'email', required: true, value: email, onChange: e => setEmail(e.target.value) })}

      <div>
        {field(<Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />, {
          placeholder: 'Password', type: 'password', required: true, value: pw, onChange: (e) => setPw(e.target.value)
        })}
        {pw.length > 0 && (
          <div className="mt-1.5">
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`h-1 flex-1 rounded-full ${i < score ? colors[score] : 'bg-white/10'}`} />
              ))}
            </div>
            <p className="mt-1 text-[10px] text-slate-500">{labels[score]}</p>
          </div>
        )}
      </div>

      {field(<Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />, { placeholder: 'Confirm password', type: 'password', required: true, value: confirmPw, onChange: e => setConfirmPw(e.target.value) })}

      <label className="flex items-start gap-2 text-xs text-slate-400">
        <input type="checkbox" checked={agree} onChange={() => setAgree((v) => !v)} className="focus-ring mt-0.5 h-3.5 w-3.5 rounded accent-signal-green" />
        I agree to the Terms of Service and Privacy Policy
      </label>

      <Button type="submit" className="w-full" disabled={!agree}>Create Account</Button>

      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[10px] uppercase tracking-widest text-slate-600">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <Button type="button" variant="ghost" className="w-full">Sign up with Google</Button>

      <p className="pt-2 text-center text-xs text-slate-500">
        Already hunting?{' '}
        <Link to="/login" className="font-semibold text-signal-green hover:underline">Log in</Link>
      </p>
    </form>
  )
}

