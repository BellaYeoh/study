const Tag = require("../dao/tag");
const Blog = require("../dao/blog");

module.exports = {
  async addTag(name) {
    const tag = await Tag.getTagByName(name);
    if (tag !== null) {
      return { success: false, errMesagge: "该标签已存在！" };
    }

    const result = await Tag.add(name);
    return { success: true, data: result };
  },
  async deleteTag(name) {
    const tag = await Tag.getTagByName(name);
    if (tag === null) {
      return { success: false, errMesagge: "该分类不存在！" };
    }

    const blogs = await Blog.getBlogList(undefined, undefined, tag);
    blogs.forEach((item) => {
      const index = item.tags.indexOf(name);
      if (index !== -1) {
        item.tags.splice(index, 1);
        Blog.update(item.id, item);
      }
    });

    await Tag.delete(name);
    return { success: true };
  },
  async getTagList() {
    const data = await Tag.getTagList();
    return { success: true, data };
  },
};
