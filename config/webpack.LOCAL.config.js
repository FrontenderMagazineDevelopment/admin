const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  devtool: 'inline-source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
  ],

  devServer: {
    contentBase: resolve(__dirname, '../build'),
    port: 8080,
    host: '0.0.0.0',
    historyApiFallback: true,
  },

  output: {
    path: resolve(__dirname, '../build', 'build'),
    publicPath: '/build/',
    filename: 'bundle.js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
