import API from './utils/API';

const api = new API();
const prefix = '/group';

const fetchMyGroups = () =>
  api
    .callApi({
      url: `${prefix}/mygroups`,
      method: 'get'
    })
    .then(result => result.data.result);

export default {
  fetchMyGroups
};
