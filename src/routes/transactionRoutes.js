const router = require('express').Router()
const { getTransactions, getTransactionsByClient } = require('../controllers/transactionController')

router.get('{/:id}', getTransactions)
router.get('/cliente/:id', getTransactionsByClient)

module.exports = router