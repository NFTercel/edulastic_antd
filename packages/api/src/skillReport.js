import API from '@edulastic/api/src/utils/API';

const api = new API();
const prefix = '/skill-report';

const fetchSkillReport = classId =>
  api
    .callApi({
      url: `${prefix}/${classId}/d6ec0d994eaf3f4c805c8011`,
      method: 'get'
    })
    .then(result => result.data.result);

export default {
  fetchSkillReport
};
