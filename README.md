# NovaPay Backend

NovaPay Backend es la API del proyecto académico NovaPay, responsable de autenticación, gestión de sesiones, consulta de transacciones, consulta de clientes y comunicación con la API externa de datos.

Este repositorio forma parte de un reto académico desarrollado en The Bridge School Talent Accelerator. El reto fue propuesto a la escuela por la empresa Cívica y se ha trabajado en colaboración con la promoción Marzo 2026 de Data Science y Ciberseguridad.

Este proyecto no está destinado a ser clonado, reutilizado ni desplegado como producto independiente. Su finalidad es académica, demostrativa y ligada al contexto del reto.

## Deploy

- API backend: https://back-end-challenge-the-bridge.onrender.com/
- Frontend: https://front-end-challenge-the-bridge.vercel.app/

La API desplegada permite peticiones únicamente desde el despliegue del frontend.

## Objetivo

El backend centraliza la autenticación de analistas, protege las rutas privadas mediante JWT en cookies, expone endpoints para el frontend y actúa como capa de integración con los datos transaccionales proporcionados por el equipo de Data Science.

## Funcionalidades principales

- Login, logout y recuperación de usuario activo.
- Autenticación propia de analistas mediante JWT.
- Cookies HTTP para persistencia de sesión.
- Middleware de protección para rutas privadas.
- Consulta de estadísticas de dashboard.
- Consulta, detalle y actualización de transacciones.
- Consulta, detalle y actualización de clientes.
- Integración con API externa de Data Science.
- Conexión a base de datos PostgreSQL mediante Sequelize.

## Tecnologias core

- Node.js: entorno de ejecución.
- Express 5: servidor HTTP y definición de rutas.
- PostgreSQL: base de datos relacional.
- Sequelize: ORM y sincronización de modelos.
- CommonJS: sistema de módulos del backend.

## Librerias importantes

- Axios: consumo de API externa de Data Science.
- bcryptjs: hash y validación de credenciales.
- jsonwebtoken: emisión y verificación de tokens JWT.
- cookie-parser: lectura de cookies de sesion.
- cors: control de orígenes permitidos.
- helmet: cabeceras básicas de seguridad HTTP.
- morgan: logging de peticiones en desarrollo.
- pg y pg-hstore: driver y soporte PostgreSQL para Sequelize.

## Scripts disponibles

```bash
npm run dev
npm run start:local
npm start
npm run db:sync:local
npm run db:sync:prod
```

## Variables de entorno

El proyecto utiliza archivos `.env.local` y `.env.prod`. Las variables principales esperadas son:

```bash
PORT=4000
FRONTEND_URL=https://front-end-challenge-the-bridge.vercel.app
API_URL=https://business.1morecoffee.cc/
JWT_SECRET=
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
```

Los nombres exactos pueden ampliarse según la configuración de base de datos y despliegue definida en los archivos de entorno de cada ambiente.

## Rutas principales

```text
GET  /

POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/active-user

GET   /api/trans
GET   /api/trans/stats/dashboard
GET   /api/trans/:id
PATCH /api/trans/:id

GET   /api/clientes
GET   /api/clientes/:id
GET   /api/clientes/:id/transacciones
PATCH /api/clientes/:id
```

## Estructura general

```text
src/
  config/
  controllers/
  middlewares/
  models/
  routes/
  services/
  utils/
  app.js
  server.js
```

## Autores

- Marco Guevara
- Antonio Soler
- Rafael Mattos

## Nota de licencia

Este proyecto declara licencia ISC en `package.json`. Su uso queda contextualizado como entrega académica del reto NovaPay en The Bridge School Talent Accelerator.
