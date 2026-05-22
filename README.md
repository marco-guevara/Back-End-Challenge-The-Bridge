# Back Challenge API

## Entornos

El backend usa archivos de entorno separados para cambiar rapido entre
desarrollo y produccion.

| Entorno | Ejemplo | Archivo real | Arranque |
| --- | --- | --- | --- |
| Desarrollo | `.env.local.example` | `.env.local` | `npm run dev` |
| Produccion | `.env.prod.example` | `.env.prod` | `npm start` |

Los archivos reales `.env.local` y `.env.prod` estan ignorados por Git. Crea
cada uno a partir de su ejemplo y sustituye los valores de contraseñas, URLs y
secretos.

```powershell
Copy-Item .env.local.example .env.local
Copy-Item .env.prod.example .env.prod
```

`NODE_ENV` forma parte de cada archivo. En produccion activa cookies `secure`
con `sameSite=none`; en local mantiene la configuracion de desarrollo.

## Scripts

```powershell
npm run dev
npm start
npm run db:sync:local
npm run db:sync:prod
```

- `npm run dev` carga `.env.local` y arranca el servidor con `--watch`.
- `npm start` carga `.env.prod` y arranca el servidor sin modo watch.
- `npm run db:sync:local` crea o sincroniza tablas usando `.env.local`.
- `npm run db:sync:prod` crea o sincroniza tablas usando `.env.prod`.

El script `npm run db:sync` sigue disponible para una configuracion ya cargada
en el proceso o para pasar un connection string manualmente:

```powershell
npm run db:sync -- "postgresql://..."
```

## Base de datos local

`.env.local.example` apunta al PostgreSQL de `compose.yaml`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=back_challenge
DB_USER=postgres
DB_PASSWORD=postgres
```

Con ese archivo puedes arrancar la base local, sincronizar tablas y levantar la
API:

```powershell
docker compose up -d
npm run db:sync:local
npm run dev
```

## Supabase

Este backend usa Sequelize con PostgreSQL. Supabase aloja esa base de datos sin
cambiar las rutas Express de autenticacion ni el modelo `User`.

1. Crea un proyecto en Supabase.
2. Abre `Connect` en el dashboard del proyecto.
3. Copia el connection string de PostgreSQL en `DATABASE_URL` dentro de
   `.env.prod`.
4. Mantente con `DB_SSL=true` para la conexion remota.
5. Ejecuta `npm run db:sync:prod` una vez para crear las tablas.

Ejemplo de produccion:

```env
NODE_ENV=production
PORT=4000
FRONTEND_URL=https://your-frontend-domain.example
DATABASE_URL=postgresql://postgres.project-ref:your-password@aws-0-region.pooler.supabase.com:5432/postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
ACCESS_TOKEN_SECRET=production_secret_change_me
```

Para un backend persistente, usa Direct connection si el entorno llega a IPv6.
Si tu despliegue necesita IPv4, usa el string de Session pooler de Supabase. El
Transaction pooler esta orientado a conexiones temporales como funciones
serverless.
