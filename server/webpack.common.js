const path = require('path');

const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // Enabling Webpack to work for node environment
  // Tells Webpack to not touch any built-in modules like fs or path
  target: 'node',
  entry: [path.join(__dirname, 'src/index.ts')],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules', 'src'],
  },
  externals: [nodeExternals({})],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          {
            loader: 'ts-loader',
            options: {
              // IMPORTANT! Use happyPackMode mode to speed-up
              // compilation and reduce errors reported to webpack
              happyPackMode: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
