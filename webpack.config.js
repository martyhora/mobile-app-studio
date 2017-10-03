"use strict";

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const buildConfigFile = './buildConfig.js';

const config = require(buildConfigFile);

const isProduction = config.env === 'production';

let webpackConfig = {
    entry:
    {
        'js/app': './app/index.tsx',
        'css/app': './assets/less/app.less',
    },
    output:
    {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js",
        publicPath: '../'
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    name: 'assets/[name].[ext]?[hash]',
                    limit: 10000
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
    ],
    performance: {
        hints: false
    },
};

if (!isProduction) {
    webpackConfig.devtool = '#source-map'
} else {
    webpackConfig.plugins = webpackConfig.plugins || [];

    webpackConfig.plugins = webpackConfig.plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}

module.exports = webpackConfig;