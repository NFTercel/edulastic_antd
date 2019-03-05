module.exports = {
  presets: [["poi/babel"]],
  plugins: [
    [
      "import",
      {
        libraryName: "antd"
      },
      "antd"
    ],
    "lodash"
  ]
};
