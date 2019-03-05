import API from './utils/API';

const api = new API();
const prefix = '/user';

/*
 * api for fetching logged in users details
 */
const getUser = () =>
  api
    .callApi({
      url: prefix,
      method: 'get'
    })
    .then(result => result.data.result);

export default {
  getUser
};
