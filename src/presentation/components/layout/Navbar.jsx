import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, Search, Heart } from 'lucide-react'
import { useWishlist } from '@/application/context/WishlistContext'
import SearchModal from './SearchModal'

const NAV_LINKS = [
  { to: '/',         label: 'Inicio',   end: true },
  { to: '/catalogo', label: 'Catálogo', end: false },
]

/* ─── Announcement bar ───────────────────────────────────── */
function AnnouncementBar({ visible }) {
  return (
    <div
      className={`overflow-hidden transition-all duration-500 ${
        visible ? 'max-h-8' : 'max-h-0'
      }`}
    >
      <div className="bg-[var(--color-gold)] text-black text-[11px] font-bold tracking-[0.2em] uppercase text-center py-1.5 px-4">
        ✦ &nbsp; Envío gratis en compras mayores a $99 &nbsp; ✦ &nbsp; Nueva colección disponible &nbsp; ✦
      </div>
    </div>
  )
}

/* ─── Desktop nav link with underline animation ─────────── */
function NavItem({ to, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `relative text-[11px] tracking-[0.2em] uppercase font-bold pb-0.5 transition-colors duration-200 group ${
          isActive ? 'text-white' : 'text-[var(--color-text-muted)] hover:text-white'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          <span
            className={`absolute bottom-0 left-0 h-[1.5px] bg-[var(--color-gold)] transition-all duration-300 ${
              isActive ? 'w-full' : 'w-0 group-hover:w-full'
            }`}
          />
        </>
      )}
    </NavLink>
  )
}

/* ─── Main Navbar ────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [showAnn,     setShowAnn]     = useState(true)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const location = useLocation()
  const { count: wishlistCount } = useWishlist()

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setShowAnn(y < 10)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Open search with "/" key (when not typing in an input)
  useEffect(() => {
    const handler = (e) => {
      if (
        e.key === '/' &&
        !searchOpen &&
        e.target.tagName !== 'INPUT' &&
        e.target.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [searchOpen])

  return (
    <>
      {/* ── Announcement bar ── */}
      <AnnouncementBar visible={showAnn} />

      {/* ── Main header ── */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--color-bg)]/96 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]'
            : 'bg-[var(--color-bg)]/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-[62px] gap-8">

            {/* ── LEFT: Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-2.5 shrink-0 group"
              aria-label="Athletic Store — Inicio"
            >
              <div className="w-10 h-10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                <img
                  src="/logos/logo-icon.png"
                  alt="Athletic Store Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-sm md:text-[13px] font-black tracking-[0.18em] uppercase text-white">
                  Athletic Store
                </span>
                <span className="text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-[var(--color-gold)] font-semibold">
                  Wearing Winners
                </span>
              </div>
            </Link>

            {/* ── CENTER: Nav links (desktop) ── */}
            <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
              {NAV_LINKS.map(({ to, label, end }) => (
                <NavItem key={to} to={to} label={label} end={end} />
              ))}
            </nav>

            {/* ── RIGHT: Actions ── */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Search icon */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Buscar (presiona /)"
                title="Buscar (presiona /)"
                className="hidden md:flex w-8 h-8 items-center justify-center text-[var(--color-text-muted)] hover:text-white hover:bg-white/[0.06] rounded-sm transition-all duration-200"
              >
                <Search size={16} />
              </button>

              {/* Wishlist icon */}
              <Link
                to="/favoritos"
                aria-label={`Favoritos${wishlistCount > 0 ? ` (${wishlistCount})` : ''}`}
                className="relative hidden md:flex w-8 h-8 items-center justify-center text-[var(--color-text-muted)] hover:text-white hover:bg-white/[0.06] rounded-sm transition-all duration-200"
              >
                <Heart size={16} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[var(--color-gold)] text-black text-[9px] font-black rounded-full flex items-center justify-center leading-none">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Divider */}
              <div className="hidden md:block w-px h-5 bg-[var(--color-border-2)] mx-1" />

              {/* CTA button */}
              <Link
                to="/catalogo"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-gold)] text-black text-[11px] font-bold tracking-[0.15em] uppercase rounded-sm hover:bg-[var(--color-gold-light)] transition-colors duration-200 group"
              >
                Explorar
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>

              {/* Hamburger (mobile) */}
              <button
                className="md:hidden flex items-center justify-center w-8 h-8 text-white"
                onClick={() => setMenuOpen(p => !p)}
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom border line ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border-2)] to-transparent" />
      </header>

      {/* ── Mobile menu (slide from right) ── */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[var(--color-surface)] flex flex-col transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)]">
            <span className="text-sm font-black tracking-widest uppercase text-[var(--color-gold)]">Menú</span>
            <button onClick={() => setMenuOpen(false)} className="text-[var(--color-text-muted)] hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Drawer links */}
          <nav className="flex-1 flex flex-col px-6 py-8 gap-2">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center justify-between py-3.5 border-b border-[var(--color-border)] text-sm font-bold tracking-widest uppercase transition-colors duration-200 ${
                    isActive ? 'text-[var(--color-gold)]' : 'text-[var(--color-text-muted)]'
                  }`
                }
              >
                {label}
                <ArrowRight size={14} />
              </NavLink>
            ))}

            {/* Favorites link in mobile menu */}
            <Link
              to="/favoritos"
              className="flex items-center justify-between py-3.5 border-b border-[var(--color-border)] text-sm font-bold tracking-widest uppercase text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors duration-200"
            >
              <span className="flex items-center gap-2">
                Favoritos
                {wishlistCount > 0 && (
                  <span className="px-1.5 py-0.5 bg-[var(--color-gold)] text-black text-[9px] font-black rounded-full leading-none">
                    {wishlistCount}
                  </span>
                )}
              </span>
              <ArrowRight size={14} />
            </Link>

            {/* Mobile search */}
            <button
              onClick={() => { setMenuOpen(false); setSearchOpen(true) }}
              className="flex items-center justify-between py-3.5 border-b border-[var(--color-border)] text-sm font-bold tracking-widest uppercase text-[var(--color-text-muted)] hover:text-white transition-colors duration-200 w-full text-left"
            >
              Buscar
              <Search size={14} />
            </button>
          </nav>

          {/* Drawer CTA */}
          <div className="px-6 py-6 border-t border-[var(--color-border)]">
            <Link
              to="/catalogo"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--color-gold)] text-black text-xs font-bold tracking-widest uppercase rounded-sm"
            >
              Ver catálogo completo
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Search modal ── */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
