const db = require("../config/db");

const USER_FIELDS = `
  id,
  username,
  email,
  nombre AS name,
  rol,
  activo,
  password_hash
`;

const findByEmail = async (email) => {
  const { rows } = await db.query(
    `SELECT ${USER_FIELDS}
     FROM usuarios
     WHERE email = $1
     LIMIT 1`,
    [email],
  );

  return rows[0] || null;
};

const findByEmailOrUsername = async ({ email, username }) => {
  const { rows } = await db.query(
    `SELECT ${USER_FIELDS}
     FROM usuarios
     WHERE email = $1 OR username = $2
     LIMIT 1`,
    [email, username],
  );

  return rows[0] || null;
};

const create = async ({ username, email, name, passwordHash }) => {
  const { rows } = await db.query(
    `INSERT INTO usuarios (username, email, nombre, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING ${USER_FIELDS}`,
    [username, email, name, passwordHash],
  );

  return rows[0];
};

module.exports = {
  findByEmail,
  findByEmailOrUsername,
  create,
};
