const path = require('path');

const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
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
    new BundleAnalyzerPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, './.env/.env.prod'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].min.css',
      chunkFilename: '[name].[hash].min.css',
    }),
    new FaviconsWebpackPlugin({
      logo: './public/images/logo.png',
      prefix: 'public/favicons/',
      title: 'Create Zapp',
    }),
    new FileManagerPlugin({
      onStart: [
        {
          delete: ['./dist/'],
        },
      ],
      onEnd: [
        {
          copy: [
            // 200.html is required by surge.sh to make client-side routing work
            // https://surge.sh/help/adding-a-200-page-for-client-side-routing
            { source: './dist/index.html', destination: './dist/200.html' },
          ],
        },
      ],
    }),
  ],
});
