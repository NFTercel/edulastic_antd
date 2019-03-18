import API from "./utils/API";

const api = new API();
const prefix = "/assignments";

const gradebook = ({ assignmentId, classId }) =>
  api
    .callApi({
      url: `${prefix}/${assignmentId}/classes/${classId}/gradebook`,
      method: "get"
    })
    .then(result => result.data.result);

const testActivity = ({ assignmentId, classId }) =>
  api
    .callApi({
      url: `${prefix}/${assignmentId}/classes/${classId}/test-activity`,
      method: "get"
    })
    .then(result => result.data);

const releaseScore = ({ assignmentId, classId, isReleaseScore }) =>
  api
    .callApi({
      method: "put",
      url: `${prefix}/${assignmentId}/group/${classId}/releaseScore`,
      data: { status: isReleaseScore }
    })
    .then(result => result.data);

export default {
  gradebook,
  testActivity,
  releaseScore
};
