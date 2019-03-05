import API from './utils/API';

const api = new API();
const prefix = '/test-activity';

const create = ({ answers, testItemId, testActivityId, ...rest }) =>
  api
    .callApi({
      url: `${prefix}/${testActivityId}/test-item/${testItemId}`,
      method: 'post',
      data: { userResponse: answers, ...rest }
    })
    .then(result => result.data.result);

export default {
  create
};
