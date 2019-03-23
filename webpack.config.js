var webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');


module.exports = {
  entry: {main: './src/index.js'},
  output: {
    path: path.resolve(__dirname, ''),
/*  filename: '[name].[chunkhash].js' */
    filename: 'scripts/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
/*            name: './img/[name].[hash].[ext]' */
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loader: "url?limit=5000"
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
/*        name: './fonts/[name].[hash].[ext]' */
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /datatables\.net(?!.*[.]css$).*/,
        loader: 'imports-loader?define=>false'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
/*      filename: 'style.[contenthash].css', */
      filename: './styles/styles.css',
    }),
    new HtmlWebpackPlugin({
      inject: true,
/*      hash: true, */
      template: './src/index.html',
      filename: './index.html',
      links: [
        './scripts/modernizr.js'
      ]
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    })

  ]
};
