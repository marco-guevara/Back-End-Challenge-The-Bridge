# Back Challenge API

## Entorno

El backend usa un unico archivo `.env`. El archivo real esta ignorado por Git;
crealo a partir del ejemplo y sustituye credenciales, URL del frontend y
secretos.

```powershell
Copy-Item .env.example .env
```

## Scripts

```powershell
npm run dev
npm start
npm run db:sync
```

- `npm run dev` carga `.env` y arranca el servidor con `--watch`.
- `npm start` carga `.env` y arranca el servidor sin modo watch.
- `npm run db:sync` sincroniza los modelos Sequelize con PostgreSQL.

## Base de Datos

La autenticacion usa Sequelize contra PostgreSQL/Supabase mediante
`DATABASE_URL`.

Variables necesarias:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

## Usuario

El modelo `User` esta alineado con la tabla `usuarios`:

```text
id uuid
username varchar
email varchar
nombre varchar
rol enum_usuarios_rol
activo bool
fecha_creacion timestamptz
password_hash varchar
```

El enum `rol` acepta `Admin` y `Analyst`.
