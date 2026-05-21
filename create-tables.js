require("dotenv").config();

const inputUrl = process.argv[2] || process.env.DB_HOST;

if (!inputUrl) {
  // eslint-disable-next-line no-console
  console.error("Missing DATABASE_URL. Use: node create-tables.js \"postgresql://...\"");
  return;
}

process.env.DATABASE_URL = inputUrl;

const sequelize = require("./src/config/db");
require("./src/models/User");

async function createTables() {
  try {
    // authenticate valida la conexion; sync crea las tablas/modelos que no existan.
    await sequelize.authenticate();
    await sequelize.sync();
    // eslint-disable-next-line no-console
    console.log("Tabbles created or already exists in PostgreSQL");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error creating tables:", error.message || error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

createTables();
