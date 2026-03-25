import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'

/* ─── Social SVG icons ──────────────────────────────────── */
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.15 8.15 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  { icon: IconInstagram, label: 'Instagram', href: 'https://www.instagram.com/ac_athletic_store/' },
  { icon: IconFacebook,  label: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=61565835671730' },
  { icon: IconTikTok,    label: 'TikTok',    href: 'https://www.tiktok.com/@ac_athletic_store' },
]

const NAV_GROUPS = [
  {
    title: 'Tienda',
    links: [
      { label: 'Inicio',    to: '/' },
      { label: 'Catálogo',  to: '/catalogo' },
      { label: 'Favoritos', to: '/favoritos' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'Envíos y devoluciones', to: '#' },
      { label: 'Guía de tallas',        to: '#' },
      { label: 'Preguntas frecuentes',  to: '#' },
    ],
  },
]

/* ─── Footer ─────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear()
  const [email,      setEmail]      = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 4000)
  }

  return (
    <footer className="bg-[var(--color-bg)] mt-auto">
      {/* Top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/40 to-transparent" />

      {/* ── MAIN GRID ── */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* ── BRAND COLUMN ── */}
          <div className="md:col-span-4">
            {/* Logo + name */}
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-9 h-9 shrink-0 group-hover:scale-105 transition-transform duration-200">
                <img src="/logos/logo-icon.png" alt="Athletic Store" className="w-full h-full object-contain" />
              </div>
              <div className="leading-none">
                <p className="text-[13px] font-black tracking-[0.18em] uppercase text-white">
                  Athletic Store
                </p>
                <p className="text-[9px] tracking-[0.28em] uppercase text-[var(--color-gold)] font-semibold mt-0.5">
                  Wearing Winners
                </p>
              </div>
            </Link>

            {/* Statement */}
            <p className="text-sm text-white/50 leading-relaxed font-light max-w-xs mb-8">
              Equipamiento de élite para atletas que no aceptan compromisos. Diseño, rendimiento
              y estilo en cada pieza.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-[var(--color-gold)]/60 hover:bg-[var(--color-gold)]/8 rounded-sm transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* ── NAV GROUPS ── */}
          {NAV_GROUPS.map(({ title, links }) => (
            <div key={title} className="md:col-span-2">
              <h4 className="text-[10px] font-black tracking-[0.25em] uppercase text-white mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-white/45 hover:text-white transition-colors duration-200 font-light"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ── NEWSLETTER ── */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-black tracking-[0.25em] uppercase text-white mb-2">
              Newsletter
            </h4>
            <p className="text-sm text-white/45 font-light leading-relaxed mb-5">
              Recibe lanzamientos, ofertas exclusivas y novedades antes que nadie.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[var(--color-gold)]/60 rounded-sm transition-colors"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-gold)] text-black text-xs font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-[var(--color-gold-light)] transition-colors group w-full"
                >
                  Suscribirse
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3 py-4 px-4 bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 rounded-sm">
                <Check size={16} className="text-[var(--color-gold)] shrink-0" />
                <p className="text-sm font-semibold text-[var(--color-gold)]">¡Gracias por suscribirte!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/25 tracking-widest font-light uppercase">
            © {year} Athletic Store · Todos los derechos reservados
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-[11px] text-white/25 hover:text-white/50 transition-colors font-light">
              Privacidad
            </a>
            <a href="#" className="text-[11px] text-white/25 hover:text-white/50 transition-colors font-light">
              Términos
            </a>
            {/* Discreet admin access */}
            <Link
              to="/admin/login"
              aria-label="Acceso interno"
              title="Admin"
              className="text-white/8 hover:text-white/20 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
