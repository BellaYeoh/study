const Koa = require("koa");
const { open } = require("../configs/connect");
const bodyParser = require("koa-bodyparser");
open();

const app = new Koa();
const routes = require("./routes");

app.use(bodyParser({ multipart: true }));
app.use(routes);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (ex) {
    console.error(ex);
  }
});

app.listen(3000, () => console.log("server is listening on 3000..."));
