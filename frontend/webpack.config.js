var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

const DEPS = [
  'react/dist/react.min.js',
  'react-router/dist/react-router.min.js',
  'react-bootstrap/dist/react-bootstrap.min.js',
  'react-dnd/dist/ReactDnD.min.js'
];

const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 8',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6'
];

var config = {
  // addVendor: function (name, path) {
  //     this.resolve.alias[name] = path;
  //     this.module.noParse.push(new RegExp('^' + name + '$'));
  // },
  entry: {
    app: ['webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080', path.resolve('src/js/index.js')],
  },
  output: {
    path: process.env.NODE_ENV === 'production' ? path.resolve(__dirname, 'dist') : path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
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
        test: /\.css$/,
        exclude: [node_modules_dir],
        loader: 'style-loader!css-loader!cssnext-loader'
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
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {}
  },
  cssnext: {},
  postcss: [
    require('postcss-nested')(),
    require('cssnext')(),
    require('autoprefixer-core')(AUTOPREFIXER_BROWSERS)
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.DefinePlugin({"global.GENTLY": false})
  ],
  node: {
    __dirname: true
  }
};

// Run through deps and extract the first part of the path,
// as that is what you use to require the actual node modules
// in your code. Then use the complete path to point to the correct
// file and make sure webpack does not try to parse it
DEPS.forEach(function (dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

//config.addVendor('react', node_modules + '/react/react.min.js');

module.exports = config;
