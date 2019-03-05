import API from './utils/API';

const api = new API();
const prefix = '/question';

const create = data =>
  api
    .callApi({
      url: prefix,
      method: 'post',
      data
    })
    .then(result => result.data.result);

const updateById = (id, data) => {
  delete data._id;
  return api
    .callApi({
      url: `${prefix}/${id}`,
      method: 'put',
      data
    })
    .then(result => result.data.result);
};

const getAll = () =>
  api
    .callApi({
      url: prefix,
      method: 'get'
    })
    .then(result => result.data.result);

const getById = id =>
  api
    .callApi({
      url: `${prefix}/${id}`,
      method: 'get'
    })
    .then(result => result.data.result);

export default {
  create,
  updateById,
  getAll,
  getById
};
