# Back Challenge API

## Supabase database

This backend uses Sequelize with PostgreSQL. Supabase can host that PostgreSQL
database without changing the existing Express auth routes or the `User` model.

1. Create a Supabase project.
2. In the Supabase dashboard, open the project Connect panel and copy a database
   connection string.
3. Put the connection string in `.env` as `DATABASE_URL`.
4. Set `DB_SSL=true`. The example environment uses
   `DB_SSL_REJECT_UNAUTHORIZED=false` for the common Supabase SSL setup.
5. Run `npm run db:sync` once to create the Sequelize tables, or start the API
   with `npm start`, which also runs `sequelize.sync()` on boot.

Use a direct connection string for a persistent backend that can reach IPv6.
When the backend needs IPv4 support, use the Supabase Session pooler connection
string instead.

```env
PORT=4000
DATABASE_URL=postgresql://postgres.project-ref:your-password@aws-0-region.pooler.supabase.com:5432/postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
ACCESS_TOKEN_SECRET=replace-this-secret
```

For local Docker PostgreSQL, leave `DATABASE_URL` empty and fill `DB_HOST`,
`DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` instead.
