import API from "./utils/API";

const api = new API();

const classResponse = ({ testId }) =>
  api
    .callApi({
      url: `/test/${testId}?validation=true&data=true`,
      method: "get"
    })

    .then(result => result.data.result);

const studentResponse = ({ testActivityId }) =>
  api
    .callApi({
      url: `/test-activity/${testActivityId}/report`,
      method: "get"
    })
    .then(result => result.data.result)
    .catch(function(error) {
      // handle error
      console.log(error);
    });

const feedbackResponse = ({ body, testActivityId, questionId }) =>
  api
    .callApi({
      url: `/test-activity/${testActivityId}/question/${questionId}/feedbackAndScore`,
      method: "put",
      data: body
    })
    .then(result => result.data.result);

export default {
  classResponse,
  studentResponse,
  feedbackResponse
};
