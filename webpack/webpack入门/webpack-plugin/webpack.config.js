const path = require('path');
const readmeWebpackPlugin = require('./plugins/readme-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new readmeWebpackPlugin()]
};