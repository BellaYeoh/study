const marked = require("marked");
const mdToc = require("markdown-toc");
const { markdownToHtmlRender } = require("../utils");
const Blog = require("../dao/blog");

module.exports = {
  async addBlog(blog) {
    const { id, summary, markdownContent } = blog;
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
        await Blog.update(id, {
          ...blog,
          toc,
          htmlContent,
        });
      } else {
        await Blog.add({
          ...blog,
          toc,
          htmlContent,
        });
      }

      return {};
    } catch (error) {
      return { success: false, errMessage: id ? "更新失败" : "插入失败" };
    }
  },
  async getBlogList(title, summary, tags, category, pageIndex, pageSize) {
    const tagArr = tags ? tags.split("*") : [];
    const [count, blogs] = await Promise.all([
      Blog.getBlogsCount(title, summary, tagArr, category),
      Blog.getBlogList(title, summary, tagArr, category, pageIndex, pageSize),
    ]);

    return {
      total: count,
      data: blogs,
    };
  },
  async getBlog(id) {
    return { data: await Blog.getBlogById(id) };
  },
  async deleteBlogById() {},
};
