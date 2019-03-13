import API from "./utils/API";

const api = new API("https://4uwpei20if.execute-api.us-east-1.amazonaws.com/development/api/");

const evaluate = data =>
  api
    .callApi({
      method: "post",
      url: "/evaluate",
      data
    })
    .then(result => result.data);

export default {
  evaluate
};
