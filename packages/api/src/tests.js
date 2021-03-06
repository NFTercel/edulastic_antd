import API from "./utils/API";
import { omit } from "lodash";
const api = new API();
const prefix = "/test";
const prefixElasticSearch = "/search/tests";

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

const formatData = data => omit(data, ["_id", "autoGrade"]);

const getById = (id, params = {}) =>
  api
    .callApi({
      url: `${prefix}/${id}`,
      method: "get",
      params
    })
    .then(result => result.data.result);

const create = data =>
  api
    .callApi({
      url: prefix,
      method: "post",
      data
    })
    .then(result => result.data.result);

const update = ({ id, data: test }) => {
  const data = formatData(test);
  return api
    .callApi({
      url: `${prefix}/${id}`,
      method: "put",
      data
    })
    .then(result => result.data.result);
};

const shareTest = ({ data, testId }) =>
  api
    .callApi({
      url: `${prefix}/${testId}/sharing`,
      method: "post",
      data
    })
    .then(result => result.data.result);

export default {
  getAll,
  getById,
  create,
  update,
  shareTest
};
