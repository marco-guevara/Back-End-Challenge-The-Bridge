const User = require("../models/User");

const bcrypt = require("bcryptjs");

const { createAccessToken } = require("../services/auth.services");
const accessTokenCookieConfig = require("../config/cookie.config");

// POST
// /api/auth/register
const register = async (req, res) => {
  const { email, name, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({
        message:
          "Faltan datos obligatorios: email, nombre, contraseña y confirmar contraseña",
      });
  }

  //  REGEX EMAIL (válido estándar)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // REGEX PASSWORD
  // Mínimo 8 caracteres
  // 1 mayúscula
  // 1 minúscula
  // 1 número
  // 1 carácter especial
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
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email ya registrado" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: password_hash,
    });

    res
      .status(201)
      .json({ message: `Usuario ${newUser.name} creado correctamente` });
  } catch (err) {
    res.status(500).json({ message: `Error del servidor: ${err.message}` });
  }
};

// POST
// /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Faltan datos obligatorios: email, contraseña" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

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
      },
    });
  } catch (err) {
    res.status(500).json({ message: `Error del servidor: ${err.message}` });
  }
};

// POST
// /api/auth/logout
const logout = (req, res) => {
  res.clearCookie("accessToken", accessTokenCookieConfig);
  return res.status(200).json({ message: "Sesión cerrada" });
};

// const changePassword = async (req, res) => {
//   const email = req.user.email
//   const {oldPassword, password, password2} = req.body

//   try {
//     const user = await User.findOne({where: {email}})

//     const isValidPassword = await bcrypt.compare(oldPassword, user.password)
//     if (!isValidPassword) {
//       res.status(400).json({message: "password incorrect"})
//     }

//     if (password !== password2) {
//       res.status(400).json({message: "passwords dosen't match"})
//     }

//     const password_hash = await bcrypt.hash(password, 10)

//     await user.update({password: password_hash})

//     return res.status(202).json({message: 'password changed'})

//   } catch (err) {
//     res.status(500).json({message: `Server error: ${err.message}`})
//   }
// }

// GET
// /api/auth/active-user
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
  // changePassword,
  getActiveUser,
};
