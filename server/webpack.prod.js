const path = require('path');

const chalk = require('chalk');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

const common = require('./webpack.common.js');

console.log(chalk.green('Building server for production...'));

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, './.env/.env.prod'),
    }),
  ],
});
