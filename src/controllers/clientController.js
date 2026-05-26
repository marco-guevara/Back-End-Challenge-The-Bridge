const api = require("../utils/apidata.utils");

const getClients = async (req, res) => {
  try {
    const data = await api.getClients(req.query);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: `Error del servidor: ${err.message}` });
  }
};

const getClientById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await api.getClientById(id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: `Error del servidor: ${err.message}` });
  }
};

const updateClient = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await api.updateClient(id, req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: `Error del servidor: ${err.message}` });
  }
};

module.exports = {
  getClients,
  getClientById,
  updateClient,
};
