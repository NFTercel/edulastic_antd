import API from "@edulastic/api/src/utils/API";

const api = new API();
const prefix = "/assignments";
const fetchStandardReports = ({ assignmentId, classId }) =>
  api
    .callApi({
      url: `${prefix}/${assignmentId}/classes/${classId}/test-activity`,
      method: "get"
    })
    .then(result => result.data);

export default {
  fetchStandardReports
};
