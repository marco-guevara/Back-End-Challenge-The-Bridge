require('dotenv').config()
const app = require('./app')
const sequelize = require('./config/db')

const PORT = 4000

async function startServer() {
  try {
    await sequelize.authenticate()
    console.log("Postgres connected")


    app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
  } catch (err) {
    console.log(`Can't connect to postgresSQL: ${err.message}`);
    process.exit(1)
  }
  
}

startServer()
