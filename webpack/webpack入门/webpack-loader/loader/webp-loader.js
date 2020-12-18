/**
 * loader主文件
 */
const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');
const schema = require('./options.json');
const CWebp = require('cwebp').CWebp;

/**
 * 普通图片转 .webp 图片
 * @param {string \ buffer} img 图片绝对路径或二进制流
 * @param {number} quality quality 生成webp图片的质量，默认75
 */
async function convertToWebp(img, quality = 75) {
  let encoder = new CWebp(img);
  encoder.quality = quality;
  let buffer = await encoder.toBuffer();
  return buffer;
}

module.exports = async function loader(content) {
  // 异步模式
  const callback = this.async();
  // 获取 options
  const options = getOptions(this) || {};
  // 验证 options
  validate(schema, options, {
    name: 'webp loader',
    baseDataPath: 'options',
  });

  try {
    // 普通图片转 .webp
    let buffer = await convertToWebp(content, options.quality);
    callback(null, buffer);
  } catch (err) {
    callback(err);
  }
}

// 通过 exports.raw 属性告诉 Webpack 该 Loader 是否需要二进制数据
module.exports.raw = true;