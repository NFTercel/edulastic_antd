import axios from "axios";
import config from "../config";
import Storage from "./Storage";

const getCurrentPath = () => {
  const location = window.location;
  return `${location.pathname}${location.search}${location.hash}`;
};

export default class API {
  constructor(baseURL = config.api) {
    this.baseURL = baseURL;
    this.storage = new Storage();

    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.instance.interceptors.request.use(config => {
      let token = this.storage.token;
      if (token) {
        config.headers["Authorization"] = token;
      }
      return config;
    });
    this.instance.interceptors.response.use(
      response => response,
      data => {
        if (data && data.response && data.response.status) {
          if (data.response.status === 401) {
            window.localStorage.setItem("loginRedirectUrl", getCurrentPath());
            window.location.href = "/login";
          }
        }
      }
    );
  }

  callApi({ method = "get", ...rest }) {
    return this.instance({ method, ...rest });
  }
}
