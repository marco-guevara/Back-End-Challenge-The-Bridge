const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const authenticateJWT = (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "No autorizado: no hay token de acceso",
    });
  }

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Acceso prohibido: token inválido o expirado",
      });
    }

    req.user = user;
    return next();
  });
};

const authenticateRole = (req, res, next) => {
  if (req.user.role === "junior") {
    return res.status(403).json({
        message: "Acceso prohibido: no tiene las credenciales para acceder al contenido",
      })
  }
  if (req.user.role === "senior") {
    return next()
  }
}

module.exports = {
  authenticateJWT,
  authenticateRole
};
