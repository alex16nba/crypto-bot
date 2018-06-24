// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const LiveReloadPlugin = require('webpack-livereload-plugin');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

module.export = {
  entry: './client/index.js',
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: 'js/[name].js',
  },
  // output: {
  //   path: '/',
  //   filename: 'bundle.js'
  // },
  mode: 'development',
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader", options: {
            sourceMap: true
          }
        }, {
          loader: "sass-loader", options: {
            sourceMap: true
          }
        }]
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: 'client/index.html'
    // }),
    // new LiveReloadPlugin()
  ]
};
