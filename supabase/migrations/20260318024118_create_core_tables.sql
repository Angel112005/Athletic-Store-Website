-- =========================
-- TABLE: categories
-- =========================
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- =========================
-- TABLE: products
-- =========================
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null,
  discount_percentage int,
  brand text,
  category_id uuid references categories(id) on delete set null,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- =========================
-- TABLE: product_images
-- =========================
create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  is_main boolean default false,
  created_at timestamptz default now()
);