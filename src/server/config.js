require("dotenv").config();

const appId = "edulastic-poc";
const env = process.env.NODE_ENV || "localhost";
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;
const appModeDev = process.env.APP_MODE_DEV;
// apiUri used while build with Webpack
const apiUri =
  process.env.API_URI ||
  "https://pnufcx7h1l.execute-api.us-east-1.amazonaws.com/development/api/" ||
  "http://localhost:3000/api/";

module.exports = {
  appId,
  env,
  basePath: "",
  appModeDev,
  buildConfig: {
    targetDir: ".build",
    assetsDir: "assets"
  },

  proxyAssets: {
    host: "localhost",
    port: 9090
  },

  client: {
    apiUri
  },

  server: {
    host,
    port
  }
};
