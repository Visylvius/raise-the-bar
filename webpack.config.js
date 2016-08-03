var webpack = require('webpack');

module.exports = {
  devtool: 'inline-sourcemap',
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'dist/bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    },
    {
      test: /\.css$/, loader: ['style', 'css', 'sass']
    },
    {
      test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
      loaders: [
        'transform-loader/cacheable?brfs',
        'transform-loader/cacheable?packageify'
      ]
    }, {
      test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
      loader: 'transform-loader/cacheable?ejsify'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
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
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};

//to set env variables, open terminal
// example to set AUTH0_CLIENT_ID
//export AUTH0_CLIENT_ID=xxx
