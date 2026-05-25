const axios = require('axios')

const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true
})

const request = async (callback) => {
  try {
    const res = await callback()
    return res.data
  } catch (err) {
    const message = err?.response?.data?.message || 'Ha ocorrido un erro'
    throw new Error(message, {cause: err})
  }
}

const getTransactions = (query) => request(() => {
  console.log(query)
  return api.get(
  `/trans/${query}`
)})

module.exports = {
  getTransactions
}