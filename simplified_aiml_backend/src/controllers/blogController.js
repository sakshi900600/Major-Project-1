const Blog = require("../models/Blog");
const slugify = require("slugify");

/* =======================================================
   CREATE BLOG (ADMIN)
======================================================= */
exports.createBlog = async (req, res, next) => {
  try {
    const data = req.body;

    const blog = await Blog.create({
      ...data,
      slug: slugify(data.title, { lower: true, strict: true }),
      author: req.user?.id || null,
      created_at: new Date(),
      updated_at: new Date()
    });

    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
};

/* =======================================================
   GET ALL BLOGS (Public)
   Supports: search, pagination, tags, sorting
======================================================= */
exports.getBlogs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      tag,
      sort = "latest"
    } = req.query;

    const query = {};

    // search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } }
      ];
    }

    // filter by tag
    if (tag) query.tags = tag;

    // sort options
    const sortOptions = {
      latest: { created_at: -1 },
      oldest: { created_at: 1 },
      "most-liked": { likes: -1 }
    };

    const blogs = await Blog.find(query)
      .sort(sortOptions[sort] || sortOptions.latest)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(query);

    res.json({
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      total,
      blogs
    });
  } catch (err) {
    next(err);
  }
};

/* =======================================================
   GET SINGLE BLOG (Public)
   Auto increments views
======================================================= */
exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // increment views
    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (err) {
    next(err);
  }
};


/* -------------------- Get Single blog using slug -------------------- */
exports.getBlogBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    const blog = await Blog.findOne({ slug });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // increment views
    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (err) {
    next(err);
  }
};



/* =======================================================
   UPDATE BLOG (Admin)
======================================================= */
exports.updateBlog = async (req, res, next) => {
  try {
    const data = req.body;

    if (data.title) {
      data.slug = slugify(data.title, { lower: true, strict: true });
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { ...data, updated_at: new Date() },
      { new: true }
    );

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (err) {
    next(err);
  }
};

/* =======================================================
   DELETE BLOG (Admin)
======================================================= */
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Blog deleted" });
  } catch (err) {
    next(err);
  }
};

/* =======================================================
   LIKE / UNLIKE BLOG
======================================================= */
exports.toggleLike = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const userId = req.user?.id;
    if (!userId) return res.status(400).json({ message: "User required" });

    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(id => id.toString() !== userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    res.json({
      liked: !alreadyLiked,
      totalLikes: blog.likes.length
    });
  } catch (err) {
    next(err);
  }
};

/* =======================================================
   ADD COMMENT
======================================================= */
exports.addComment = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const { text, username } = req.body;

    blog.comments.push({
      userId: req.user?.id || null,
      username,
      text
    });

    await blog.save();

    res.status(201).json(blog.comments);
  } catch (err) {
    next(err);
  }
};

/* =======================================================
   DELETE COMMENT
======================================================= */
exports.deleteComment = async (req, res, next) => {
  try {
    const { id, commentId } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.comments = blog.comments.filter(
      c => c._id.toString() !== commentId
    );

    await blog.save();

    res.json({ message: "Comment deleted" });
  } catch (err) {
    next(err);
  }
};

/* =======================================================
   TRENDING BLOGS (views + likes)
======================================================= */
exports.getTrendingBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .sort({ likes: -1, views: -1 })
      .limit(10);

    res.json(blogs);
  } catch (err) {
    next(err);
  }
};
