import { useProducts } from '../../application/hooks/useProducts'
import ProductCard from '../components/ProductCard'

const CatalogPage = () => {
  const { products, loading, error } = useProducts()

  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm">
        <p className="text-lg font-semibold text-slate-700">Cargando productos...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="rounded-3xl border border-rose-200 bg-rose-50 p-8 shadow-sm">
        <p className="text-lg font-semibold text-rose-700">Error al cargar productos</p>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-600">
          Coleccion en linea
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Catalogo de calzado y articulos deportivos
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 sm:text-base">
          Explora productos activos cargados desde Supabase con arquitectura desacoplada.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
          No hay productos activos para mostrar.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default CatalogPage