const Koa = require("koa");

const app = new Koa();
const routes = require("./routes");

app.use(routes);

app.listen(3000, () => console.log("server is listening on 3000..."));
