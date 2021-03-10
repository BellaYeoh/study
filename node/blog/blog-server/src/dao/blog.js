const Blog = require("./models/blog");

module.exports = {
  async add(blog) {
    let _blog = await Blog.create(blog);
    return _blog;
  },
  async update(id, blog) {
    return await Blog.findByIdAndUpdate(id, blog);
  },
  async delete(id) {
    return await Blog.findByIdAndUpdate(id, {
      isDelete: true,
    });
  },
  async getPhotos(title, tags, category, pageIndex, pageSize) {
    let result;
    if (pageSize) {
      result = await Blog.find({
        title,
        tags,
        category,
        isDelete: false,
      })
        .sort({
          created: -1,
        })
        .skip((pageIndex - 1) * pageSize)
        .limit(pageSize);
    } else {
      result = await Blog.find({
        title,
        tags,
        category,
        isDelete: false,
      }).sort({
        created: -1,
      });
    }

    return result;
  },
  async getBlogById(id) {
    return await Blog.findById(id);
  },
};
