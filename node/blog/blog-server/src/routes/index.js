const Router = require("koa-router");
const blogRoutes = require("./blog");
const categoryRoutes = require("./category");
const tagRoutes = require("./tag");
const router = new Router();

router.prefix("/api");

router.use(blogRoutes);
router.use(categoryRoutes);
router.use(tagRoutes);

module.exports = router.routes();
