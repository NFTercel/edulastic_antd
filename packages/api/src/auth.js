import API from "./utils/API";

const api = new API();
const prefix = "/auth";

const login = data =>
  api
    .callApi({
      url: `${prefix}/login`,
      method: "post",
      data
    })
    .then(result => result.data.result);

const signup = data =>
  api
    .callApi({
      url: `${prefix}/signup`,
      method: "post",
      data
    })
    .then(result => result.data.result);

const getGoogleAuth = () =>
  api.callApi({
    url: `${prefix}/googleLoginOAuth`,
    method: "post"
  });

export default {
  login,
  signup,
  getGoogleAuth
};
