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

const classStudentResponse = ({ testActivityIds, groupId }) => {
  let isLoading = false;
  let classStudentResponseData = [];
  let i = 0;
  setInterval(() => {
    isLoading = true;
    api
      .callApi({
        url: `/test-activity/${testActivityId[i]}/report`,
        method: "get",
        params: {
          groupId
        }
      })
      .then(result => {
        classStudentResponseData.push(result.data.result);
        isLoading = false;
        i++;
        if (i == testActivityIds.length - 1) {
          return classStudentResponseData;
        }
      });
  }, 300);
};

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
  classStudentResponse,
  studentResponse,
  feedbackResponse,
  receiveStudentQuestionResponse,
  questionClassQuestionResponse
};
