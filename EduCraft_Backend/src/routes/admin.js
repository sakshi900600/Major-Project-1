const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

// middleware
const requireAuth = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const requireAdmin = require("../middleware/requireAdmin");

// protect everything with admin access
router.use(requireAuth);
router.use(requireAdmin);

/* USER MANAGEMENT */
router.get("/users", adminController.getAllUsers);
router.get("/users/:id", adminController.getUser);
router.put("/users/:id/role", adminController.updateUserRole);
router.delete("/users/:id", adminController.deleteUser);

/* COURSE ADMIN */
router.put("/courses/:courseId/publish", adminController.publishCourse);
router.put("/courses/:courseId/unpublish", adminController.unpublishCourse);

/* BLOG ADMIN */
router.put("/blogs/:blogId/publish", adminController.publishBlog);
router.put("/blogs/:blogId/unpublish", adminController.unpublishBlog);

/* DASHBOARD */
router.get("/dashboard", adminController.getDashboardStats);

module.exports = router;
