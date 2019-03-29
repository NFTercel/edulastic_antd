import API from "./utils/API";

const api = new API();

const classResponse = ({ testId }) =>
  api
    .callApi({
      url: `/test/${testId}?validation=true&data=true`,
      method: "get"
    })

    .then(result => result.data.result);

const studentResponse = ({ testActivityId, groupId }) =>
  api
    .callApi({
      url: `/test-activity/${testActivityId}/report`,
      method: "get",
      params: {
        groupId
      }
    })
    .then(result => result.data.result);

const feedbackResponse = ({ body, testActivityId, questionId }) =>
  api
    .callApi({
      url: `/test-activity/${testActivityId}/question/${questionId}/feedbackAndScore`,
      method: "put",
      data: body
    })
    .then(result => result.data.result);

const receiveStudentQuestionResponse = ({ assignmentId, classId, questionId, studentId }) =>
  api
    .callApi({
      url: `/assignments/${assignmentId}/question/${questionId}/student/${studentId}/group/${classId}`,
      method: "get"
    })
    .then(result => result.data.result);

const questionClassQuestionResponse = ({ assignmentId, classId, questionId }) =>
  api
    .callApi({
      url: `/assignments/${assignmentId}/question/${questionId}/group/${classId}`,
      method: "get"
    })
    .then(result => result.data.result);

export default {
  classResponse,
  studentResponse,
  feedbackResponse,
  receiveStudentQuestionResponse,
  questionClassQuestionResponse
};
