const marked = require("marked");
const mdToc = require("markdown-toc");
const { markdownToHtmlRender } = require("../utils");
const blog = require("../dao/blog");

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

    try {
      if (id) {
        await blog.update(id, {
          title,
          summary,
          markdownContent,
          htmlContent,
        });
      } else {
        await blog.add({ title, summary, markdownContent, htmlContent });
      }

      return {};
    } catch (error) {
      return { success: false, errMessage: id ? "更新失败" : "插入失败" };
    }
  },
  async getBlogList(title, summary, pageIndex, pageSize) {
    const [count, blogs] = await Promise.all([
      blog.getBlogsCount(title, summary),
      blog.getBlogList(title, summary, pageIndex, pageSize),
    ]);

    return {
      total: count,
      data: blogs,
    };
  },
  async getBlog(id) {
    return { data: await blog.getBlogById(id) };
  },
  async updateBlog() {},
  async deleteBlogById() {},
};
