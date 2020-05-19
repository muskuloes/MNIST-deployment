const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "model/*",
          to: "model",
          toType: 'dir'
        },
      ],
    }),
  ],
  experiments: {
    topLevelAwait: true,
  },
};
