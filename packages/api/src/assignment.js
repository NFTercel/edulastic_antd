import API from './utils/API';

const api = new API();
const prefix = '/assignments';

const create = data =>
  api
    .callApi({
      url: `${prefix}`,
      method: 'post',
      data
    })
    .then(result => result.data.result);

const update = (id, data) =>
  api
    .callApi({
      url: `${prefix}/${id}`,
      method: 'put',
      data
    })
    .then(result => result.data.result);

const remove = id =>
  api
    .callApi({
      url: `${prefix}/${id}`,
      method: 'delete'
    })
    .then(result => result.data.result);

const fetchAssignments = testId =>
  api
    .callApi({
      url: `/test/${testId}${prefix}`,
      method: 'get'
    })
    .then(result => result.data.result);

const fetchAssigned = groupId =>
  api
    .callApi({
      url: `${prefix}?groupId=${groupId}`,
      method: 'get'
    })
    .then(result => result.data.result);

export default {
  create,
  update,
  remove,
  fetchAssignments,
  fetchAssigned
};
