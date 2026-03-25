import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'
import { useAuth } from '@/application/hooks/useAuth'

const NAV_ITEMS = [
  { to: '/admin',          label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/productos', label: 'Productos',  icon: Package },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-1">
          <span className="text-base font-black tracking-[0.12em] uppercase text-white">Athletic</span>
          <span className="text-base font-black tracking-[0.12em] uppercase text-[var(--color-gold)]">Store</span>
        </div>
        <p className="text-[10px] text-[var(--color-text-faint)] tracking-widest uppercase mt-1">
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-[10px] font-semibold text-[var(--color-text-faint)] tracking-widest uppercase px-3 mb-3">
          Menú
        </p>
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-[var(--color-gold-muted)] text-[var(--color-gold)]'
                      : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={16} className={isActive ? 'text-[var(--color-gold)]' : ''} />
                    <span className="flex-1">{label}</span>
                    {isActive && <ChevronRight size={14} className="text-[var(--color-gold)]" />}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-[var(--color-border)]">
        {user && (
          <p className="text-xs text-[var(--color-text-faint)] px-3 mb-3 truncate">
            {user.email}
          </p>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/5 transition-all duration-200 w-full"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-[var(--color-bg)] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-[var(--color-surface)] border-r border-[var(--color-border)] shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
          <aside className="relative z-10 w-64 bg-[var(--color-surface)] flex flex-col h-full shadow-2xl">
            <button
              className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar mobile */}
        <header className="lg:hidden flex items-center justify-between px-4 h-14 bg-[var(--color-surface)] border-b border-[var(--color-border)] shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="text-white">
            <Menu size={20} />
          </button>
          <span className="text-sm font-semibold text-[var(--color-gold)]">Admin</span>
          <button onClick={handleLogout} className="text-[var(--color-text-muted)]">
            <LogOut size={18} />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
