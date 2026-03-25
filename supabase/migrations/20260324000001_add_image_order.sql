-- =========================
-- Add order column to product_images
-- =========================

alter table product_images
  add column if not exists "order" int default 0;

-- =========================
-- ADMIN RLS POLICIES
-- Permite al admin autenticado hacer CRUD completo
-- =========================

-- PRODUCTS (admin)
create policy "Admin full access on products"
on products
for all
using     (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

-- CATEGORIES (admin)
create policy "Admin full access on categories"
on categories
for all
using     (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

-- PRODUCT_IMAGES (admin)
create policy "Admin full access on product_images"
on product_images
for all
using     (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
