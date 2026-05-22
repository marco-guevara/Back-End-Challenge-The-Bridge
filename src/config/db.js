const { Sequelize } = require("sequelize");

const databaseUrl = process.env.DATABASE_URL;
const sslEnabled = process.env.DB_SSL === "true";

const sequelizeOptions = {
  dialect: "postgres",
  logging: false,
};

if (sslEnabled) {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false",
    },
  };
}

const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, sequelizeOptions)
  : new Sequelize(
      process.env.DB_NAME || "",
      process.env.DB_USER || "postgres",
      process.env.DB_PASSWORD || "",
      {
        ...sequelizeOptions,
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
      },
    );

module.exports = sequelize;
