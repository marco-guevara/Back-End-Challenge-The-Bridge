const inputUrl = process.argv[2];

if (inputUrl) {
  process.env.DATABASE_URL = inputUrl;
}

if (!process.env.DATABASE_URL && !process.env.DB_NAME) {
  console.error(
    "Missing database config. Set DATABASE_URL or local DB_* values.",
  );
  return;
}

const sequelize = require("./src/config/db");
require("./src/models/User");

async function createTables() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Tables created or already exist in PostgreSQL");
  } catch (error) {
    console.error("Error creating tables:", error.message || error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

createTables();
