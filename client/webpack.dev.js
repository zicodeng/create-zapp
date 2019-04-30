const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { commonConfig, getCSSRules } = require('./webpack.common');

module.exports = merge.smart(commonConfig, {
  output: {
    pathinfo: false,
  },
  watch: true,
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [...getCSSRules('development')],
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, './.env/.env.dev'),
    }),
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
