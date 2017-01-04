var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'dist');
var mainPath = path.resolve(__dirname, 'client', 'index.js');

var config = {

  // We change to normal source mapping
  devtool: 'source-map',
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/, loader: ['style', 'css', 'sass']
      // }
      // {
    //     test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
    //     loaders: [
    //       'transform-loader/cacheable?brfs',
    //       'transform-loader/cacheable?packageify'
    //     ]
    //   }, {
    //     test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
    //     loader: 'transform-loader/cacheable?ejsify'
    //   }, {
    //     test: /\.json$/,
    //     loader: 'json-loader'
    }],
      exclude: [nodeModulesPath]
    },
    {
      test: /\.css$/,
      loader: ['style', 'css', 'sass']
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__AUTH0_CLIENT_ID__': JSON.stringify(process.env.AUTH0_CLIENT_ID),
      '__AUTH0_DOMAIN__': JSON.stringify(process.env.AUTH0_DOMAIN)
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
};

module.exports = config;
