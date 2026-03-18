FASE 4: INTEGRACIÓN DEL FRONTEND CON SUPABASE Y PRIMER FLUJO FUNCIONAL DE CATÁLOGO
Índice
4.1 Introducción
 4.2 Objetivo de la fase
 4.3 Alcance de la fase
 4.4 Estructura aplicada al frontend
 4.5 Flujo funcional que se implementará
 4.6 Configuración de variables de entorno
 4.7 Conexión del frontend con Supabase
 4.8 Definición de tipos y entidades del dominio
 4.9 Capa de infraestructura
 4.10 Capa de aplicación
 4.11 Capa de presentación
 4.12 Sistema de rutas
 4.13 Flujo completo de consulta de productos
 4.14 Resultado esperado al finalizar la fase
 4.15 Orden real de implementación

4.1 Introducción
En esta fase se realizará la integración formal entre el frontend desarrollado en React y el backend gestionado mediante Supabase. A partir de este punto, el proyecto dejará de trabajar únicamente con estructura base y base de datos aislada, y comenzará a consumir información real desde el entorno de desarrollo local.
El propósito principal es construir el primer flujo funcional del sistema: obtener productos activos desde Supabase y mostrarlos en una vista de catálogo pública dentro del frontend. Esta fase representa el inicio de la conexión real entre interfaz, lógica de aplicación, infraestructura y dominio, respetando la arquitectura desacoplada definida en las etapas anteriores.

4.2 Objetivo de la fase
El objetivo de esta fase es implementar el primer módulo funcional del frontend conectado con el backend local, estructurándolo conforme a la arquitectura por capas definida para el proyecto.
De forma específica, en esta fase se realizará lo siguiente:
Configurar el frontend para conectarse con Supabase local
Definir los tipos y entidades del dominio para productos
Crear la capa de infraestructura que consumirá Supabase
Crear la capa de aplicación que orquestará la consulta de productos
Construir la vista inicial del catálogo
Configurar el sistema de rutas
Validar el flujo completo desde base de datos hasta interfaz

4.3 Alcance de la fase
En esta etapa se implementará únicamente el flujo de lectura pública de productos.
Esto incluye:
Consulta de productos activos
Obtención de categoría asociada
Obtención de imágenes del producto
Cálculo del precio final en caso de descuento
Renderizado en una página de catálogo
No se incluirá todavía:
Panel de administración
Login
CRUD de productos
Subida de imágenes a Cloudinary
Formularios administrativos
Eso se abordará en fases posteriores.

4.4 Estructura aplicada al frontend
Se trabajará sobre la siguiente estructura, ya definida previamente:
src
├── application
│   ├── hooks
│   └── use-cases
├── assets
├── domain
│   ├── entities
│   └── types
├── infrastructure
│   ├── cloudinary
│   └── supabase
├── presentation
│   ├── components
│   ├── layouts
│   └── pages
└── routes
Cada carpeta tendrá una responsabilidad específica:
domain
Contendrá la definición conceptual del sistema. Aquí se modelará qué es un producto y qué propiedades debe tener.
infrastructure
Contendrá la comunicación con Supabase. Esta capa será la única que conocerá detalles de la API o del cliente de base de datos.
application
Contendrá la lógica intermedia. Aquí se definirán hooks y casos de uso para obtener productos y transformarlos si es necesario.
presentation
Contendrá las páginas, componentes y layouts visuales del sistema.
routes
Contendrá la configuración de navegación de la aplicación.

4.5 Flujo funcional que se implementará
El flujo funcional de esta fase será el siguiente:
El usuario entra al frontend
El sistema carga la ruta del catálogo
La página del catálogo invoca un hook de aplicación
El hook ejecuta un caso de uso
El caso de uso solicita productos al repositorio de infraestructura
La infraestructura consulta Supabase
Supabase devuelve productos, categorías e imágenes
El frontend transforma los datos al modelo del dominio
Se renderizan tarjetas de productos en pantalla

