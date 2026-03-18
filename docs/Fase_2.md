FASE 2: Inicialización del proyecto
1. Crear el repositorio (base del proyecto)
🔹 Paso 1: Crear repo en GitHub
Nombre recomendado:
athletic-store
Configura:
✅ Public (para portafolio)
✅ README inicial
❌ NO agregar .gitignore (lo generamos después)
❌ NO licencia (opcional luego)

🔹 Paso 2: Clonar repo en tu máquina
git clone https://github.com/TU-USUARIO/athletic-store.git
cd athletic-store

2. Definir estructura base del proyecto (MUY IMPORTANTE)
Crea esta estructura desde el inicio:
mkdir apps
mkdir apps/web

mkdir docs
mkdir supabase
mkdir supabase/migrations


3. Inicializar frontend con React + Vite
Dentro de apps/web:
cd apps/web
npm create vite@latest
Configura:
Nombre: web
Framework: React
Variante: JavaScript (o TypeScript si quieres más pro)
Luego:
npm install

4. Instalar dependencias clave
Dentro de apps/web:
npm install react-router-dom
npm install @supabase/supabase-js

5. Instalar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Configura tailwind.config.js:
content: [
 "./index.html",
 "./src/**/*.{js,ts,jsx,tsx}",
],
En index.css:
@tailwind base;
@tailwind components;
@tailwind utilities;

6. Crear estructura interna del frontend (arquitectura definida)
Dentro de src/, crea esto:
mkdir presentation
mkdir presentation/components
mkdir presentation/pages
mkdir presentation/layouts

mkdir application
mkdir application/hooks
mkdir application/use-cases

mkdir domain
mkdir domain/entities
mkdir domain/types

mkdir infrastructure
mkdir infrastructure/supabase
mkdir infrastructure/cloudinary

mkdir routes

7. Crear archivo de variables de entorno
En apps/web/:
touch .env
Ejemplo:
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

8. Subir estructura inicial a Git
Desde raíz del proyecto:
git add .
git commit -m "feat: initial project structure with frontend architecture"
git push

🔥 9. Inicializar Supabase (LOCAL)
Aquí empieza lo importante 💡
Instalar CLI:
npm install -g supabase
Inicializar en raíz del proyecto:
supabase init
Esto creará:
supabase/
├── config.toml

Levantar entorno local:
supabase start
👉 Esto te levanta:
PostgreSQL local
API local
Dashboard local

🔥 10. Crear proyecto en Supabase (NUBE)
Ve a Supabase
Crea proyecto:
Nombre: athletic-store
Copia:
URL
ANON KEY
Guárdalos en .env

🔥 11. Crear cliente de Supabase (frontend)
Archivo:
infrastructure/supabase/client.js
Código:
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

🔥 12. Verificación inicial
Corre el proyecto:
npm run dev
✔️ Debe abrir React
 ✔️ Sin errores
 ✔️ Estructura lista

🧠 ¿Qué sigue después de esto? (IMPORTANTE)
Una vez que tengas esto listo, el siguiente paso correcto es:

👉 FASE 3 (siguiente paso contigo):
Diseño de base de datos + primera migración
Aquí vamos a definir:
Tabla products
Tabla product_images
Tabla categories
Relaciones
Estados (activo/inactivo)
Y lo más importante:
 👉 crear migraciones SQL reales con Supabase CLI


