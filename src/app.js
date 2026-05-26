const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes")
const transRoutes = require("./routes/transactionRoutes")
const clientRoutes = require("./routes/clientRoutes")
const { authenticateJWT } = require("./middlewares/authMiddleware")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "img-src": [
          "'self'",
          "data:",
          "https:"
        ],
      },
    },
  })
);
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use("/api/auth", authRoutes)
app.use("/api/trans", authenticateJWT, transRoutes)
app.use("/api/clientes", authenticateJWT, clientRoutes)

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server running",
    uptime: process.uptime(),
    timeStamp: new Date().toISOString()
  })
})

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

module.exports = app
