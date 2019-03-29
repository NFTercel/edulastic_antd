import API from "./utils/API";

const api = new API("https://1nz4dq81w6.execute-api.us-east-1.amazonaws.com/dev/");

const evaluate = data =>
  api
    .callApi({
      method: "post",
      url: "/evaluate",
      data
    })
    .then(result => result.data);

const calculate = data =>
  api
    .callApi({
      method: "post",
      url: "/calculate",
      data
    })
    .then(result => result.data);

export default {
  evaluate,
  calculate
};
