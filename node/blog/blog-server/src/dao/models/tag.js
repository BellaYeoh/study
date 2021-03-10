const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("tag", tagSchema);
