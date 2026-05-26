const api = require("../utils/apidata.utils");
const buildQuery = require("../services/transaction.services");

const getTransactions = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    const { limite, es_fraude, analista, revisado } = req.query;
    const queryVal = {
      limite: limite || 100,
      es_fraude: es_fraude || null,
      analista: analista || null,
      revisado: revisado || null,
    };
    const query = buildQuery(queryVal);
    try {
      const data = await api.getTransactions(query)
      return res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ message: `Error del servidor: ${err.message}` });
    }
  } else {
    try {
      const data = await api.getTransactionById(id);
      return res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: `Error del servidor: ${err.message}` });
    }
  }
};

const getTransactionsByClient = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await api.getTransactionByClient(id);
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: `Error del servidor: ${err.message}` });
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await api.updateTransaction(id, req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: `Error del servidor: ${err.message}` });
  }
};

module.exports = {
  getTransactions,
  getTransactionsByClient,
  updateTransaction,
};
