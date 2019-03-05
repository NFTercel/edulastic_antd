require("dotenv").config();
const BundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
console.log("port", port);
let config = {
  entry: "./src/client/index.js",
  devServer: {
    port
  },
  output: {
    dir: process.env.DESTINATION || "./dist",
    sourceMap: true
  },

  chainWebpack: (chain, opts) => {
    if (process.env.NODE_ENV === "production") {
      chain
        .plugin("Analyzer")
        .use(BundleAnalyzer, [{ analyzerMode: "static", defaultSizes: "gzip", openAnalyzer: false }]);
    }

    chain.plugin("MomentsLocale").use(MomentLocalesPlugin);
  }
};
if (process.env.PUBLIC_URL) {
  config.output.publicUrl = process.env.PUBLIC_URL;
}
module.exports = config;
