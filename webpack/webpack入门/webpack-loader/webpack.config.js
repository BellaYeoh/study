const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext].webp'
          }
        }, {
          loader: path.resolve('./loader/webp-loader.js'),
          options: {
            quality: 0.7
          }
        }]
      },
    ]
  }
};