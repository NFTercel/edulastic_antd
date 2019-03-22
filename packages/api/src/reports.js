import API from "@edulastic/api/src/utils/API";

const api = new API();
const prefix = "/test-activity/summary";

const fetchReports = groupId =>
  api
    .callApi({
      url: `${prefix}`,
      method: "get",
      params: {
        groupId
      }
    })
    .then(result => result.data.result);

const fetchTestActivityDetail = id =>
  api
    .callApi({
      url: `/test-activity/${id}`,
      method: "get"
    })
    .then(result => result);

const fetchTestActivityReport = (id, groupId) =>
  api
    .callApi({
      url: `/test-activity/${id}/report`,
      method: "get",
      params: {
        groupId
      }
    })
    .then(result => result.data.result);

const fetchSkillReport = classId =>
  api
    .callApi({
      url: `/skill-report/${classId}`,
      method: "get"
    })
    .then(result => result.data.result);

const fetchResponseFrequency = params => {
  let { testId, districtId, schoolId, teacherId } = params;
  let str = "";

  if (testId) {
    str += "testId=" + testId;
  }

  if (districtId) {
    if (str != "") str += "&";
    str += "districtId=" + districtId;
  }

  if (schoolId) {
    if (str != "") str += "&";
    str += "schoolId=" + schoolId;
  }

  if (teacherId) {
    if (str != "") str += "&";
    str += "schoolId=" + schoolId;
  }

  return api.callApi({ url: `/report/responseFrequency?${str}` });
};

const fetchAssessmentSummaryReport = params => {
  return api.callApi({
    url: `/report/assessmentSummary?testId=${params.testId}&districtId=${params.districtId}`
  });
  // ?testId=5c90d974a649cb81bc5d4ca2&districtId=5c9089b1a649cb81bc398b1f
};

export default {
  fetchReports,
  fetchTestActivityDetail,
  fetchTestActivityReport,
  fetchSkillReport,
  fetchResponseFrequency,
  fetchAssessmentSummaryReport
};
