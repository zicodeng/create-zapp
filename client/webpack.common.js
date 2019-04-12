const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.tsx',
  },
  output: {
    filename: '[name].[hash].min.js',
    chunkFilename: '[name].[hash].min.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  resolve: {
    symlinks: false,
    cacheWithContext: false,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'public'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'thread-loader',
            options: {
              workers: 3,
              workerParallelJobs: 2,
              poolParallelJobs: 10,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|ttf)$/,
        exclude: /node_modules\/(?!(typeface-roboto)\/).*/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['index', 'styles', 'vendors'],
    }),
  ],
};
