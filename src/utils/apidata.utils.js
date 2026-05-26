const axios = require('axios')

const baseURL = (process.env.API_URL || '').replace(/\/$/, '')

const api = axios.create({
  baseURL,
  withCredentials: true
})

const request = async (callback) => {
  try {
    const res = await callback()
    return res.data
  } catch (err) {
    const message = err?.response?.data?.message || err?.response?.data?.detail || 'Ha ocurrido un error'
    throw new Error(message, {cause: err})
  }
}

const getTransactions = (query) => request(() => api.get(`/trans/${query}`))
const getTransactionById = (id) => request(() => api.get(`/trans/${id}`))
const getTransactionByClient = (id) => request(() => api.get(`/trans/cliente/${id}`))

module.exports = {
  getTransactions,
  getTransactionById,
  getTransactionByClient
}
