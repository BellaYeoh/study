const Koa = require("koa");
const { open } = require("../configs/connect");
const bodyParser = require("koa-bodyparser");
const logger = require("./middlewares/log");
const { restify } = require("./middlewares/restify");
const cors = require("@koa/cors");

open();

const app = new Koa();
const routes = require("./routes");

app.use(logger);
app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);

app.use(bodyParser({ multipart: true }));
app.use(restify(new RegExp("^(/admin/|/)api/")));
app.use(routes);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (ex) {
    console.error(ex);
  }
});

app.listen(3000, () => console.log("server is listening on 3000..."));
