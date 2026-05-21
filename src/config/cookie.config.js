const accessTokenCookieOptions = {
  httpOnly: true,
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 1000,
};

module.exports = accessTokenCookieOptions;