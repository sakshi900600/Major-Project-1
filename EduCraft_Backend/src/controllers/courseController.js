// controllers/courseController.js
const Course = require("../models/Course");
const User = require("../models/User");
const { slugify, generateUniqueSlug } = require("../utils/slugify");

/* helper to resolve author names -> ids (keeps original behavior) */
async function resolveAuthors(authorsInput) {
  if (!authorsInput || !Array.isArray(authorsInput)) return [];

  const authors = [];
  for (const name of authorsInput) {
    const user = await User.findOne({ name });
    if (user) authors.push(user._id);
  }
  return authors;
}

/* GET all courses */
const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate("authors", "name email");
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

/* GET course by ID (admin/backoffice) */
const getCourse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id).populate("authors", "name email");
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    next(err);
  }
};

/* GET course by slug (public) */
const getCourseBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const course = await Course.findOne({ slug }).populate("authors", "name email");
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    next(err);
  }
};

/* CREATE course (admin) */
const createCourse = async (req, res, next) => {
  try {
    const data = req.body;

    // ensure basic slug and uniqueness across courses
    let baseSlug = slugify(data.title || "course");
    // if collision, append -1, -2 ...
    let slug = baseSlug;
    let counter = 1;
    while (await Course.exists({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const authors = await resolveAuthors(data.authors);

    const course = await Course.create({
      ...data,
      authors,
      slug,
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

/* UPDATE course (admin) */
const updateCourse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (data.title) {
      const baseSlug = slugify(data.title);
      let slug = baseSlug;
      let counter = 1;
      // ensure uniqueness across courses excluding this one
      while (await Course.exists({ slug, _id: { $ne: id } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      data.slug = slug;
    }

    if (data.authors) {
      data.authors = await resolveAuthors(data.authors);
    }

    const course = await Course.findByIdAndUpdate(
      id,
      { ...data, updated_at: new Date() },
      { new: true }
    ).populate("authors", "name email");

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (err) {
    next(err);
  }
};

/* DELETE course (admin) */
const deleteCourse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};


/**
 * Check if logged-in user is enrolled in course
 * GET /api/course/:id/enrollment-status
 */
const checkEnrollmentStatus = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const courseId = req.params.id;

    const user = await User.findById(userId);

    const enrollment = user.enrollments.find(
      e => e.course_id.toString() === courseId
    );

    res.json({
      enrolled: !!enrollment,
      status: enrollment?.status || null,
      progress: enrollment?.progress || 0
    });
  } catch (err) {
    next(err);
  }
};





module.exports = {
  getCourses,
  getCourse,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  checkEnrollmentStatus
};
