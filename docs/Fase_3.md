FASE 3: DISEÑO E IMPLEMENTACIÓN DE BASE DE DATOS Y SEGURIDAD (RLS)

ÍNDICE
3.1 Introducción
 3.2 Objetivo de la fase
 3.3 Configuración del entorno local con Supabase
 3.4 Diseño del modelo de datos
 3.5 Creación de migraciones
 3.6 Implementación de tablas
 3.7 Relaciones entre entidades
 3.8 Implementación de seguridad (RLS)
 3.9 Verificación del sistema
 3.10 Resultados obtenidos

3.1 Introducción
En esta fase se llevó a cabo la implementación del backend del sistema Athletic Store mediante el uso de Supabase en un entorno local, aplicando un enfoque profesional basado en migraciones versionadas, diseño estructurado de base de datos y configuración de seguridad mediante Row Level Security (RLS).
El objetivo fue construir una base sólida, escalable y segura que permita gestionar productos, categorías e imágenes de manera eficiente, manteniendo control total sobre el acceso a los datos.

3.2 Objetivo de la fase
El objetivo de esta fase fue:
Implementar la base de datos del sistema mediante PostgreSQL
Definir las entidades principales del dominio
Crear migraciones versionadas
Establecer relaciones entre tablas
Configurar seguridad a nivel de base de datos (RLS)
Validar el funcionamiento del entorno local

3.3 Configuración del entorno local con Supabase
Se utilizó Supabase CLI en conjunto con Docker para levantar un entorno local que simula el backend completo del sistema.
Herramientas utilizadas:
Supabase CLI
Docker Desktop
PostgreSQL (integrado en Supabase)
Comando de inicialización:
npx supabase init
Comando de ejecución:
npx supabase start
Esto permitió disponer de:
Base de datos local
API REST automática
Panel de administración (Supabase Studio)
Sistema de autenticación

3.4 Diseño del modelo de datos
El sistema se diseñó con base en tres entidades principales:
Categorías
Productos
Imágenes de productos
Decisiones clave:
Uso de UUID como identificador primario
Separación de imágenes en tabla independiente
Uso de discount_percentage en lugar de duplicar precios
Inclusión de estados (is_active) para control de visibilidad

3.5 Creación de migraciones
Se utilizó el sistema de migraciones de Supabase para versionar la base de datos.
Creación de migración principal:
npx supabase migration new create_core_tables
Creación de migración de seguridad:
npx supabase migration new enable_rls
Aplicación de migraciones:
npx supabase db reset
Este comando permitió reconstruir la base de datos desde cero y aplicar todas las migraciones de forma controlada.

3.6 Implementación de tablas
Tabla: categories
create table categories (
 id uuid primary key default gen_random_uuid(),
 name text not null unique,
 is_active boolean default true,
 created_at timestamptz default now()
);

Tabla: products
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

Tabla: product_images
create table product_images (
 id uuid primary key default gen_random_uuid(),
 product_id uuid not null references products(id) on delete cascade,
 url text not null,
 is_main boolean default false,
 created_at timestamptz default now()
);

3.7 Relaciones entre entidades
El modelo relacional quedó definido de la siguiente manera:
Una categoría puede tener múltiples productos
Un producto puede pertenecer a una categoría
Un producto puede tener múltiples imágenes
Representación:
categories (1) ──── (N) products (1) ──── (N) product_images

3.8 Implementación de seguridad (RLS)
Se habilitó Row Level Security en todas las tablas para controlar el acceso a los datos.
Activación de RLS:
alter table products enable row level security;
alter table categories enable row level security;
alter table product_images enable row level security;

Políticas definidas:
Lectura pública de productos activos
create policy "Public can view active products"
on products
for select
using (is_active = true);

Lectura pública de categorías activas
create policy "Public can view active categories"
on categories
for select
using (is_active = true);

Lectura pública de imágenes
create policy "Public can view product images"
on product_images
for select
using (true);

Justificación
El uso de RLS permite:
Proteger datos directamente desde la base de datos
Evitar accesos no autorizados
Delegar la seguridad al motor de PostgreSQL
Preparar el sistema para múltiples roles en el futuro

3.9 Verificación del sistema
Se verificó el correcto funcionamiento mediante:
Supabase Studio (panel local)
Visualización de tablas creadas
Validación de políticas de seguridad
Confirmación de ausencia de errores de seguridad
Resultado:
Tablas creadas correctamente
Relaciones funcionales
Seguridad aplicada correctamente
Sistema sin advertencias de seguridad

3.10 Resultados obtenidos
Al finalizar esta fase se logró:
Implementación completa de la base de datos
Estructura escalable y bien definida
Uso de migraciones versionadas
Separación clara de entidades
Seguridad implementada mediante RLS
Entorno local completamente funcional

🚀 Conclusión de la fase
La fase 3 permitió establecer un backend sólido, seguro y escalable para Athletic Store. El uso de Supabase junto con migraciones versionadas garantizó un control total sobre la evolución de la base de datos, mientras que la implementación de Row Level Security aseguró un manejo adecuado de permisos desde el nivel más crítico del sistema.
Esta fase representa la transición de un proyecto estructural a un sistema funcional con lógica de datos real, listo para integrarse con el frontend y continuar su desarrollo hacia funcionalidades completas de visualización y administración.
