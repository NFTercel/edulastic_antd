import API from './utils/API';

const api = new API('https://9ehy0wtpo7.execute-api.us-east-1.amazonaws.com/dev');

const evaluate = data =>
  api
    .callApi({
      method: 'post',
      url: '/evaluate',
      data
    })
    .then(result => result.data);

export default {
  evaluate
};
