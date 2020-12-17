/**
 * bundle.js：作为入口进行webpack构建，创建lib下webpack.js
 */

// 读取webpack的配置文件
const options = require('./webpack.config.js');
const Webpack = require('./lib/webpack.js');
new Webpack(options).run();