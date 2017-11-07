const baseDir = process.cwd();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'LOCAL';
const buildPath = resolve(baseDir, 'build/javascript');

module.exports = {
  context: resolve(__dirname, '../source/frontend'),
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.pcss'],
    modules: [
      'node_modules',
      resolve(baseDir, ''),
      resolve(baseDir, '../source/frontend/actions'),
      resolve(baseDir, '../source/frontend/helpers'),
    ],
    alias: {
      'config.js': resolve(baseDir, `./config/service.${env}.config.js`),
    },
  },
  entry: [
    'babel-polyfill',
    './app.jsx',
  ],
  output: {
    path: buildPath,
    filename: 'build.js',
  },
  module: {
    rules: [{
      test: /\.js(x)?$/,
      exclude: /(node_modules|bower_components)/,
      use: 'babel-loader',
    }, {
      test: /\/sprite-icons\/.*\.svg$/,
      loaders: [
        'svg-sprite-loader',
        {
          loader: 'svgo-loader',
          options: {
            plugins: [
              { removeTitle: true },
              { removeStyleElement: true },
              { removeScriptElement: true },
              { moveGroupAttrsToElems: true },
              { removeHiddenElems: true },
              { convertShapeToPath: true },
              { convertPathData: true },
              { removeUselessStrokeAndFill: true },
              { removeNonInheritableGroupAttrs: true },
              { removeAttrs: { attrs: '(fill|stroke|fill-opacity|stroke-opacity)' } },
              { removeEmptyContainers: true },
              { collapseGroups: true },
            ],
          },
        },
      ],
    },

    {
      test: /\.pug$/,
      use: ['pug-loader'],
    }, {
      test: /\.(css|pcss)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { importLoaders: 1 },
        },
        'postcss-loader',
      ] }],
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env) }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: resolve(__dirname, '../source/frontend/pages/index.pug'),
    }),
  ],
};
