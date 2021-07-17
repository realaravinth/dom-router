'use strict';
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    router: './src/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist/'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};
