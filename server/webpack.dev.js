const path = require('path');

const chalk = require('chalk');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const common = require('./webpack.common.js');

console.log(chalk.green('Building server for development...'));

module.exports = merge.smart(common, {
  watch: true,
  devtool: 'inline-source-map',
  mode: 'development',
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
  ],
});
