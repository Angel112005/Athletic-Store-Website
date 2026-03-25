import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, ChevronRight, Star } from 'lucide-react'
import { useFeaturedProducts } from '@/application/hooks/useProducts'
import { useCategories } from '@/application/hooks/useCategories'
import ProductCard from '@/presentation/components/product/ProductCard'
import { SectionLoader } from '@/presentation/components/ui/Spinner'
import Button from '@/presentation/components/ui/Button'

/* ══════════════════════════════════════════════════════════
   HERO SECTION — Split layout, left text / right visual
══════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-62px)] flex items-center overflow-hidden bg-[var(--color-bg)]">

      {/* ── Background textures ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Noise grain */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
        {/* Gold radial glow — left */}
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[var(--color-gold)] opacity-[0.05] blur-[160px]" />
        {/* Gold radial glow — right */}
        <div className="absolute -right-20 bottom-0 w-[500px] h-[500px] rounded-full bg-[var(--color-gold)] opacity-[0.04] blur-[120px]" />
        {/* Horizontal lines */}
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[var(--color-border-2)] to-transparent" style={{ left: '55%' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ── LEFT — Text content ── */}
        <div>
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 mb-8 animate-fade-in"
            style={{ opacity: 0, animationDelay: '0.05s', animationFillMode: 'forwards' }}
          >
            <div className="w-6 h-px bg-[var(--color-gold)]" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--color-gold)]">
              Calzado premium · 2026
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-black uppercase leading-[0.9] tracking-tight mb-8 animate-fade-in-up"
            style={{ opacity: 0, animationDelay: '0.15s', animationFillMode: 'forwards' }}
          >
            <span className="block text-[clamp(3.5rem,8vw,6.5rem)] text-white">
              Domina
            </span>
            <span
              className="block text-[clamp(3.5rem,8vw,6.5rem)]"
              style={{
                WebkitTextStroke: '1.5px rgba(201,168,76,0.6)',
                color: 'transparent',
              }}
            >
              cada
            </span>
            <span className="block text-[clamp(3.5rem,8vw,6.5rem)] text-[var(--color-gold)]">
              cancha.
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-[var(--color-text-muted)] text-base md:text-lg leading-relaxed max-w-md mb-10 animate-fade-in-up"
            style={{ opacity: 0, animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            Calzado deportivo y equipamiento de las marcas más importantes del mundo.
            Nike, Adidas, Puma, New Balance y más — enviamos a toda la República.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 items-center mb-12 animate-fade-in-up"
            style={{ opacity: 0, animationDelay: '0.42s', animationFillMode: 'forwards' }}
          >
            <Link to="/catalogo">
              <Button size="lg" className="group">
                Ver colección
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-muted)] hover:text-white transition-colors duration-200 group"
            >
              Explorar marcas
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mini stats row */}
          <div
            className="flex items-center gap-6 animate-fade-in"
            style={{ opacity: 0, animationDelay: '0.55s', animationFillMode: 'forwards' }}
          >
            {[
              { v: '500+', l: 'Productos' },
              { v: '20+',  l: 'Marcas' },
              { v: '100%', l: 'Premium' },
            ].map(({ v, l }, i) => (
              <div key={l} className="flex items-center gap-3">
                {i > 0 && <div className="w-px h-8 bg-[var(--color-border-2)]" />}
                <div>
                  <p className="text-lg font-black text-white leading-none">{v}</p>
                  <p className="text-[10px] tracking-widest uppercase text-[var(--color-text-faint)] mt-0.5">{l}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Visual ── */}
        <div
          className="relative hidden lg:flex items-center justify-center animate-fade-in"
          style={{ opacity: 0, animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          {/* Outer decorative rings */}
          <div className="absolute w-[460px] h-[460px] rounded-full border border-[var(--color-gold)]/8" style={{ animation: 'spinSlow 18s linear infinite' }} />
          <div className="absolute w-[380px] h-[380px] rounded-full border border-dashed border-[var(--color-gold)]/12" style={{ animation: 'spinSlow 12s linear infinite reverse' }} />

          {/* Product categories showcase */}
          <div className="relative w-[300px] space-y-3">
            {[
              { icon: <SneakerIcon />, label: 'Calzado deportivo', sub: 'Nike · Adidas · Puma · New Balance', delay: '0.35s' },
              { icon: <SocksIcon />,   label: 'Calcetas premium',  sub: 'Antiderrapante · Compresión · Trail', delay: '0.5s' },
              { icon: <ShieldIcon />,  label: 'Espinilleras',      sub: 'Ligas · Fútbol · Protección total', delay: '0.65s' },
              { icon: <GlovesIcon />,  label: 'Guantes portero',   sub: 'Agarre · Amortiguación · Pro', delay: '0.8s' },
            ].map(({ icon, label, sub, delay }) => (
              <div
                key={label}
                className="flex items-center gap-4 px-5 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm animate-fade-in-up hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-surface-2)] transition-all duration-300 group"
                style={{ opacity: 0, animationDelay: delay, animationFillMode: 'forwards' }}
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center text-[var(--color-gold)]/60 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                  {icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white leading-tight">{label}</p>
                  <p className="text-[10px] text-[var(--color-text-faint)] truncate mt-0.5">{sub}</p>
                </div>
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]/30 group-hover:bg-[var(--color-gold)] transition-colors duration-300 shrink-0" />
              </div>
            ))}

            {/* Shipping badge */}
            <div className="flex items-center justify-center gap-2 pt-1 animate-fade-in" style={{ opacity: 0, animationDelay: '1s', animationFillMode: 'forwards' }}>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--color-gold)]/20" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)]/60 font-semibold">
                Envíos a toda la República
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--color-gold)]/20" />
            </div>
          </div>

          {/* Corner accent lines */}
          <div className="absolute top-4 right-4 w-px h-12 bg-gradient-to-b from-[var(--color-gold)]/40 to-transparent" />
          <div className="absolute top-4 right-4 h-px w-12 bg-gradient-to-l from-[var(--color-gold)]/40 to-transparent" />
          <div className="absolute bottom-4 left-4 w-px h-12 bg-gradient-to-t from-[var(--color-gold)]/40 to-transparent" />
          <div className="absolute bottom-4 left-4 h-px w-12 bg-gradient-to-r from-[var(--color-gold)]/40 to-transparent" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div
          className="w-5 h-8 rounded-full border border-[var(--color-border-2)] flex items-start justify-center pt-1.5"
        >
          <div
            className="w-0.5 h-2 bg-[var(--color-gold)] rounded-full"
            style={{ animation: 'scrollDot 1.6s ease-in-out infinite' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          60%       { transform: translateY(6px); opacity: 0; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}

/* ── Hero category icons ── */
function SneakerIcon() {
  return (
    <svg viewBox="0 0 40 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="26">
      <path d="M3 20 C3 23 6 24 9 24 L34 24 C37 24 38 22 38 20 C38 18 36 17 34 17 L32 17" />
      <path d="M9 17 C9 17 11 8 19 6 C25 4 30 6 32 9 C34 11 35 14 35 17" />
      <path d="M19 6 L21 17" />
      <path d="M16 9 L24 10.5" />
      <path d="M16 12 L24 13.5" />
      <path d="M9 17 L9 24" />
    </svg>
  )
}
function SocksIcon() {
  return (
    <svg viewBox="0 0 32 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="32">
      <path d="M10 2 L10 20 C10 20 4 22 3 26 C2 30 5 33 9 34 C16 35 22 32 24 28 L26 20 L22 20 L22 2 Z" />
      <path d="M10 8 L22 8" />
    </svg>
  )
}
function ShieldIcon() {
  return (
    <svg viewBox="0 0 28 34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="26" height="32">
      <path d="M14 2 L4 6 L4 16 C4 23 9 29 14 32 C19 29 24 23 24 16 L24 6 Z" />
      <path d="M10 16 L13 19 L18 13" />
    </svg>
  )
}
function GlovesIcon() {
  return (
    <svg viewBox="0 0 36 34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="34" height="32">
      <path d="M8 32 C5 32 3 30 3 27 L3 16 C3 14 4 13 6 13 L6 8 C6 6 7 5 9 5 C11 5 12 6 12 8 L12 13" />
      <path d="M12 7 C12 5 13 4 15 4 C17 4 18 5 18 7 L18 13" />
      <path d="M18 6 C18 4 19 3 21 3 C23 3 24 4 24 6 L24 13" />
      <path d="M24 8 C24 6 25 5 27 5 C29 5 30 7 30 9 L30 18 C30 25 26 30 20 32 L8 32" />
      <path d="M6 18 L30 18" />
    </svg>
  )
}

function FloatingTag({ children, style, delay }) {
  return (
    <div
      className="absolute px-3 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border-2)] rounded-sm text-xs animate-fade-in-up"
      style={{ ...style, opacity: 0, animationDelay: delay, animationFillMode: 'forwards' }}
    >
      {children}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   BRANDS MARQUEE — infinite scroll ticker
══════════════════════════════════════════════════════════ */
const BRANDS = ['Nike', 'Adidas', 'Under Armour', 'Puma', 'New Balance', 'Reebok', 'Asics', 'Fila']

function BrandsMarquee() {
  const doubled = [...BRANDS, ...BRANDS]

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-5 overflow-hidden">
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--color-surface)] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--color-surface)] to-transparent z-10 pointer-events-none" />

        <div
          className="flex items-center gap-12 whitespace-nowrap"
          style={{ animation: 'marquee 22s linear infinite' }}
        >
          {doubled.map((brand, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0">
              <span className="text-sm font-black tracking-[0.2em] uppercase text-[var(--color-text-faint)] hover:text-[var(--color-gold)] transition-colors duration-300 cursor-default">
                {brand}
              </span>
              <span className="text-[var(--color-gold)] opacity-40 text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   FEATURED PRODUCTS
══════════════════════════════════════════════════════════ */
function FeaturedSection() {
  const { products, loading, error } = useFeaturedProducts(8)

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-[var(--color-gold)]" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--color-gold)]">
              Selección editorial
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight">
            Destacados<br />
            <span
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.2)',
                color: 'transparent',
              }}
            >
              de temporada
            </span>
          </h2>
        </div>

        <Link
          to="/catalogo"
          className="group inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--color-text-muted)] hover:text-white border border-[var(--color-border)] hover:border-[var(--color-gold)] px-5 py-3 rounded-sm transition-all duration-300 self-start md:self-auto"
        >
          Ver todo
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {loading && <SectionLoader />}
      {error   && <p className="text-[var(--color-error)] text-sm">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 65}ms`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   CATEGORY BANNER — 2 large blocks
══════════════════════════════════════════════════════════ */
const CATEGORY_DESIGNS = [
  {
    badge:  'Colección 2026',
    sub:    'Explora toda la colección',
    img:    '/images/categories/clothing.jpg',
    accent: 'rgba(201,168,76,0.25)',
  },
  {
    badge:  'Nuevos arrivals',
    sub:    'Los mejores modelos disponibles',
    img:    '/images/categories/footwear.jpg',
    accent: 'rgba(0,0,0,0.45)',
  },
]

function CategoryBanner() {
  const { categories } = useCategories()

  // Use real DB categories (first 2) if available, otherwise show placeholder cards
  const displayItems = categories.length > 0
    ? categories.slice(0, 2).map((cat, i) => ({
        label: cat.name,
        to:    `/catalogo?category=${cat.id}`,
        ...CATEGORY_DESIGNS[i] ?? CATEGORY_DESIGNS[0],
      }))
    : [
        { label: 'Ropa deportiva',  to: '/catalogo', ...CATEGORY_DESIGNS[0] },
        { label: 'Calzado técnico', to: '/catalogo', ...CATEGORY_DESIGNS[1] },
      ]

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayItems.map(({ label, to, sub, badge, img, accent }) => (
          <Link
            key={label}
            to={to}
            className="relative overflow-hidden rounded-sm p-10 md:p-14 flex flex-col justify-between min-h-[320px] group border border-[var(--color-border)] hover:border-[var(--color-gold)]/30 transition-all duration-500"
          >
            {/* Background image */}
            <img
              src={img}
              alt={label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors duration-500" />
            {/* Accent gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `linear-gradient(to top, ${accent} 0%, transparent 60%)` }}
            />
            {/* Corner ornament */}
            <div className="absolute top-6 right-6 w-16 h-16 border border-[var(--color-gold)]/25 rounded-sm rotate-12 group-hover:rotate-6 transition-transform duration-500" />

            <span className="relative z-10 text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-gold)] bg-black/40 backdrop-blur-sm border border-[var(--color-gold)]/30 px-3 py-1 rounded-sm self-start">
              {badge}
            </span>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black uppercase text-white mb-1 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                {label}
              </h3>
              <p className="text-sm text-white/60">{sub}</p>
              <div className="flex items-center gap-2 mt-5 text-xs font-bold tracking-widest uppercase text-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Ver colección
                <ArrowRight size={13} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   FEATURES — horizontal numbered list
══════════════════════════════════════════════════════════ */
function FeaturesSection() {
  const features = [
    { n: '01', img: '/images/features/performance.jpg', title: 'Alto rendimiento',    desc: 'Materiales técnicos que maximizan cada entrenamiento sin sacrificar comodidad.' },
    { n: '02', img: '/images/features/quality.jpg',     title: 'Calidad garantizada', desc: 'Cada producto pasa controles de calidad rigurosos antes de llegar a ti.' },
    { n: '03', img: '/images/features/brands.jpg',      title: 'Marcas de élite',     desc: 'Solo las mejores marcas del mundo deportivo en un solo lugar.' },
  ]

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
          {features.map(({ n, img, title, desc }) => (
            <div key={n} className="px-0 md:px-10 py-10 md:py-0 first:pl-0 last:pr-0 group">
              {/* Image thumbnail */}
              <div className="relative w-full h-36 mb-5 rounded-sm overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 text-2xl font-black text-[var(--color-gold)]/50 leading-none select-none">
                  {n}
                </span>
              </div>
              <h3 className="text-sm font-black uppercase tracking-wide text-white mb-2">{title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   TESTIMONIOS — Customer reviews
══════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const testimonials = [
    {
      name:  'Luis M.',
      city:  'Tuxtla Gutiérrez, Chiapas',
      text:  'Pedí unos Adidas Ultraboost y llegaron rápido. La atención fue excelente y los tenis son comodísimos. Sin duda volvería a comprar.',
      image: '/images/testimonials/athlete-1.jpg',
    },
    {
      name:  'Ana P.',
      city:  'Monterrey, Nuevo León',
      text:  'Compré unas espinilleras Nike. Todo llegó en tiempo y forma, con excelente empaque. Muy buena comunicación en todo momento.',
      image: '/images/testimonials/athlete-2.jpg',
    },
    {
      name:  'Carlos F.',
      city:  'Campeche, México',
      text:  'Excelente servicio. Me apoyaron a elegir talla y modelo, y los New Balance que pedí están increíbles. Todo muy profesional.',
      image: '/images/testimonials/athlete-3.jpg',
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-gold)]/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--color-gold)]" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--color-gold)]">
              Lo que dicen nuestros clientes
            </span>
            <div className="w-8 h-px bg-[var(--color-gold)]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight mb-4">
            Opiniones
          </h2>
          <p className="text-[var(--color-text-muted)] text-base max-w-2xl mx-auto">
            Cada compra en <span className="text-[var(--color-gold)] font-semibold">Athletic Store</span> es una
            experiencia de excelencia, confianza y estilo.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-surface-2)] border border-[var(--color-border)] rounded-sm p-8 hover:border-[var(--color-gold)]/40 hover:-translate-y-1.5 hover:shadow-[0_8px_40px_rgba(201,168,76,0.12)] transition-all duration-500"
            >
              {/* Quote mark */}
              <svg className="w-8 h-8 text-[var(--color-gold)]/50 mb-5" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8C6.134 8 3 11.134 3 15v9h9v-9H6c0-2.206 1.794-4 4-4V8zm13 0c-3.866 0-7 3.134-7 7v9h9v-9h-6c0-2.206 1.794-4 4-4V8z"/>
              </svg>

              {/* Quote text */}
              <p className="text-sm text-white/75 leading-relaxed italic mb-6 flex-1">
                "{t.text}"
              </p>

              {/* Divider */}
              <div className="h-px w-1/2 bg-gradient-to-r from-[var(--color-gold)]/30 to-transparent mb-5" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full border border-[var(--color-gold)]/20 bg-[var(--color-gold-muted)] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" className="text-[var(--color-gold)]/70">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20 C4 16 7.6 13 12 13 C16.4 13 20 16 20 20" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-gold)] text-sm">{t.name}</p>
                  <p className="text-[11px] text-[var(--color-text-faint)]">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   STATS SECTION — Impressive numbers
══════════════════════════════════════════════════════════ */
function StatsSection() {
  const stats = [
    { number: '5K+', label: 'Clientes satisfechos', icon: '👥' },
    { number: '10K+', label: 'Productos vendidos', icon: '📦' },
    { number: '50+', label: 'Marcas premium', icon: '🏆' },
    { number: '24/7', label: 'Soporte al cliente', icon: '💬' },
  ]

  return (
    <section className="bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-bg)] border-y border-[var(--color-border)] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ number, label, icon }, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {icon}
              </div>
              <p className="text-3xl md:text-4xl font-black text-white mb-1">{number}</p>
              <p className="text-xs md:text-sm text-[var(--color-text-muted)] tracking-wide">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   CUSTOM ORDER — ¿No encuentras tu marca?
══════════════════════════════════════════════════════════ */
function CustomOrderSection() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-px bg-[var(--color-gold)]" />
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--color-gold)]">
            Pedidos especiales
          </span>
          <div className="w-8 h-px bg-[var(--color-gold)]" />
        </div>

        <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight mb-5">
          ¿No encuentras tu marca<br className="hidden md:block" /> o modelo favorito?
        </h2>

        <p className="text-[var(--color-text-muted)] text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Si buscas un artículo en específico o una marca que aún no ves disponible,{' '}
          <span className="text-[var(--color-gold)] font-semibold">contáctanos directamente por DM</span> en
          Instagram. Nuestro equipo te ayudará a encontrarlo o cotizarlo al instante.
        </p>

        <a
          href="https://www.instagram.com/ac_athletic_store/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[var(--color-gold)] text-black text-sm font-black tracking-[0.15em] uppercase px-8 py-4 rounded-sm hover:bg-[var(--color-gold-light)] transition-colors duration-300 group"
        >
          {/* Instagram icon */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
          </svg>
          Enviar mensaje por Instagram
          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   CONTACT — Redes sociales y correo
══════════════════════════════════════════════════════════ */
const CONTACT_LINKS = [
  {
    label:    'Instagram',
    handle:   '@ac_athletic_store',
    sub:      'Síguenos en Instagram',
    href:     'https://www.instagram.com/ac_athletic_store/',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label:    'Facebook',
    handle:   'Athletic Store',
    sub:      'Visítanos en Facebook',
    href:     'https://www.facebook.com/profile.php?id=61565835671730',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label:    'TikTok',
    handle:   '@ac_athletic_store',
    sub:      'Síguenos en TikTok',
    href:     'https://www.tiktok.com/@ac_athletic_store',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.15 8.15 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
      </svg>
    ),
  },
  {
    label:    'Correo',
    handle:   'athleticstore9922@gmail.com',
    sub:      'Envíanos un mensaje',
    href:     'mailto:athleticstore9922@gmail.com',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
  },
]

function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)] border-y border-[var(--color-border)]">
      {/* Background glow */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--color-gold)]/[0.04] blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Info ── */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[var(--color-gold)]" />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--color-gold)]">
                Encuéntranos
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] mb-6">
              Contáctanos
            </h2>
            <p className="text-[var(--color-text-muted)] text-base leading-relaxed mb-8 max-w-md">
              Síguenos en redes o escríbenos por correo. Respondemos rápido y te ayudamos
              a encontrar lo que buscas.
            </p>

            {/* Location + hours */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm border border-[var(--color-border-2)] flex items-center justify-center shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" className="text-[var(--color-gold)]">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Tuxtla Gutiérrez, Chiapas</p>
                  <p className="text-xs text-[var(--color-text-faint)]">Envíos a toda la República Mexicana 🇲🇽</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm border border-[var(--color-border-2)] flex items-center justify-center shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" className="text-[var(--color-gold)]">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Lunes – Sábado</p>
                  <p className="text-xs text-[var(--color-text-faint)]">9:00 a 19:00 hrs</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Social cards ── */}
          <div className="grid grid-cols-2 gap-3">
            {CONTACT_LINKS.map(({ label, handle, sub, href, icon: Icon, accent }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group relative flex flex-col gap-4 p-6 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm overflow-hidden hover:border-[var(--color-gold)]/40 transition-all duration-400"
              >
                {/* Gold corner accent on hover */}
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-[var(--color-gold)] group-hover:w-full transition-all duration-500" />

                {/* Icon */}
                <div className="w-12 h-12 rounded-sm border border-[var(--color-border-2)] bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:text-[var(--color-gold)] group-hover:border-[var(--color-gold)]/40 group-hover:bg-[var(--color-gold-muted)] transition-all duration-300">
                  <Icon />
                </div>

                {/* Text */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-text-faint)] mb-1">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-white group-hover:text-[var(--color-gold)] transition-colors duration-300 leading-tight">
                    {handle}
                  </p>
                  <p className="text-[11px] text-[var(--color-text-faint)] mt-0.5">{sub}</p>
                </div>

                {/* Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight size={14} className="text-[var(--color-gold)]" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   PROMO BANNER — Limited time offer
══════════════════════════════════════════════════════════ */
function PromoSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-[var(--color-gold)]/10 via-[var(--color-surface)] to-[var(--color-bg)] border border-[var(--color-gold)]/20 p-12 md:p-20">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[var(--color-gold)]/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-[var(--color-gold)]/5 blur-[80px]" />

        <div className="relative z-10 max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-[var(--color-gold)] text-black text-[10px] font-black tracking-widest uppercase rounded-sm">
              Oferta especial
            </span>
            <span className="text-xs text-[var(--color-gold)] font-semibold">Tiempo limitado</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight mb-4">
            <span className="text-white">Descuento del</span>
            <br />
            <span className="text-[var(--color-gold)]">20% en todo</span>
          </h2>

          <p className="text-[var(--color-text-muted)] text-base md:text-lg mb-8 max-w-lg">
            Aprovecha nuestra promoción especial de bienvenida. Usa el código WINNERS20 al checkout.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/catalogo">
              <Button size="lg" className="group">
                Aprovechar ahora
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <button
              onClick={() => navigator.clipboard.writeText('WINNERS20')}
              className="px-6 py-3 text-sm font-semibold text-[var(--color-gold)] border border-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 rounded-sm transition-colors duration-300"
            >
              Copiar código
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg)] py-28">
      {/* Left gold strip */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[var(--color-gold)] to-transparent opacity-60" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[var(--color-gold)] opacity-[0.04] blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-[var(--color-gold)]" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--color-gold)]">
              Únete ahora
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9] mb-8">
            <span className="text-white block">¿Listo para</span>
            <span className="text-[var(--color-gold)] block">ganar?</span>
          </h2>

          <p className="text-[var(--color-text-muted)] text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            Descubre la colección completa de Athletic Store y encuentra el equipamiento que te llevará al siguiente nivel.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/catalogo">
              <Button size="lg" className="group">
                Explorar colección
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Big background text */}
      <div
        className="absolute right-0 bottom-0 text-[20vw] font-black uppercase leading-none select-none pointer-events-none"
        style={{
          WebkitTextStroke: '1px rgba(201,168,76,0.05)',
          color: 'transparent',
        }}
      >
        WIN
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   PAGE EXPORT
══════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandsMarquee />
      <FeaturedSection />
      <CategoryBanner />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CustomOrderSection />
      <ContactSection />
      <PromoSection />
      <CTASection />
    </>
  )
}
