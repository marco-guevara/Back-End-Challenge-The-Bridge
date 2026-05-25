const api = require('../utils/apidata.utils')
const buildQuery = require('../services/transaction.services')

const getTransactions = async (req, res) => {
  const { limite, es_fraude, analista, revisado } = req.query
  const queryVal = {
    limite: limite || 100,
    es_fraude: es_fraude || null,
    analista: analista || null,
    revisado: revisado || null
  }
  const query = buildQuery(queryVal)
  console.log(query)
  const data = await api.getTransactions(query)
  console.log(query)
  return res.status(200).json(data)
}

module.exports = {
  getTransactions
}