4.6 Configuración de variables de entorno
Durante esta fase se trabajará primero con Supabase local.
Entorno local
La aplicación React se conectará a los servicios levantados con Supabase CLI local.
Las variables de entorno que se usarán serán:
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=TU_PUBLISHABLE_KEY_LOCAL
La clave local es la que Supabase mostró al ejecutar npx supabase start.
Más adelante, para producción, estas variables cambiarán por las del proyecto en la nube.

4.7 Conexión del frontend con Supabase
La conexión con Supabase se implementará dentro de la capa de infraestructura.
Archivo propuesto:
src/infrastructure/supabase/client.js
Responsabilidad:
Inicializar el cliente de Supabase
Centralizar la conexión
Evitar instancias repetidas del cliente
Este archivo será la base para todas las futuras operaciones del sistema.

4.8 Definición de tipos y entidades del dominio
Antes de consumir datos, se definirá el modelo del producto dentro del dominio.
Entidad principal: Product
El producto contendrá como mínimo:
id
name
description
price
discountPercentage
finalPrice
brand
category
imageUrl
isActive
Aquí es importante aclarar que finalPrice no necesariamente se guardará en la base de datos, sino que puede calcularse en la capa de aplicación a partir de price y discountPercentage.
Esto mantiene coherencia con el diseño de base de datos definido en la fase anterior.

4.9 Capa de infraestructura
La infraestructura será responsable de obtener productos desde Supabase.
Archivos propuestos
src/infrastructure/supabase/client.js
src/infrastructure/supabase/productRepository.js
Responsabilidades
client.js
Inicializa el cliente Supabase.
productRepository.js
Realiza la consulta a la tabla products, incluyendo:
categoría
imágenes asociadas
filtro por productos activos
Esta capa no tendrá lógica visual ni de negocio compleja. Su función será únicamente acceder a la fuente de datos.

4.10 Capa de aplicación
La capa de aplicación se encargará de coordinar la obtención de productos y preparar la información para la interfaz.
Archivos propuestos
src/application/use-cases/getPublicProducts.js
src/application/hooks/useProducts.js
Responsabilidades
getPublicProducts.js
Define el caso de uso para obtener los productos visibles del catálogo.
useProducts.js
Encapsula la lógica React para:
cargar datos
manejar loading
manejar errores
exponer productos listos para renderizado
Aquí también puede calcularse el precio final del producto.

4.11 Capa de presentación
La capa de presentación contendrá la interfaz pública del catálogo.
Archivos propuestos
src/presentation/components/ProductCard.jsx
src/presentation/pages/CatalogPage.jsx
src/presentation/layouts/MainLayout.jsx
Responsabilidades
ProductCard.jsx
Mostrar:
imagen principal
nombre
marca
categoría
precio base
precio con descuento si aplica
CatalogPage.jsx
Consumir el hook useProducts y renderizar la lista.
MainLayout.jsx
Definir la estructura visual base que luego podrá reutilizarse para landing, catálogo y otras páginas públicas.

4.12 Sistema de rutas
Se configurará React Router para manejar la navegación inicial del sistema.
Rutas mínimas de esta fase
/ → Landing temporal o página base
/catalogo → Catálogo público
Archivo propuesto
src/routes/AppRouter.jsx
La aplicación central se apoyará en este archivo para estructurar el flujo de navegación.

4.13 Flujo completo de consulta de productos
El flujo técnico completo quedará así:
CatalogPage
  ↓
useProducts
  ↓
getPublicProducts
  ↓
productRepository
  ↓
Supabase Client
  ↓
Supabase local
Este flujo respeta la arquitectura establecida, evitando que la UI consulte directamente la base de datos.

4.14 Resultado esperado al finalizar la fase
Al finalizar esta fase, el sistema contará con:
Frontend conectado a Supabase local
Página de catálogo funcional
Datos reales obtenidos desde la base de datos
Renderizado dinámico de productos
Cálculo de precios con descuento
Arquitectura desacoplada aplicada correctamente
Esto dejará la base lista para continuar con:
detalle de producto
admin login
CRUD
integración con Cloudinary

