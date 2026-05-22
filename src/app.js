// Importamos dependencias
const express = require("express"); // Librería para crear servidores y APIs
const cookieParser = require("cookie-parser"); // Permite leer las cookies del navegador/Postman dentro de req.cookies
const morgan = require("morgan"); // Obtención de logs detallados de las llamadas a la API
const helmet = require("helmet"); // Añade protecciones de seguridad HTTP automáticamente
const cors = require("cors"); // Permite que otros “orígenes” puedan hacer peticiones a tu backend.

// Documentación Swagger
// const swaggerUi = require("swagger-ui-express"); // Librería con una interfaz visual para la documentación con los endpoints
// const YAML = require("yamljs"); // Permite leer el archivo openapi.yaml y convertirlo en un objeto js
// const path = require("path"); // Permite crear rutas de archivos correctamente y de forma segura independientemente del sistema operativo

// const swaggerDocument = YAML.load( // Lee el archivo openapi.yaml y lo convierte en un objeto JavaScript usable por Swagger
//   path.join(process.cwd(), "docs", "openapi.yaml"), // process.cwd() busca desde la raiz del proyecto
// );

// Importamos rutas
const authRoutes = require("./routes/authRoutes")
// const recipeRoutes = require("./routes/recipeRoutes")
// const favoriteRoutes = require("./routes/favoriteRoutes")

//Conexión con BBDD
// const connectMongo = require ("./config/db_mongo")
// connectMongo()

const app = express();
const PORT = process.env.PORT || 3000;

// Usamos dependencias
app.use(express.json()); // Permitir a express leer JSON enviado en el body de las peticiones
app.use(express.urlencoded({ extended: false })); // Permitir a express leer formularios HTML
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    contentSecurityPolicy: { // Estas son las reglas de seguridad sobre qué contenido puedes cargar
      directives: {
        "default-src": ["'self'"], // Por defecto solo permite recursos del propio backend/frontend
        "img-src": [
          "'self'", // Permite imágenes de tu propia app ("/images/pizza.jpg")
          "data:", // Permite imágenes base64, que es una imagen convertida en texto e incrustada directamente dentro del HTML/CSS/JSON
          "https:" // Permite imágenes externas ("https://images.unsplash.com/pizza.jpg")
        ],
      },
    },
  })
);
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Permite peticiones desde el frontend React // REVIEW: Añadir URL despliegue en FRONTEND_URL del .env
  credentials: true, // Acepta cookies enviadas por el frontend
}));

// Usamos rutas
app.use("/api/auth", authRoutes)
// app.use("/api/recipes", recipeRoutes)
// app.use("/api/favorites", favoriteRoutes)
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Prueba funcionamiento server
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server running",
    uptime: process.uptime(), // Tiempo que el servidor lleva levantado
    timeStamp: new Date().toISOString() // ISO lectura de máquinas 2026-04-22 UTM
  })
})

// Manejo error 404
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// // Escuchar en puerto
// app.listen(PORT, () => {
//   console.log(`API escuchando en http://localhost:${PORT}`);
// });

module.exports = app
