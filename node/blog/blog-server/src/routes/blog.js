const Router = require("koa-router");
const Blog = require("../controller/blog");
const router = new Router();

router.prefix("/blog");

/**
 * 新增博客
 */
router.post("/add", async (ctx, next) => {
  const { id, title, summary, markdownContent } = ctx.request.body;
  ctx.rest(await Blog.addBlog(id, title, summary, markdownContent));
  await next();
});

/**
 * 获取博客列表
 */
router.get("/list", async (ctx, next) => {
  const { title, summary, pageIndex, pageSize } = ctx.query;
  ctx.rest(await Blog.getBlogList(title, summary, pageIndex, pageSize));
  await next();
});

/**
 * 根据id获取博客
 */
router.get("/detail", async (ctx, next) => {
  const { id } = ctx.query;
  ctx.rest(await Blog.getBlog(id));
  await next();
});
module.exports = router.routes();
