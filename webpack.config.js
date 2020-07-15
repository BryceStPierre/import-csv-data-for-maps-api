const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

require("dotenv").config();

module.exports = {
  mode: "production",
  devServer: {
    contentBase: "./dist",
  },
  entry: {
    main: "./src/js/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Import CSV Data for Google Maps API",
      template: "./src/index.html",
      apiKey: process.env.API_KEY,
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
};
