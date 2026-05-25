const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await db.query("SELECT 1");
    console.log("Postgres connected");

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(`Can't connect to postgresSQL: ${err.message}`);
    process.exit(1);
  }
}

startServer();
