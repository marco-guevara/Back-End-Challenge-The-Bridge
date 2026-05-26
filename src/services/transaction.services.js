const buildQuery = (query) => {
  const params = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      params.set(key, value)
    }
  })

  return params.toString() ? `?${params.toString()}` : ''
}

module.exports = buildQuery
