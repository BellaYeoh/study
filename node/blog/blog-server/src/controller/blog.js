const marked = require("marked");
const mdToc = require("markdown-toc");
const { markdownToHtmlRender } = require("../utils");
const blog = require("../dao/blog");
const Tag = require("../dao/models/tag");
const Category = require("../dao/models/category");

module.exports = {
  async addBlog(id, title, summary, markdownContent) {
    // markdownContent => toc
    const toc = marked(
      mdToc(summary + "\n\n" + markdownContent, { slugify: (str) => str })
        .content
    );

    // markdownContent => htmlContent
    const htmlContent = marked(summary + "\n\n" + markdownContent, {
      renderer: markdownToHtmlRender,
    });

    if (id) {
      await blog.update(id, {
        title,
        summary,
        markdownContent,
        htmlContent,
      });
    }

    return await blog.add({ title, summary, markdownContent, htmlContent });
  },
  async getBlogList() {},
  async getBlog() {},
  async updateBlog() {},
  async deleteBlogById() {},
};
