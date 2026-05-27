const buildQuery = (query) => {
  let res = "";

  if (query.limite) {
    res += `${res ? "&" : "?"}limite=${query.limite}`;
  }

  if (query.es_fraude) {
    res += `${res ? "&" : "?"}es_fraude=${query.es_fraude}`;
  }

  if (query.analista) {
    res += `${res ? "&" : "?"}analista=${query.analista}`;
  }

  if (query.revisado) {
    res += `${res ? "&" : "?"}revisado=${query.revisado}`;
  }

  return res;
};

module.exports = buildQuery;