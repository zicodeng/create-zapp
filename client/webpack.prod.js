const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const { commonConfig, getCSSRules } = require('./webpack.common');

module.exports = merge.smart(commonConfig, {
  devtool: 'source-map',
  module: {
    rules: [...getCSSRules('production')],
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    // Doc: https://webpack.js.org/plugins/split-chunks-plugin/
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
    new FaviconsWebpackPlugin({
      logo: './public/images/logo.png',
      prefix: 'public/favicons/',
      title: 'Create Zapp',
    }),
  ],
});
