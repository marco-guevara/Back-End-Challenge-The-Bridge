const router = require("express").Router();

const {
  getClients,
  getClientById,
  updateClient,
  getClientTransactions,
} = require("../controllers/clientController");

router.get("/", getClients);
router.get("/:id/transacciones", getClientTransactions);
router.get("/:id", getClientById);
router.patch("/:id", updateClient);

module.exports = router;
