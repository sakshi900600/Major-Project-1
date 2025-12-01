const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

const auth = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

// ADMIN ONLY ROUTES
router.post("/", auth, requireRole("admin"), blogController.createBlog);
router.put("/:id", auth, requireRole("admin"), blogController.updateBlog);
router.delete("/:id", auth, requireRole("admin"), blogController.deleteBlog);

// PUBLIC ROUTES
router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getBlog);
router.get("/slug/:slug", blogController.getBlogBySlug);


// LOGGED-IN USER ROUTES
router.post("/:id/like", auth, blogController.toggleLike);
router.post("/:id/comments", auth, blogController.addComment);

// ADMIN deletes any comment
router.delete("/:id/comments/:commentId", auth, requireRole("admin"), blogController.deleteComment);

module.exports = router;
