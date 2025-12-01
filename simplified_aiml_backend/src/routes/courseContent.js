const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const {
  addModule,
  updateModule,
  deleteModule,
  addTopic,
  updateTopic,
  deleteTopic,
  addSubtopic,
  updateSubtopic,
  deleteSubtopic
} = require("../controllers/contentController");

// all routes require admin or author
router.use(auth, requireRole(["admin", "author"]));

/* ------------ MODULES ------------ */
router.post("/:courseId/modules", addModule);
router.patch("/:courseId/modules/:moduleId", updateModule);
router.delete("/:courseId/modules/:moduleId", deleteModule);

/* ------------ TOPICS ------------ */
router.post("/:courseId/modules/:moduleId/topics", addTopic);
router.patch("/:courseId/modules/:moduleId/topics/:topicId", updateTopic);
router.delete("/:courseId/modules/:moduleId/topics/:topicId", deleteTopic);

/* ------------ SUBTOPICS ------------ */
router.post("/:courseId/modules/:moduleId/topics/:topicId/subtopics", addSubtopic);
router.patch("/:courseId/modules/:moduleId/topics/:topicId/subtopics/:subtopicId", updateSubtopic);
router.delete(
  "/:courseId/modules/:moduleId/topics/:topicId/subtopics/:subtopicId",
  deleteSubtopic
);

module.exports = router;
