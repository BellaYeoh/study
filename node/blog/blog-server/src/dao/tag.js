const { add, getCategoryByName } = require("./category");
const Tag = require("./models/tag");

module.exports = {
  async add(name) {
    return await Tag.create({ name });
  },
  async delete(name) {
    return await Tag.deleteOne({ name });
  },
  async getTagList() {
    return Tag.find();
  },
  async getTagByName(name) {
    return await Tag.findOne({ name });
  },
  async hasNotExisted(tags) {
    const tagData = await this.getTagList();
    const tagList = tagData.map((doc) => doc.name);
    return tags.some((tag) => tagList.indexOf(tag) === -1);
  },
};
