-- =========================
-- ENABLE RLS
-- =========================

alter table products enable row level security;
alter table categories enable row level security;
alter table product_images enable row level security;

-- =========================
-- PUBLIC READ PRODUCTS
-- =========================

create policy "Public can view active products"
on products
for select
using (is_active = true);

-- =========================
-- PUBLIC READ CATEGORIES
-- =========================

create policy "Public can view active categories"
on categories
for select
using (is_active = true);

-- =========================
-- PUBLIC READ IMAGES
-- =========================

create policy "Public can view product images"
on product_images
for select
using (true);