const Category = require("./models/category");

module.exports = {
  async add(name) {
    return await Category.create({ name });
  },
  async delete(name) {
    return await Category.deleteOne({ name });
  },
  async getCategoryList() {
    return Category.find();
  },
  async getCategoryByName(name) {
    return await Category.findOne({ name });
  },
};
