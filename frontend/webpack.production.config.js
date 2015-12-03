'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

process.env['NODE_ENV'] = 'production';

module.exports = {
    entry: [
        path.join(__dirname, 'src/index.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name]-[hash].min.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new ExtractTextPlugin('[name]-[hash].min.css'),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        }),
        new StatsPlugin('webpack.stats.json', {
            source: false,
            modules: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel'
        },
        {
            test: /\.json?$/,
            loader: 'json'
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss')
        },
        {
            test: /\.txt/,
            loader: 'file-loader?name=[path][name].[ext]'
        },
        {
            test: /\.gif/,
            loader: 'url-loader?limit=10000&mimetype=image/gif'
        },
        {
            test: /\.jpg/,
            loader: 'url-loader?limit=10000&mimetype=image/jpg'
        },
        {
            test: /\.png/,
            loader: 'url-loader?limit=10000&mimetype=image/png'
        },
        {
            test: /\.svg/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
        },
        {
            test: /\.eot/,
            loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject'
        },
        {
            test: /\.woff2/,
            loader: 'url-loader?limit=100000&mimetype=application/font-woff2'
        },
        {
            test: /\.woff/,
            loader: 'url-loader?limit=100000&mimetype=application/font-woff'
        },
        {
            test: /\.ttf/,
            loader: 'url-loader?limit=100000&mimetype=application/font-ttf'
        }]
    },
    postcss: [
        require('autoprefixer')
    ]
};
