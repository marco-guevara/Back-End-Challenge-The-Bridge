const router = require('express').Router()
const { getTransactions, getTransactionsByClient } = require('../controllers/transactionController')

router.get('/cliente/:id', getTransactionsByClient)
router.get('/:id', getTransactions)
router.get('/', getTransactions)

module.exports = router
