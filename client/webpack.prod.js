const chalk = require('chalk');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const common = require('./webpack.common.js');

console.log(chalk.green('Building client for production...'));

module.exports = merge.smart(common, {
  watch: true,
  devtool: 'source-map',
  mode: 'production',
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
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
              modules: true,
              localIdentName: '[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      cacheGroups: {
        styles: {
          chunks: 'all',
          name: 'styles',
          test: /\.(sa|sc|c)ss$/,
          enforce: true,
        },
        vendors: {
          chunks: 'all',
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].min.css',
      chunkFilename: '[name].[hash].min.css',
    }),
  ],
});
