// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProd
    ? '#hidden-source-map'
    : '#source-map',
  context: path.join(__dirname, 'src'),
  entry: {
    bundle: './index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: /node_modules\/@parity/,
        use: [ {
          loader: 'happypack/loader',
          options: {
            id: 'babel'
          }
        } ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [ {
          loader: 'happypack/loader',
          options: {
            id: 'babel'
          }
        } ]
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      },
      {
        test: /\.ejs$/,
        use: ['ejs-loader']
      },
      {
        test: /\.md$/,
        use: ['html-loader', 'markdown-loader']
      },
      {
        test: /\.css$/,
        include: /semantic-ui-css/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.css$/,
        exclude: /semantic-ui-css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64:10]',
              minimize: true,
              modules: true
            }
        },
        {
        loader: 'postcss-loader',
        options: {
          plugins: (loader) => [
            require('postcss-import'),
            require('postcss-nested'),
            require('postcss-simple-vars')
          ]
     }
        }
      ]
    },
      {
        test: /\.(png|jpg)$/,
        use: ['base64-inline-loader']
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['base64-inline-loader']
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader']
      }
    ],
    noParse: [
      /node_modules\/sinon/
    ]
  },
  resolve: {
    alias: {},
    modules: [
      path.join(__dirname, 'node_modules')
    ],
    extensions: ['.json', '.js', '.jsx'],
    unsafeCache: true
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new HappyPack({
      id: 'babel',
      threads: 4,
      loaders: ['babel-loader']
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './index.ejs',
      chunks: ['bundle']
    }),
    isProd && new webpack.optimize.UglifyJsPlugin({
      screwIe8: true,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ].filter((plugin) => plugin)
};
