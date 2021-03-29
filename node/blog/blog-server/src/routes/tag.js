const Router = require("koa-router");
const Tag = require("../controller/tag");
const router = new Router();

router.prefix("/tag");

/**
 * 新增标签
 */
router.get("/add", async (ctx, next) => {
  const { name } = ctx.query;
  ctx.rest(await Tag.addTag(name));
  await next();
});

/**
 * 删除分类
 */
router.get("/delete", async (ctx, next) => {
  const { name } = ctx.query;
  ctx.rest(await Tag.deleteTag(name));
  await next();
});

/**
 * 获取所有标签
 */
router.get("/list", async (ctx, next) => {
  ctx.rest(await Tag.getTagList());
  await next();
});

module.exports = router.routes();
