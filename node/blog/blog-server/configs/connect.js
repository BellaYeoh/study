const mongoose = require("mongoose");
const { name } = require("./config").db;

module.exports = {
  open() {
    return mongoose.connect(name);
  },
  close() {
    return mongoose.connection.close();
  },
};
