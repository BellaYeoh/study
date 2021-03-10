const marked = require("marked");
const mdToc = require("markdown-toc");
const { markdownToHtmlRender } = require("../utils");
const blog = require("../dao/blog");
const Tag = require("../dao/models/tag");
const Category = require("../dao/models/category");

module.exports = {
  async createBlog(title, summary, markdownContent, tags, category) {
    // markdownContent => toc
    const toc = marked(
      mdToc(summary + "\n\n" + markdownContent, { slugify: (str) => str })
        .content
    );

    // markdownContent => htmlContent
    const htmlContent = marked(summary + "\n\n" + markdownContent, {
      renderer: markdownToHtmlRender,
    });

    return blog.add(
      title,
      summary,
      markdownContent,
      htmlContent,
      tags,
      category
    );
  },
  async getBlogList() {},
  async getBlog() {},
  async updateBlog() {},
  async deleteBlogById() {},
};
