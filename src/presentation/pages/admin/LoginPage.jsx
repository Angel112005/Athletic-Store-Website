import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/application/hooks/useAuth'
import Button from '@/presentation/components/ui/Button'

export default function LoginPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPwd,  setShowPwd]  = useState(false)
  const { login, loading, error, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/admin', { replace: true })
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(email, password)
    if (ok) navigate('/admin', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-4">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--color-gold)] opacity-[0.03] blur-[150px]" />
      </div>

      <div
        className="relative w-full max-w-sm animate-fade-in-up"
        style={{ opacity: 0, animationFillMode: 'forwards' }}
      >
        {/* Back button */}
        <Link
          to="/"
          className="mb-6 flex items-center gap-2 text-sm text-white/60 hover:text-[var(--color-gold)] transition-colors duration-200 inline-flex"
        >
          <ArrowLeft size={16} />
          <span>Volver a inicio</span>
        </Link>

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-1 mb-2">
            <span className="text-2xl font-black tracking-[0.15em] uppercase text-white">Athletic</span>
            <span className="text-2xl font-black tracking-[0.15em] uppercase text-[var(--color-gold)]">Store</span>
          </div>
          <p className="text-xs tracking-widest uppercase text-[var(--color-text-faint)]">
            Panel de administración
          </p>
        </div>

        {/* Card */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-8">
          <h1 className="text-lg font-bold mb-6">Iniciar sesión</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ejemplo.com"
                required
                autoFocus
                className="w-full px-4 py-3 rounded-sm text-sm text-white bg-[var(--color-surface-2)] border border-[var(--color-border)] placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-sm text-sm text-white bg-[var(--color-surface-2)] border border-[var(--color-border)] placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] hover:text-white transition-colors"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-[var(--color-error)]/10 border border-[var(--color-error)]/30 rounded-sm">
                <p className="text-xs text-[var(--color-error)]">{error}</p>
              </div>
            )}

            {/* Submit */}
            <Button type="submit" size="lg" loading={loading} className="w-full mt-2">
              Entrar
            </Button>
          </form>
        </div>

        {/* Decorative line */}
        <div className="mt-8 flex items-center gap-3">
          <div className="flex-1 h-px bg-[var(--color-border)]" />
          <span className="text-xs text-[var(--color-text-faint)] tracking-widest uppercase">Admin</span>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
        </div>
      </div>
    </div>
  )
}
