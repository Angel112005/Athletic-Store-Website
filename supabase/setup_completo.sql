-- ============================================================
-- ATHLETIC STORE — Setup completo de base de datos
-- Pega TODO este contenido en el SQL Editor de Supabase
-- y haz clic en "Run"
-- ============================================================


-- =========================
-- 1. TABLAS
-- =========================

create table if not exists categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  is_active  boolean default true,
  created_at timestamptz default now()
);

create table if not exists products (
  id                  uuid primary key default gen_random_uuid(),
  name                text not null,
  description         text,
  price               numeric(10,2) not null,
  discount_percentage int,
  brand               text,
  category_id         uuid references categories(id) on delete set null,
  is_active           boolean default true,
  created_at          timestamptz default now()
);

create table if not exists product_images (
  id         uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url        text not null,
  is_main    boolean default false,
  "order"    int default 0,
  created_at timestamptz default now()
);


-- =========================
-- 2. ROW LEVEL SECURITY
-- =========================

alter table products       enable row level security;
alter table categories     enable row level security;
alter table product_images enable row level security;


-- =========================
-- 3. POLÍTICAS PÚBLICAS (lectura sin login)
-- =========================

create policy "Public can view active products"
  on products for select
  using (is_active = true);

create policy "Public can view active categories"
  on categories for select
  using (is_active = true);

create policy "Public can view product images"
  on product_images for select
  using (true);


-- =========================
-- 4. POLÍTICAS ADMIN (CRUD completo con login)
-- =========================

create policy "Admin full access on products"
  on products for all
  using     (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin full access on categories"
  on categories for all
  using     (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin full access on product_images"
  on product_images for all
  using     (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- =========================
-- 5. VERIFICACIÓN (opcional)
-- Descomenta estas líneas para confirmar que todo existe
-- =========================
-- select table_name from information_schema.tables
-- where table_schema = 'public'
-- order by table_name;
