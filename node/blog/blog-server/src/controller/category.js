const Category = require("../dao/category");
const Blog = require("../dao/blog");

module.exports = {
  async addCategory(name) {
    const category = await Category.getCategoryByName(name);
    if (category !== null) {
      return { success: false, errMessage: "该分类已存在!" };
    }

    const result = await Category.add(name);
    return { success: true, data: result };
  },
  async deleteCategory(name) {
    const category = await Category.getCategoryByName(name);
    if (category === null) {
      return { success: false, errMessage: "该分类不存在!" };
    }

    const blogs = await Blog.getBlogList(undefined, undefined, name);
    blogs.forEach((item) => {
      item.category = "未分类";
      Blog.update(item.id, item);
    });

    await Category.delete(name);
    return { success: true };
  },
  async getCategoryList() {
    const data = await Category.getCategoryList();
    return { success: true, data };
  },
};
