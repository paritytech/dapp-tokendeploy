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

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProd
    ? '#hidden-source-map'
    : '#source-map',
  context: __dirname,
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
        use: [ 'babel-loader' ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [ 'babel-loader' ]
      },
      {
        test: /\.json$/,
        use: [ 'json-loader' ]
      },
      {
        test: /\.ejs$/,
        use: [ 'ejs-loader' ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              root: path.resolve(__dirname, '../assets/images'),
              attrs: ['img:src', 'link:href']
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [ 'html-loader', 'markdown-loader' ]
      },
      {
  	    test: /\.css$/,
  	    include: /semantic-ui-css/,
  	    use: [ 'style-loader', 'css-loader' ]
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
        use: [ {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[hash].[ext]'
          }
        } ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [ {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name][hash].[ext]'
          }
        } ]
      },
      {
        test: /parity-logo-white-no-text\.svg/,
        use: [ 'url-loader' ]
      },
      {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: [ /parity-logo-white-no-text\.svg/ ],
        use: [ {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[hash].[ext]'
          }
        } ]
      }
    ],
    noParse: [
      /node_modules\/sinon/
    ]
  },
  resolve: {
    alias: {
    },
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
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './index.ejs',
      chunks: [ 'bundle' ]
    })
  ]
};
