import API from '@edulastic/api/src/utils/API';

const api = new API();
const prefix = '/test-activity';

const create = data =>
  api
    .callApi({
      url: prefix,
      method: 'post',
      data
    })
    .then(result => result.data.result);

const fetchReports = () =>
  api
    .callApi({
      url: `${prefix}/?status=graded`,
      method: 'get'
    })
    .then(result => result.data.result);

const submit = testActivityId =>
  api
    .callApi({
      url: `${prefix}/${testActivityId}/status`,
      method: 'put',
      data: { status: 1 }
    })
    .then(result => result.data);

const previousResponses = testActivityId =>
  api
    .callApi({
      url: `${prefix}/${testActivityId}/previousResponses`,
      method: 'get'
    })
    .then(result => result.data.result);

const getById = testActivityId =>
  api
    .callApi({
      url: `${prefix}/${testActivityId}`,
      method: 'get'
    })
    .then(result => result.data.result);

export default {
  create,
  submit,
  fetchReports,
  getById,
  previousResponses
};
