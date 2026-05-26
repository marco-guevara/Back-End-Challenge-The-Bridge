const router = require("express").Router();

const {
  getTransactions,
  getTransactionsByClient,
} = require("../controllers/transactionController");

router.get("/", getTransactions);
router.get("/cliente/:id", getTransactionsByClient);
router.get("/:id", getTransactions);

module.exports = router;
