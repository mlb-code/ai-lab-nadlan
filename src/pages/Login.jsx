import { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const THINKING_STEPS = [
  'מאמת את כתובת המייל…',
  'בודק שאתה רשום לקורס…',
  'מאחזר את הפרופיל שלך…',
  'טוען את החומרים האישיים…',
  'מסדר את האזור האישי…',
  'מכין את הכל בשבילך…'
]
const MIN_LOAD_MS = 2000
const STEP_INTERVAL_MS = 650

function ThinkingOverlay({ status }) {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-bg backdrop-blur-md" dir="rtl">
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{
        backgroundImage:
          'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(139,94,60,0.15), transparent 70%)'
      }} />
      <div className="relative text-center px-6">
        {/* Rotating rings + core */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          <div className="absolute inset-0 rounded-full border border-brand/25 animate-ping-slow" />
          <div className="absolute inset-3 rounded-full border border-brand/40" style={{ animation: 'spin 4s linear infinite' }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-brand-glow shadow-brand -translate-x-1/2" />
          </div>
          <div className="absolute inset-7 rounded-full border border-brand/60" style={{ animation: 'spin 2.5s linear infinite reverse' }}>
            <div className="absolute -top-1 left-1/2 w-1.5 h-1.5 rounded-full bg-brand -translate-x-1/2" />
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <div
              className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-glow to-brand"
              style={{ boxShadow: '0 0 24px rgba(139,94,60,0.7)', animation: 'pulse 1.4s ease-in-out infinite' }}
            />
          </div>
        </div>

        <div className="kicker mb-4 justify-center" aria-hidden>מתחבר</div>
        <div
          key={status}
          className="font-display text-2xl sm:text-3xl font-black text-ink-100 mb-3 tracking-tight"
          style={{ animation: 'fadeUp 0.45s ease both' }}
        >
          {status}
        </div>
        <div className="mono text-xs tracking-kicker text-ink-500 uppercase">
          רגע אחד · AI Lab Urban
        </div>
      </div>

      <style>{`
        @keyframes ping-slow { 0% { transform: scale(0.9); opacity: 0.55; } 80%, 100% { transform: scale(1.25); opacity: 0; } }
        .animate-ping-slow { animation: ping-slow 2.2s cubic-bezier(0,0,0.2,1) infinite; }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.12); opacity: 0.85; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [stepIdx, setStepIdx] = useState(0)

  useEffect(() => {
    if (!loading) { setStepIdx(0); return }
    const id = setInterval(() => {
      setStepIdx((i) => Math.min(i + 1, THINKING_STEPS.length - 1))
    }, STEP_INTERVAL_MS)
    return () => clearInterval(id)
  }, [loading])

  if (user) return <Navigate to="/" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const start = Date.now()
    const res = await login(email)
    const elapsed = Date.now() - start
    if (elapsed < MIN_LOAD_MS) {
      await new Promise((r) => setTimeout(r, MIN_LOAD_MS - elapsed))
    }
    if (!res.ok) {
      setLoading(false)
      setError(res.error)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {loading && <ThinkingOverlay status={THINKING_STEPS[stepIdx]} />}

      {/* Left visual panel */}
      <div className="hidden lg:flex relative items-center justify-center overflow-hidden bg-bg-side border-l border-line">
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 30% 20%, rgba(139,94,60,0.15), transparent 60%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(139,94,60,0.06), transparent 60%)'
        }} />
        <div className="relative z-10 max-w-md px-12">
          <div className="flex items-baseline gap-2 mb-12">
            <span className="mono text-xs font-bold text-brand border border-brand px-2 py-0.5 rounded-sm tracking-kicker -translate-y-1">
              Urban
            </span>
            <span className="font-display font-black text-2xl text-ink-100">AI Lab</span>
          </div>

          <div className="kicker mb-6">האזור האישי</div>
          <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight text-ink-100">
            ברוכים הבאים<br />
            <em className="not-italic text-brand">לקורס שלך.</em>
          </h1>
          <p className="mt-6 text-lg text-ink-300 leading-relaxed">
            כל החומרים, השיעורים והכלים — במקום אחד. כשתהיה מוכן, נמשיך מאיפה שעצרנו.
          </p>

          <div className="mt-12 space-y-3">
            {[
              'מצגות מלאות לכל שיעור',
              'מעקב התקדמות אישי',
              'גישה לקהילה ולמרצה'
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3 text-base text-ink-300">
                <span className="mono text-brand font-bold w-8">0{i + 1}</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-between mb-10">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-xl text-ink-100">AI Lab</span>
              <span className="mono text-xs font-bold text-brand border border-brand px-1.5 py-0.5 rounded-sm tracking-kicker -translate-y-px">
                Urban
              </span>
            </div>
            <a
              href="https://urban.ai-lab.co.il/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-300 hover:text-brand transition"
            >
              <span>חזרה לאתר</span>
              <span>→</span>
            </a>
          </div>

          <div className="kicker mb-5">התחברות</div>
          <h2 className="font-display text-3xl font-black text-ink-100 mb-3 tracking-tight">
            התחבר לאזור האישי
          </h2>
          <p className="text-base text-ink-300 mb-8">
            הזן את המייל שאיתו נרשמת לקורס. נכניס אותך אוטומטית.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mono text-xs uppercase tracking-kicker text-ink-500 block mb-2">
                כתובת אימייל
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="input"
                dir="ltr"
              />
            </div>

            {error && (
              <div className="border border-warn/40 bg-warn/10 px-4 py-3 text-sm text-warn rounded-sm">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? 'בודק…' : 'כניסה'}
              {!loading && <span className="btn-arrow">←</span>}
            </button>
          </form>

          <p className="mt-6 text-xs text-ink-500 leading-relaxed">
            לא נרשמת עדיין? הירשם דרך <a href="https://urban.ai-lab.co.il/#register" className="text-brand hover:underline">דף ההרשמה</a>.
          </p>

          <div className="mt-10 text-center mono text-xs text-ink-700 tracking-mono">
            © {new Date().getFullYear()} AI LAB · ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </div>
  )
}
