import API from './utils/API';

const api = new API('http://localhost:9020');

const getAssessment = id =>
  api
    .callApi({
      url: `/assessment/${id}`,
    })
    .then(data => data.data);

const addQuestion = ({ assessmentId, question, options, type, answer }) =>
  api.callApi({
    url: `/assessment/${assessmentId}/question`,
    method: 'post',
    data: {
      question,
      options,
      type,
      answer,
    },
  });

export default {
  getAssessment,
  addQuestion,
};
