const accessTokenCookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
  maxAge: 60 * 60 * 1000,
};

module.exports = accessTokenCookieOptions