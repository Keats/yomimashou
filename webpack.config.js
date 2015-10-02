var path = require("path");
var webpack = require("webpack");


module.exports = {
  entry: {
    background: "./src/background.js",
    extension: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
    publicPath: "/build/"
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/,
        query: {
          optional: ["runtime"],
          stage: 1
        }
      }
    ]
  }
};
