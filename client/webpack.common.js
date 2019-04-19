const path = require('path');

const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';
console.log(chalk.green(`Building client for ${mode}...`));

/**
 * Set up two CSS rules,
 * one for transforming custom CSS with CSS modules,
 * the other one for transforming vendor CSS
 */
const getCSSRules = mode => {
  const isDev = mode === 'development';
  return [
    {
      test: /\.css$/,
      include: [path.resolve(__dirname, './src')],
      use: [
        {
          loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true,
            modules: true,
            localIdentName: isDev
              ? '[name]__[local]--[hash:base64:5]'
              : '[hash:base64:5]',
          },
        },
        {
          loader: 'postcss-loader',
        },
      ],
    },
    {
      test: /\.css$/,
      // Prefer whitelist over blacklist
      include: [
        path.resolve(__dirname, './node_modules/typeface-roboto'),
        path.resolve(__dirname, './node_modules/normalize.css'),
        path.resolve(__dirname, './node_modules/react-responsive-carousel'),
      ],
      use: [
        {
          loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
        },
      ],
    },
  ];
};

const commonConfig = {
  mode,
  entry: {
    index: './src/index.tsx',
  },
  output: {
    filename: '[name].[hash].min.js',
    chunkFilename: '[name].[hash].min.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  context: __dirname,
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
      // For loading fonts
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        include: [path.resolve(__dirname, './node_modules/typeface-roboto')],
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'public/fonts',
            },
          },
        ],
      },
      // For loading images
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        include: [path.resolve(__dirname, './public/images')],
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'public/images',
            },
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
      favicon: isDev ? './public/favicon.ico' : false,
    }),
  ],
};

module.exports = {
  getCSSRules,
  commonConfig,
};
