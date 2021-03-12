const { HOST } = process.env;

export default {
  addBlogList: `${HOST}api/blog/add`,
  getBlogList: `${HOST}api/blog/list`,
};
