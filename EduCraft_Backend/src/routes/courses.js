const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseBySlug
} = require('../controllers/courseController');

// public
router.get('/', getCourses);
router.get('/:id', getCourse);
router.get("/slug/:slug", getCourseBySlug);


// protected
router.post('/', auth, requireRole(['admin', 'author']), createCourse);
router.patch('/:id', auth, requireRole(['admin', 'author']), updateCourse);
router.delete('/:id', auth, requireRole(['admin']), deleteCourse);

module.exports = router;
