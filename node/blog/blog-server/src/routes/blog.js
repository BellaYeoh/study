const Router = require("koa-router");
const Blog = require("../controller/blog");
const router = new Router();

router.prefix("/blog");

/**
 * 获取博客列表
 */
router.post("/add", async (ctx, next) => {
  const { id, title, summary, markdownContent } = ctx.request.body;
  await Blog.addBlog(id, title, summary, markdownContent);
  await next();
});
module.exports = router.routes();
