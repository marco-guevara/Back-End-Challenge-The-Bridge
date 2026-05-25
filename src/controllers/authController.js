const bcrypt = require("bcryptjs");

const userRepository = require("../repositories/userRepository");
const { createAccessToken } = require("../services/auth.services");
const accessTokenCookieConfig = require("../config/cookie.config");

const register = async (req, res) => {
  const { email, name, password, confirmPassword } = req.body;
  const username = req.body.username || email?.split("@")[0];

  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({
        message:
          "Faltan datos obligatorios: email, nombre, contraseña y confirmar contraseña",
      });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Por favor, introduce un email válido" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "La contraseña debe contener mínimo: 8 caracteres, mayúscula, minúscula, número y símbolo",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Las contraseñas no coinciden" });
  }

  try {
    const existingUser = await userRepository.findByEmailOrUsername({
      email,
      username,
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email o usuario ya registrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await userRepository.create({
      username,
      name,
      email,
      passwordHash,
    });

    res
      .status(201)
      .json({ message: `Usuario ${newUser.name} creado correctamente` });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ message: "Email o usuario ya registrado" });
    }

    res.status(500).json({ message: `Error del servidor: ${err.message}` });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Faltan datos obligatorios: email, contraseña" });
  }

  try {
    const user = await userRepository.findByEmail(email);

    if (!user || !user.activo) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Credenciales inválidas" });
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
        rol: user.rol,
      },
    });
  } catch (err) {
    res.status(500).json({ message: `Error del servidor: ${err.message}` });
  }
};

const logout = (req, res) => {
  res.clearCookie("accessToken", accessTokenCookieConfig);
  return res.status(200).json({ message: "Sesión cerrada" });
};

const getActiveUser = async (req, res) => {
  res.status(200).json({
    user: {
      id: req.user.id,
      name: req.user.name,
    },
  });
};

module.exports = {
  register,
  login,
  logout,
  getActiveUser,
};
