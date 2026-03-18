const ProductCard = ({ product }) => {
  const imageUrl =
    product.imageUrl ||
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'

  const hasDiscount = product.discountPercentage > 0

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold leading-tight text-slate-900">{product.name}</h3>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {product.category}
          </span>
        </div>

        <p className="text-sm font-medium text-slate-500">{product.brand || 'Marca no definida'}</p>

        <div className="flex items-baseline gap-2">
          {hasDiscount ? (
            <>
              <span className="text-sm font-semibold text-slate-400 line-through">${product.price}</span>
              <span className="text-2xl font-extrabold text-emerald-600">${product.finalPrice}</span>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">
                -{product.discountPercentage}%
              </span>
            </>
          ) : (
            <span className="text-2xl font-extrabold text-slate-900">${product.price}</span>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductCard