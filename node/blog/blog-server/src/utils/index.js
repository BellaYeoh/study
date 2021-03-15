const markdownToHtmlRender = require("./markdownToHtmlRender");

const isObject = (variable) =>
  Object.prototype.toString.call(variable) === "[Object Object]";

module.exports = {
  markdownToHtmlRender,
  isObject,
};
