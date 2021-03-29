const markdownToHtmlRender = require("./markdownToHtmlRender");

const isObject = (variable) =>
  Object.prototype.toString.call(variable) === "[Object Object]";

const APIError = function (code) {
  this.errorType = "APIError";
  this.code = code;
};

module.exports = {
  markdownToHtmlRender,
  isObject,
  APIError,
};
