const chalk = require('chalk');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const common = require('./webpack.common.js');

console.log(chalk.green('Building client for development...'));

module.exports = merge.smart(common, {
  output: {
    pathinfo: false,
  },
  watch: true,
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules\/(?!(typeface-roboto|normalize.css)\/).*/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      tslint: './../tslint.json',
      tsconfig: './tsconfig.json',
      // watch is optional but improves performance (fewer stat calls)
      watch: ['./src', './test'],
      checkSyntacticErrors: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
});
