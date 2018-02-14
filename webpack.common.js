'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let webpackConfig = {
  entry: {
    'js/app': './app/index.tsx',
    'css/app': './assets/less/app.less',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '../',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loaders: ['awesome-typescript-loader'] },

      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          name: 'assets/[name].[ext]?[hash]',
          limit: 10000,
        },
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'less-loader'],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.NamedModulesPlugin(),
  ],
  performance: {
    hints: false,
  },
};

module.exports = webpackConfig;
