ATHLETIC STORE
FASE 1: DEFINICIÓN DE ARQUITECTURA, TECNOLOGÍAS Y FLUJO DE TRABAJO

ÍNDICE
Introducción


Objetivo de la fase


Modelo de trabajo del proyecto


Tecnologías seleccionadas


Arquitectura del frontend (definida)


Arquitectura general del sistema


Integración entre componentes del sistema


Estrategia de desarrollo local y en la nube


Gestión y versionado de la base de datos


Seguridad del sistema (RLS y control de acceso)


Organización del repositorio


Flujo de trabajo del desarrollo


Valor profesional del proyecto


Conclusión



1. Introducción
El proyecto Athletic Store evoluciona de una landing page estática hacia un sistema web estructurado, escalable y profesional, orientado a la visualización y gestión de productos deportivos. Esta fase establece las bases técnicas que regirán todo el desarrollo del sistema, asegurando que cada componente sea diseñado bajo estándares reales de la industria.
El sistema incluirá tanto una interfaz pública para clientes como un panel administrativo privado, garantizando una separación clara de responsabilidades, seguridad robusta y capacidad de crecimiento a futuro.
2. Objetivo de la fase
El objetivo de esta fase es definir de manera completa y definitiva:
La arquitectura del sistema
Las tecnologías a utilizar
La forma de trabajo local y en la nube
La estructura del frontend y backend
El flujo de integración entre todos los componentes
Las prácticas de seguridad y versionado
Esta fase establece un marco sólido que elimina improvisaciones durante el desarrollo.
3. Modelo de trabajo del proyecto
El proyecto se desarrollará bajo un enfoque híbrido, combinando desarrollo local con despliegue en la nube.
3.1 Desarrollo local
El entorno local será utilizado para:
Desarrollo del frontend
Ejecución de Supabase mediante CLI
Pruebas de base de datos
Implementación de migraciones
Validación de lógica y seguridad


3.2 Entorno en la nube
El entorno en la nube será utilizado para:
Base de datos productiva (Supabase)
Almacenamiento de imágenes (Cloudinary)
Hosting del frontend (Cloudflare)
Este modelo garantiza control total del desarrollo sin comprometer el entorno productivo.
4. Tecnologías seleccionadas
4.1 Frontend
React
Vite
Tailwind CSS
React Router
4.2 Backend y base de datos
Supabase
PostgreSQL
Supabase CLI
4.3 Almacenamiento de imágenes
Cloudinary
4.4 Infraestructura y despliegue
Cloudflare Pages
GitHub
GoDaddy (dominio)
Todas las tecnologías seleccionadas son modernas, ampliamente utilizadas y adecuadas para sistemas escalables.
5. Arquitectura del frontend (definida)
5.1 Enfoque arquitectónico adoptado
El frontend de Athletic Store se desarrollará bajo una arquitectura por capas inspirada en principios de Arquitectura Hexagonal y Clean Architecture, adaptada al contexto de aplicaciones frontend modernas con React.
Este enfoque garantiza:
Separación clara de responsabilidades
Desacoplamiento entre lógica y presentación
Escalabilidad del sistema
Mantenibilidad del código
Facilidad de pruebas
5.2 Capas definidas del frontend
El frontend se organizará en las siguientes capas:
1. Capa de Presentación (UI)
Responsable de la interfaz visual.
Incluye:
Componentes (cards, botones, inputs)
Páginas (landing, catálogo, admin)
Layouts
Estilos (Tailwind)
No contiene lógica de negocio.

2. Capa de Aplicación
Contiene la lógica de interacción del sistema.
Incluye:
Hooks personalizados
Casos de uso (use cases)
Manejo de estado
Ejemplo:
Obtener productos
Crear producto
Filtrar catálogo

3. Capa de Dominio
Define los modelos conceptuales del sistema.
Incluye:
Entidades (Product, Category, Image)
Tipos y estructuras de datos
Reglas básicas del dominio
No depende de frameworks ni librerías externas.

4. Capa de Infraestructura
Encargada de la comunicación con servicios externos.
Incluye:
Cliente de Supabase
Integración con Cloudinary
Servicios de API
Es la única capa que conoce detalles externos.

