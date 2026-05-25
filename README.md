# Back Challenge API

## Entornos

El backend usa archivos de entorno separados para cambiar rapido entre
desarrollo y produccion.

| Entorno | Ejemplo | Archivo real | Arranque |
| --- | --- | --- | --- |
| Desarrollo | `.env.local.example` | `.env.local` | `npm run dev` |
| Produccion | `.env.prod.example` | `.env.prod` | `npm start` |

Los archivos reales `.env.local` y `.env.prod` estan ignorados por Git. Crea
cada uno a partir de su ejemplo y sustituye passwords, URLs y secretos.

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
```

- `npm run dev` carga `.env.local` y arranca el servidor con `--watch`.
- `npm start` carga `.env.prod` y arranca el servidor sin modo watch.

## Base de Datos

La API se conecta a la base de datos PostgreSQL desplegada por el equipo de
Data Science mediante `pg.Pool`. El backend no crea, migra ni sincroniza tablas.

Variables necesarias:

```env
DB_HOST=your-database-host
DB_PORT=5432
DB_NAME=your-database-name
DB_USER=your-database-user
DB_PASSWORD=change_me
DB_SSL=false
```

Tambien puedes usar `DATABASE_URL` si el despliegue lo requiere. Cuando
`DATABASE_URL` esta definida, tiene prioridad sobre las variables `DB_*`.

## Usuarios

La autenticacion usa la tabla externa `usuarios` con estos campos esperados:

```text
id
username
email
nombre
rol
activo
password_hash
```

Las consultas estan centralizadas en `src/repositories/userRepository.js`.
