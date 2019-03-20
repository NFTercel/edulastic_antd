import API from "./utils/API";

const api = new API();
const prefix = "/google";

const getCourseList = code =>
  api
    .callApi({
      url: `${prefix}/getCourseList`,
      method: "post",
      data: { code }
    })
    .then(result => result.data.result);

const syncClass = data =>
  api
    .callApi({
      url: `${prefix}/syncClass`,
      data,
      method: "post"
    })
    .then(result => result.data.result);

export default {
  getCourseList,
  syncClass
};