5.3 Estructura de carpetas del frontend






apps/web/src/

├── presentation/
│   ├── components/
│   ├── pages/
│   └── layouts/
│
├── application/
│   ├── hooks/
│   └── use-cases/
│
├── domain/
│   ├── entities/
│   └── types/
│
├── infrastructure/
│   ├── supabase/
│   └── cloudinary/
│
├── routes/
└── main.jsx

5.4 Justificación de la arquitectura
Esta arquitectura es la ideal para el proyecto porque:
Permite crecimiento sin refactorización masiva
Evita código espagueti
Facilita mantenimiento
Aísla dependencias externas
Refleja prácticas reales de desarrollo profesional
Por estas razones, se establece de forma definitiva como la arquitectura del frontend del sistema

6. Arquitectura general del sistema
El sistema se compone de los siguientes bloques:
Frontend (React)
Supabase (backend + base de datos)
Cloudinary (imágenes)
Cloudflare (hosting)
GitHub (control de versiones)
Flujo general
Frontend (React)
       ↓
Supabase (API + DB + Auth)
       ↓
Cloudinary (imágenes)

7. Integración entre componentes
7.1 Flujo de consulta de productos
Frontend solicita productos a Supabase
Supabase consulta PostgreSQL
Devuelve datos con URLs de imágenes
Frontend renderiza contenido


7.2 Flujo de creación de productos
Admin accede al panel
Sube imágenes a Cloudinary
Cloudinary devuelve URLs
Se guardan en Supabase junto al producto
El producto queda disponible en el catálogo



8. Estrategia de desarrollo local y en la nube
8.1 Entorno local
Se utiliza Supabase CLI para simular:
Base de datos
API
Autenticación
8.2 Entorno productivo
Se utiliza:
Supabase en la nube
Cloudinary
Cloudflare
El desarrollo se valida primero en local y luego se despliega.

9. Gestión y versionado de la base de datos
La base de datos se gestiona mediante migraciones SQL versionadas.
Cada cambio estructural se guarda como archivo en:
supabase/migrations/
Esto permite:
Control de cambios
Reproducibilidad
Escalabilidad
Auditoría

10. Seguridad del sistema (RLS y control de acceso)
10.1 Definición de RLS
RLS (Row Level Security) permite controlar qué datos puede ver o modificar cada usuario.
10.2 Aplicación en el sistema
Usuarios públicos → solo ven productos activos
Administrador → acceso total
10.3 Medidas de seguridad
Autenticación con Supabase
Uso de variables de entorno
Protección de endpoints
Restricción de acceso al panel admin
Políticas de acceso en base de datos

11. Organización del repositorio
Se trabajará con un monorepo estructurado:
athletic-store/
├── apps/
│   └── web/
│
├── docs/
│
├── supabase/
│   ├── migrations/
│   └── seed.sql
│
├── README.md

12. Flujo de trabajo del desarrollo
El flujo será:
Definición de tarea
Documentación
Desarrollo local
Pruebas
Versionado en Git
Despliegue en nube
Este proceso asegura orden y calidad.

13. Valor profesional del proyecto
Este enfoque permite demostrar:
Uso de arquitecturas modernas
Control de base de datos
Seguridad avanzada
Integración de servicios en la nube
Flujo de trabajo real
Código mantenible y escalable

14. Conclusión
La arquitectura, tecnologías y flujo de trabajo definidos en esta fase establecen una base sólida y profesional para el desarrollo de Athletic Store. El sistema se construirá bajo principios de desacoplamiento, seguridad y escalabilidad, utilizando herramientas modernas que permiten un desarrollo eficiente y alineado con estándares de la industria.
El frontend adoptará una arquitectura por capas inspirada en arquitectura hexagonal, garantizando organización y crecimiento sostenible. Supabase actuará como backend central con control de acceso mediante RLS, mientras que Cloudinary optimizará la gestión de imágenes.
Este enfoque posiciona el proyecto no solo como una aplicación funcional, sino como una solución técnica bien diseñada, con alto valor en portafolio profesional.
