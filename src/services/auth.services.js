const jwt = require('jsonwebtoken')

const secret = process.env.ACCESS_TOKEN_SECRET

const createAccessToken = (user) => {
  return jwt.sign({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }, secret, {
    expiresIn: '60m'
  })
}

const verifyAccessToken = (token) => {
  const secret = process.env.ACCESS_TOKEN_SECRET
  return jwt.verify(token, secret)
}

module.exports = {
  createAccessToken,
  verifyAccessToken
}