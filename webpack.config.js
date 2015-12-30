/**
 * Webpack config
 */
/* eslint-env node */

var path = require('path');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PROD = process.env.NODE_ENV === 'production';

var config = {

    context: __dirname,

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loaders: [
                    'babel?cacheDirectory'
                ]
            },
            {
                test: /\.glsl$/,
                loader: 'shader'
            },
            {
                test: /\.less$/,
                exclude: [/node_modules/],
                loader: ['css', 'less']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'head'
        })
    ],

    debug: !PROD,

    devtool: PROD ? null : 'source-map',

    entry: './index',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'jslap' + (PROD ? '.min' : '') + '.js',
        library: 'jslap',
        libraryTarget: 'umd'
    }

};

if (PROD) {
    config.plugins.push(new UglifyJsPlugin());
}

module.exports = config;