4.15 Orden real de implementación
El desarrollo de esta fase se realizará en este orden exacto:
Paso 1
Configurar variables de entorno locales
Paso 2
Crear cliente Supabase en infraestructura
Paso 3
Definir tipos y entidad Product
Paso 4
Crear repositorio de productos en infraestructura
Paso 5
Crear caso de uso getPublicProducts
Paso 6
Crear hook useProducts
Paso 7
Crear componente ProductCard
Paso 8
Crear página CatalogPage
Paso 9
Configurar MainLayout
Paso 10
Configurar AppRouter
Paso 11
Probar flujo completo

Siguiente paso práctico
Sí, ahora ya podemos entrar a implementar el código paso por paso, respetando tu estructura.
Lo correcto es empezar con:
Paso 1: configurar .env local
Paso 2: crear client.js de Supabase
Paso 3: crear repositorio de productos

4.16 Implementación del frontend y conexión con Supabase

Configuración del entorno frontend
Para el desarrollo del frontend se utilizó React con Vite, estructurado bajo una arquitectura por capas. Se configuraron variables de entorno para permitir la conexión con Supabase en entorno local.
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=clave_publica_local
Estas variables permiten establecer la comunicación con la API generada automáticamente por Supabase.

Inicialización del cliente de Supabase
Se creó un cliente centralizado para evitar múltiples instancias y facilitar el acceso a la base de datos desde la capa de infraestructura.
Archivo:
 src/infrastructure/supabase/client.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

Implementación del repositorio de productos
Se implementó un repositorio encargado de obtener los productos desde la base de datos, incluyendo relaciones con categorías e imágenes.
Archivo:
 src/infrastructure/supabase/productRepository.js
export const productRepository = {
 async getAllPublicProducts() {
   const { data, error } = await supabase
     .from('products')
     .select(`
       id,
       name,
       description,
       price,
       discount_percentage,
       brand,
       is_active,
       categories ( id, name ),
       product_images ( id, url, is_main )
     `)
     .eq('is_active', true)

   return data
 }
}

Implementación del caso de uso
Se creó un caso de uso para transformar los datos provenientes de la base de datos al modelo que utilizará la interfaz.
Archivo:
 src/application/use-cases/getPublicProducts.js
Se realizaron las siguientes transformaciones:
Selección de imagen principal
Cálculo del precio con descuento
Adaptación del formato de datos

Implementación del hook personalizado
Se desarrolló un hook para manejar el estado de los productos dentro del frontend.
Archivo:
 src/application/hooks/useProducts.js
Este hook permite:
Obtener los productos
Manejar estado de carga
Manejar errores
Exponer datos listos para la vista

Implementación de la capa de presentación
Se construyeron los primeros componentes visuales del sistema:
ProductCard
Encargado de mostrar la información del producto:
Imagen
Nombre
Marca
Categoría
Precio original
Precio con descuento

CatalogPage
Encargada de:
Consumir el hook useProducts
Iterar sobre los productos
Renderizar las tarjetas

MainLayout
Define la estructura base del sitio:
Header
Contenedor principal

Configuración de rutas
Se implementó React Router para manejar la navegación del sistema.
Archivo:
 src/routes/AppRouter.jsx
Se definieron las rutas:
/ → Catálogo
/catalogo → Catálogo

Flujo funcional implementado
El flujo completo quedó de la siguiente forma:
Usuario
 ↓
CatalogPage
 ↓
useProducts (hook)
 ↓
getPublicProducts (caso de uso)
 ↓
productRepository (infraestructura)
 ↓
Supabase

Resultado obtenido
Al finalizar esta implementación se logró:
Conexión exitosa entre frontend y Supabase
Consumo de datos reales desde la base de datos
Renderizado dinámico de productos
Separación de responsabilidades por capas
Primer flujo funcional completo del sistema

Observaciones
Actualmente el sistema muestra los productos correctamente, pero aún no cuenta con un diseño visual avanzado. La interfaz se encuentra en una fase inicial y será mejorada en etapas posteriores mediante estilos personalizados y diseño responsive.
