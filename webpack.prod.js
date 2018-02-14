'use strict';

const webpack = require('webpack');

let webpackConfig = require('./webpack.common');

webpackConfig.plugins = webpackConfig.plugins || [];

webpackConfig.plugins = webpackConfig.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false,
    },
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
]);

module.exports = webpackConfig;
