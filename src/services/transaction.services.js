const buildQuery = (query) => {
  let res = `?limite=${query.limite}`
  if (query.es_fraude) {
    res += `&es_fraude=${query.es_fraude}`
  }
  if (query.analista) {
    res += `&analista=${query.analista}`
  }
  if (query.revisado) {
    res += `&revisado=${query.revisado}`
  }

  return res
}

module.exports = buildQuery