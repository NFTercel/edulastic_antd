import API from './utils/API';

const api = new API();

const receiveItems = () =>
  api.callApi({ url: '/items' }).then(result => result.data);

const receiveItemById = id =>
  api
    .callApi({
      url: `/items/${id}`
    })
    .then(result => result.data);

const createItem = ({ payload }) =>
  api
    .callApi({
      method: 'post',
      url: '/items',
      data: {
        ...payload
      }
    })
    .then(result => result.data);

const updateItemById = ({ payload }) =>
  api
    .callApi({
      method: 'put',
      url: `/items/${payload.id}`,
      data: {
        ...payload
      }
    })
    .then(result => result.data);

const saveUserReponse = data =>
  api
    .callApi({
      method: 'post',
      url: '/UserTestItemActivities/saveResponse',
      data
    })
    .then(result => result.data);

const getUserResponse = itemId =>
  api
    .callApi({
      method: 'get',
      url: 'UserTestItemActivities',
      params: { item: itemId }
    })
    .then(result => result.data);

export default {
  receiveItems,
  receiveItemById,
  createItem,
  updateItemById,
  saveUserReponse,
  getUserResponse
};
