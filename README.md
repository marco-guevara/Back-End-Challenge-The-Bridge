# Back Challenge API

## Entorno

El backend usa un unico archivo `.env` para conectarse a la base de datos
PostgreSQL desplegada por el equipo de Data Science.

El archivo real `.env` esta ignorado por Git. Crealo a partir del ejemplo y
sustituye host, credenciales y secretos.

```powershell
Copy-Item .env.example .env
```

`NODE_ENV` forma parte del archivo. En produccion activa cookies `secure` con
`sameSite=none`; en desarrollo mantiene la configuracion local.

## Scripts

```powershell
npm run dev
npm start
```

- `npm run dev` carga `.env` y arranca el servidor con `--watch`.
- `npm start` carga `.env` y arranca el servidor sin modo watch.

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
