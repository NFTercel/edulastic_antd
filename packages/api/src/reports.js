import API from '@edulastic/api/src/utils/API';

const api = new API();
const prefix = '/test-activity/summary';

const fetchReports = () =>
  api
    .callApi({
      url: `${prefix}`,
      method: 'get'
    })
    .then(result => result.data.result);

const fetchTestActivityDetail = id =>
  api
    .callApi({
      url: `/test-activity/${id}`,
      method: 'get'
    })
    .then(result => result);

const fetchTestActivityReport = id =>
  api
    .callApi({
      url: `/test-activity/${id}/report`,
      method: 'get'
    })
    .then(result => result.data.result);

const fetchSkillReport = classId =>
  api
    .callApi({
      url: `/skill-report/${classId}`,
      method: 'get'
    })
    .then(result => result.data.result);

export default {
  fetchReports,
  fetchTestActivityDetail,
  fetchTestActivityReport,
  fetchSkillReport
};
