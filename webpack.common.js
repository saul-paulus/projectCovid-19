const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // installed via npm
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

// ======================================================================
module.exports = {
  entry: {
    index: "./src/index.js",
    about: "./src/aboutScript.js",
    contact: "./src/contactScript.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  /* plugin */
  plugins: [
    new CleanWebpackPlugin(),
    /* HTML Webpack Plugin */
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      excludeChunks: ["about"],
      excludeChunks: ["contact"],
    }),
    new HtmlWebpackPlugin({
      chunks: ["about"],
      template: "./src/about.html",
      filename: "about.html",
    }),
    new HtmlWebpackPlugin({
      chunks: ["contact"],
      template: "./src/contact.html",
      filename: "contact.html",
    }),
  ],
};
