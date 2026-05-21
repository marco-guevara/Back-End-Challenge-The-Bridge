const bcrypt = require('bcryptjs')
const {createAccessToken} = require('../services/auth.services')
const accessTokenCookieConfig = require('../config/cookie.config')
const User = require('../models/User')


// POST
// /api/auth/register
const register = async (req, res) => {
  const {email, name, password, password2} = req.body
  if (!email || !name || !password) {
    return res.status(400).json({message: "Email, name and password required"})
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
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/;

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

  if (password !== password2) {
    return res.status(400).json({message: "Password dosen't match"})
  }

  try {
    const existingUser = await User.findOne({where: {email}})
    if (existingUser) {
      return res.status(400).json({message: "Email already in use"})
    }

    const password_hash = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: password_hash,
      role: 'user'
    })

    res.status(201).json({message: `User ${newUser.name} created successfully`})

  } catch (err) {
    res.status(500).json({message: `Server error: ${err.message}`})
  }
  
}


// POST
// /api/auth/login
const login = async (req, res) => {
  const {email, password} = req.body
  if (!email || !password) {
    return res.status(400).json({message: "Email and password required"})
  }

  try {
    const user = await User.findOne({where: {email}})

    if (!user) {
      return res.status(400).json({message: "Invalid email or password."})
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return res.status(400).json({message: "Invalid email or password"})
    }

    const accessToken = createAccessToken(user)

    res.cookie("accessToken", accessToken, accessTokenCookieConfig)

    return res.status(200).json({
      message: "Login successfull",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
    })
  } catch (err) {
    res.status(500).json({message: `Server error: ${err.message}`})
  }
}

// POST
// /api/auth/logout
const logout = ( req, res) => {
  res.clearCookie("accessToken", accessTokenCookieConfig);
  return res.status(200).json({message: "logged out"});
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
  getActiveUser

}