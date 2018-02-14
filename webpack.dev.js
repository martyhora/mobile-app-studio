'use strict';

let webpackConfig = require('./webpack.common');

webpackConfig.devtool = '#source-map';

module.exports = webpackConfig;
