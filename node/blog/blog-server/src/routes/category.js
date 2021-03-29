const Router = require("koa-router");
const Category = require("../controller/category");
const router = new Router();

router.prefix("/category");

/**
 * 新增分类
 */
router.get("/add", async (ctx, next) => {
  const { name } = ctx.query;
  ctx.rest(await Category.addCategory(name));
  await next();
});

/**
 * 删除分类
 */
router.get("/delete", async (ctx, next) => {
  const { name } = ctx.query;
  ctx.rest(await Category.deleteCategory(name));
  await next();
});

/**
 * 获取所有分类
 */
router.get("/list", async (ctx, next) => {
  ctx.rest(await Category.getCategoryList());
  await next();
});

module.exports = router.routes();
