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
  async getBlogList(title, summary, pageIndex, pageSize) {
    let result;
    let params = {
      isDelete: false,
    };

    if (title) {
      params.title = { $regex: title };
    }

    if (summary) {
      params.summary = { $regex: summary };
    }

    if (pageSize) {
      result = await Blog.find(params)
        .sort({
          createTime: -1,
        })
        .skip((pageIndex - 1) * pageSize)
        .limit(Number(pageSize));
    } else {
      result = await Blog.find(params).sort({
        createTime: -1,
      });
    }

    return result;
  },
  async getBlogsCount(title, summary) {
    let params = {
      isDelete: false,
    };

    if (title !== undefined) {
      params.title = { $regex: title };
    }

    if (summary !== undefined) {
      params.summary = { $regex: summary };
    }

    return Blog.count(params);
  },
  async getBlogById(id) {
    return await Blog.findById(id);
  },
};
