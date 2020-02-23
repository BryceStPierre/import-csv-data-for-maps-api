const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/js/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Managing Spreadsheet Data with Google Maps',
      template: './src/index.html',
      apiKey: 'API_KEY_HERE'
    })
  ]
};