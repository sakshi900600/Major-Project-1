const User = require("../models/User");
const Course = require("../models/Course");
const Blog = require("../models/Blog");

/* =======================================================
   USER MANAGEMENT
======================================================= */
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password_hash -refreshTokens");
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password_hash -refreshTokens");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const allowed = ["admin", "learner", "instructor"];

    if (!allowed.includes(role))
      return res.status(400).json({ message: "Invalid role" });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password_hash -refreshTokens");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

/* =======================================================
   COURSE ADMIN (publish/unpublish)
======================================================= */
exports.publishCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      { published: true },
      { new: true }
    );
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    next(err);
  }
};

exports.unpublishCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      { published: false },
      { new: true }
    );
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    next(err);
  }
};

/* =======================================================
   BLOG ADMIN (publish/unpublish)
======================================================= */
exports.publishBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.blogId,
      { published: true },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

exports.unpublishBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.blogId,
      { published: false },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

/* =======================================================
   ADMIN DASHBOARD
======================================================= */
exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalBlogs = await Blog.countDocuments();

    const recentUsers = await User.find().sort({ created_at: -1 }).limit(5);
    const recentBlogs = await Blog.find().sort({ created_at: -1 }).limit(5);

    // count nested content
    const allCourses = await Course.find();
    let modules = 0,
        topics = 0,
        subtopics = 0;

    allCourses.forEach((c) => {
      modules += c.modules.length;

      c.modules.forEach((m) => {
        topics += m.topics.length;

        m.topics.forEach((t) => {
          subtopics += t.subtopics.length;
        });
      });
    });

    res.json({
      totals: {
        users: totalUsers,
        courses: totalCourses,
        blogs: totalBlogs,
        modules,
        topics,
        subtopics
      },
      recentUsers,
      recentBlogs
    });
  } catch (err) {
    next(err);
  }
};
