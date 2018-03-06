const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: __dirname + '/scripts/entry.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/scripts',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false,
          },
          output: {
              comments: false,
          },
      }),
  ]
};
