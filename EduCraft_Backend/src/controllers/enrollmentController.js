const mongoose = require('mongoose');
const User = require("../models/User");
const Course = require("../models/Course");

/* ======================================================
   ENROLL IN COURSE
====================================================== */
exports.enrollInCourse = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course || !course.published) {
      return res.status(404).json({ message: "Course not found or unpublished" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyEnrolled = user.enrollments.some(
      e => e.course_id.toString() === courseId
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    user.enrollments.push({
      course_id: new mongoose.Types.ObjectId(course._id),
      status: "in_progress",
      progress: 0,
      started_at: Date.now()
    });

    await user.save();

    res.status(201).json({ message: "Enrolled successfully" });
  } catch (err) {
    next(err);
  }
};

/* ======================================================
   GET MY COURSES
====================================================== */
exports.getMyCourses = async (req, res, next) => {
  try {
    const userId = req.user.sub;

    const user = await User.findById(userId)
      .populate("enrollments.course_id", "title slug thumbnail level");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.enrollments);
  } catch (err) {
    next(err);
  }
};

/* ======================================================
   GET COURSE ENROLLMENTS (ADMIN / AUTHOR)
====================================================== */
exports.getCourseEnrollments = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const users = await User.find(
      { "enrollments.course_id": courseId },
      "name email enrollments"
    );

    res.json(users);
  } catch (err) {
    next(err);
  }
};
