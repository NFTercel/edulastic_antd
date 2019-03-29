import API from "./utils/API";

const api = new API();
const prefix = "/testitem";
const prefixElasticSearch = "/search/items";

const formatData = data => {
  const item = JSON.parse(JSON.stringify(data));
  delete item._id;
  return item;
};

const getAll = data =>
  api
    .callApi({
      url: prefixElasticSearch,
      method: "post",
      data
    })
    .then(result => {
      const items = result.data.result.hits.hits.map(el => ({ _id: el._id, ...el._source }));
      const count = result.data.result.hits.total;
      return { items, count };
    });

const getById = (id, params = {}) =>
  api
    .callApi({
      url: `${prefix}/${id}`,
      method: "get",
      params
    })
    .then(result => result.data.result);

const updateById = (id, item) => {
  const { updatedAt, createdAt, authors, autoGrade, ...data } = formatData(item);
  return api
    .callApi({
      url: `${prefix}/${id}`,
      method: "put",
      data
    })
    .then(result => result.data.result);
};

const create = data =>
  api
    .callApi({
      url: prefix,
      method: "post",
      data
    })
    .then(result => result.data.result);

const update = ({ id, item }) => {
  const { updatedAt, createdAt, ...data } = formatData(item);
  return api
    .callApi({
      url: `${prefix}/${id}`,
      method: "put",
      data
    })
    .then(result => result.data.result);
};

const evaluation = (id, answers) =>
  api
    .callApi({
      url: `${prefix}/${id}/evaluation`,
      method: "post",
      data: { answers }
    })
    .then(result => result.data.result);

export default {
  getAll,
  getById,
  updateById,
  create,
  update,
  evaluation
};
