const express = require ("express")
const router = express.Router()

const { authenticateJWT } = require("../middlewares/authMiddleware");
const { register, login, logout, getActiveUser } = require ("../controllers/authController")

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/active-user", authenticateJWT, getActiveUser)

module.exports = router