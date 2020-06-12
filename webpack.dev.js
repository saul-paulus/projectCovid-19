const merge = require("webpack-merge");
const common = require("./webpack.common");
const { DefinePlugin } = require("webpack");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  plugins: [
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
});
