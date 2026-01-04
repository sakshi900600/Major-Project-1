const mongoose = require('mongoose');
const User = require("../models/User");
const Course = require("../models/Course");

/* ======================================================
   TOGGLE SUBTOPIC COMPLETION
====================================================== */
exports.toggleSubtopicCompletion = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { courseId, moduleId, topicId, subtopicId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ensure course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const enrollment = user.enrollments.find(
      e => String(e.course_id) === String(courseId)
    );

    if (!enrollment) {
      return res.status(404).json({ message: "Not enrolled in course" });
    }

    // Validate that the module/topic/subtopic exist in the course
    const mod = course.modules.find(m => String(m._id) === String(moduleId));
    if (!mod) return res.status(400).json({ message: "Module not found in course" });

    const top = mod.topics.find(t => String(t._id) === String(topicId));
    if (!top) return res.status(400).json({ message: "Topic not found in module" });

    const sub = top.subtopics.find(s => String(s._id) === String(subtopicId));
    if (!sub) return res.status(400).json({ message: "Subtopic not found in topic" });

    const index = enrollment.completed_subtopics.findIndex(s =>
      String(s.moduleId) === String(moduleId) &&
      String(s.topicId) === String(topicId) &&
      String(s.subtopicId) === String(subtopicId)
    );

    if (index >= 0) {
      enrollment.completed_subtopics.splice(index, 1);
    } else {
      enrollment.completed_subtopics.push({
        moduleId: new mongoose.Types.ObjectId(moduleId),
        topicId: new mongoose.Types.ObjectId(topicId),
        subtopicId: new mongoose.Types.ObjectId(subtopicId)
      });
    }

    // compute total subtopics in course
    let totalSubtopics = 0;
    if (Array.isArray(course.modules)) {
      course.modules.forEach(m => {
        if (Array.isArray(m.topics)) {
          m.topics.forEach(t => {
            totalSubtopics += Array.isArray(t.subtopics) ? t.subtopics.length : 0;
          });
        }
      });
    }

    if (totalSubtopics === 0) {
      enrollment.progress = 0;
    } else {
      enrollment.progress = Math.round((enrollment.completed_subtopics.length / totalSubtopics) * 100);
    }

    if (enrollment.progress === 100) {
      enrollment.status = "completed";
      enrollment.completed_at = new Date();
    } else {
      // revert completed state if user unmarked some items
      if (enrollment.status === "completed") {
        enrollment.status = "in_progress";
        enrollment.completed_at = undefined;
      }
    }

    await user.save();
    res.json(enrollment);
  } catch (err) {
    next(err);
  }
};

/* ======================================================
   SAVE LAST ACCESSED CONTENT
====================================================== */
exports.saveLastAccessed = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { courseId, moduleId, topicId, subtopicId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const enrollment = user.enrollments.find(
      e => e.course_id.toString() === courseId
    );

    if (!enrollment) {
      return res.status(404).json({ message: "Not enrolled" });
    }

    enrollment.last_accessed = {
      moduleId: moduleId ? new mongoose.Types.ObjectId(moduleId) : undefined,
      topicId: topicId ? new mongoose.Types.ObjectId(topicId) : undefined,
      subtopicId: subtopicId ? new mongoose.Types.ObjectId(subtopicId) : undefined
    };
    await user.save();

    res.json({ message: "Progress saved" });
  } catch (err) {
    next(err);
  }
};


/* ======================================================
   GET USER COURSE PROGRESS
====================================================== */
exports.getMyCourseProgress = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { courseId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const enrollment = user.enrollments.find(
      e => e.course_id.toString() === courseId
    );

    if (!enrollment) {
      return res.status(404).json({ message: "Not enrolled" });
    }

    res.json({
      progress: enrollment.progress,
      completed_subtopics: enrollment.completed_subtopics,
      last_accessed: enrollment.last_accessed,
      status: enrollment.status
    });
  } catch (err) {
    next(err);
  }
};
