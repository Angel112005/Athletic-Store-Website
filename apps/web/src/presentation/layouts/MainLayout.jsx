import { NavLink } from 'react-router-dom'

const MainLayout = ({ children }) => {
  const navLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? 'bg-slate-900 text-white'
        : 'bg-white text-slate-700 hover:bg-slate-100'
    }`

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
            Athletic Store
          </h2>

          <nav className="flex items-center gap-2">
            <NavLink to="/" className={navLinkClass} end>
              Inicio
            </NavLink>
            <NavLink to="/catalogo" className={navLinkClass}>
              Catalogo
            </NavLink>
            <span className="rounded-full bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-700">
              Admin: proximo modulo
            </span>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}

export default MainLayout