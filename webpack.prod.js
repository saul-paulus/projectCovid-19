const merge = require("webpack-merge");
const common = require("./webpack.common");
const { DefinePlugin } = require("webpack");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map", //menghilangkan devTool
  plugins: [
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  performance: {
    hints: false, //memperbaiki warning size
  },
});
