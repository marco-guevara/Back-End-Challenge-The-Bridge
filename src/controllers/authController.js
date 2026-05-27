const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { createAccessToken } = require("../services/auth.services");
const accessTokenCookieConfig = require("../config/cookie.config");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Faltan datos obligatorios: email, contrasena" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !user.active) {
      return res.status(400).json({ message: "Credenciales invalidas" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Credenciales invalidas" });
    }

    const accessToken = createAccessToken(user);

    res.cookie("accessToken", accessToken, accessTokenCookieConfig);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: `Error del servidor: ${err.message}` });
  }
};

const logout = (req, res) => {
  res.clearCookie("accessToken", accessTokenCookieConfig);
  return res.status(200).json({ message: "Sesion cerrada" });
};

const getActiveUser = async (req, res) => {
  res.status(200).json({
    user: {
      id: req.user.id,
      name: req.user.name,
      username: req.user.username,
      role: req.user.role,
    },
  });
};

module.exports = {
  login,
  logout,
  getActiveUser,
};
