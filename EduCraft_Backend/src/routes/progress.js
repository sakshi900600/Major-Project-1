const express = require('express');
const auth = require('../middleware/authMiddleware');
const {
  toggleSubtopicCompletion,
  saveLastAccessed,
  getMyCourseProgress
} = require('../controllers/progressController');

const router = express.Router();

router.post('/toggle', auth, toggleSubtopicCompletion);
router.post('/last-accessed', auth, saveLastAccessed);
router.get('/:courseId', auth, getMyCourseProgress); 

module.exports = router;
