const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  summary: String,
  toc: String,
  markdownContent: String,
  htmlContent: String,
  createTime: {
    type: Date,
    default: Date.now,
  },
  viewTimes: {
    type: Number,
    default: 0,
  },
  tags: [String],
  category: String,
  isDelete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
