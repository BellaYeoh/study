const env = process.env;
const nodeEnv = env.NODE_ENV;

let db = {
  name: "mongodb://localhost:27017/blog",
};

if (nodeEnv === "production") {
  db = {
    name: "mongodb://localhost:27017/blog",
  };
}

module.exports = {
  db,
};
