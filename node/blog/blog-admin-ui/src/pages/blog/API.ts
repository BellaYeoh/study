const { HOST } = process.env;

export default {
  addBlogList: `${HOST}api/blog/add`,
  getBlogList: `${HOST}api/blog/list`,
  getBlog: `${HOST}api/blog/detail`,
  deleteBlog: `${HOST}api/blog/delete`,
  addCategory: `${HOST}api/category/add`,
  deleteCategory: `${HOST}api/category/delete`,
  getCategoryList: `${HOST}api/category/list`,
  addTag: `${HOST}api/tag/add`,
  deleteTag: `${HOST}api/tag/delete`,
  getTagList: `${HOST}api/tag/list`,
};
