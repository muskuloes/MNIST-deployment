const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlwebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlwebpackPlugin({
      template: "index.html",
    }),
  ],
};
