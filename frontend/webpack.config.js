var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var HtmlWebpackPlugin = require('html-webpack-plugin');

process.env['NODE_ENV'] = 'development';

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, 'src/index.js')
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        noParse: [],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [node_modules_dir],
                loaders: ['react-hot', 'babel']
            },
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\.scss$/,
                exclude: [],
                loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass'
            },
            {
                test: /\.css$/,
                exclude: [],
                loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    node: {
        __dirname: true
    }
};
