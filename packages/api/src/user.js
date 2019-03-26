import API from "./utils/API";

const api = new API();
const prefix = "/user";

/*
 * api for fetching logged in users details
 */
const getUser = () =>
  api
    .callApi({
      url: `${prefix}/me`,
      method: "get"
    })
    .then(result => result.data.result);

const fetchUsers = data =>
  api
    .callApi({
      url: `${prefix}/search`,
      method: "post",
      data
    })
    .then(result => result.data.result);

export default {
  getUser,
  fetchUsers
};
