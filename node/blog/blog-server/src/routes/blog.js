const Router = require("koa-router");
const {
  createBlog,
  getBlogList,
  getBlog,
  updateBlog,
  deleteBlogById,
} = require("../controller/blog");
const router = new Router();

router.prefix("/api");

/**
 * 获取博客列表
 */
router.get('/blog',)
module.exports = router.routes();
