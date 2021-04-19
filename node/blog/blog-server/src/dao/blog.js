const Blog = require("./models/blog");
const Category = require("./category");
const Tag = require("./tag");
const { APIError } = require("../utils");

module.exports = {
  async add(blog) {
    const { tags, category } = blog;
    if (tags && tags.length > 0) {
      const hasNotExistedTag = await Tag.hasNotExisted(tags);
      if (hasNotExistedTag) {
        throw new APIError(`${tags}不存在！`);
      }
    }

    if (category) {
      const categoryItem = await Category.getCategoryByName(category);
      if (categoryItem === null) {
        throw new APIError(`${category}不存在！`);
      }
    }
    return await Blog.create(blog);
  },
  async update(id, blog) {
    const { tags, category } = blog;
    if (tags && tags.length > 0) {
      const hasNotExistedTag = await Tag.hasNotExisted(tags);
      if (hasNotExistedTag) {
        throw new APIError(`${tags}不存在！`);
      }
    }

    if (category) {
      const categoryItem = await Category.getCategoryByName(category);
      if (categoryItem === null) {
        throw new APIError(`${category}不存在！`);
      }
    }

    return await Blog.findByIdAndUpdate(id, blog);
  },
  async delete(id) {
    // return await Blog.findByIdAndUpdate(id, {
    //   isDelete: true,
    // });
    return await Blog.deleteOne({ _id: id });
  },
  async getBlogList(title, summary, tags, category, pageIndex, pageSize) {
    let result;
    let params = {
      isDelete: false,
    };

    if (tags && tags.length > 0) {
      const hasNotExistedTag = await Tag.hasNotExisted(tags);
      if (!hasNotExistedTag) {
        params.tags = { $in: tags };
      } else {
        throw new APIError(`${tags}不存在！`);
      }
    }

    if (title) {
      params.title = { $regex: title };
    }

    if (summary) {
      params.summary = { $regex: summary };
    }

    if (category) {
      const categoryItem = await Category.getCategoryByName(category);
      if (categoryItem) {
        params.category = category;
      } else {
        throw new APIError(`${category}不存在！`);
      }
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
  async getBlogsCount(title, summary, tags, category) {
    let params = {
      isDelete: false,
    };

    if (tags && tags.length > 0) {
      const hasNotExistedTag = await Tag.hasNotExisted(tags);
      if (!hasNotExistedTag) {
        params.tags = tags;
      } else {
        throw new APIError(`${tags}不存在！`);
      }
    }

    if (title !== undefined) {
      params.title = { $regex: title };
    }

    if (summary !== undefined) {
      params.summary = { $regex: summary };
    }

    if (category) {
      const categoryItem = await Category.getCategoryByName(category);
      if (categoryItem) {
        params.category = category;
      } else {
        throw new APIError(`${category}不存在！`);
      }
    }

    return Blog.count(params);
  },
  async getBlogById(id) {
    return await Blog.findById(id);
  },
};
