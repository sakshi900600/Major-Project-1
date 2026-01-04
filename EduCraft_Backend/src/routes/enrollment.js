const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const enrollmentController = require("../controllers/enrollmentController");

router.post("/enroll/:courseId", auth, enrollmentController.enrollInCourse);
router.get("/my-courses", auth, enrollmentController.getMyCourses);
router.get(
  "/course/:courseId/enrollments",
  auth,
  enrollmentController.getCourseEnrollments
);

module.exports = router;
