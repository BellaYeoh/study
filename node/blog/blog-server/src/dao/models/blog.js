const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String, // 标题
  summary: String, // 文章概要
  toc: String, // 文章的toc，用于快速索引
  markdownContent: String, // 文章内容（markdown格式）
  htmlContent: String, // 文章内容（html格式）
  createTime: {
    // 创建时间
    type: Date,
    default: Date.now,
  },
  viewTimes: {
    // 文章被查看的次数
    type: Number,
    default: 0,
  },
  tags: [String], // 所属标签（可多个）
  category: String, // 所属分类（仅一个）
  isDelete: {
    // 被删除标记
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
