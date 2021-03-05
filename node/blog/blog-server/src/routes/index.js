const Router = require("koa-router");
const blogRoutes = require("./blog");

const router = new Router();

router.use(blogRoutes);

module.exports = router.routes();
