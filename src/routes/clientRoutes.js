const router = require("express").Router();

const {
  getClients,
  getClientById,
  updateClient,
} = require("../controllers/clientController");

router.get("/", getClients);
router.get("/:id", getClientById);
router.patch("/:id", updateClient);

module.exports = router;
