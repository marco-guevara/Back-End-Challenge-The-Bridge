const router = require("express").Router();

const {
  getTransactions,
  getTransactionsByClient,
  updateTransaction,
} = require("../controllers/transactionController");

router.get("/", getTransactions);
router.get("/cliente/:id", getTransactionsByClient);
router.get("/:id", getTransactions);
router.patch("/:id", updateTransaction);

module.exports = router;
