const mongoose = require("mongoose");
const slugify = require("slugify");

/* =======================================================
   CONTENT SECTIONS
======================================================= */
const ContentSectionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["heading", "subheading", "text", "image", "code", "quote", "video"],
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

/* =======================================================
   COMMENTS
======================================================= */
const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  username: String,
  text: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

/* =======================================================
   BLOG SCHEMA
======================================================= */
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },

  // Multi-section content
  content: [ContentSectionSchema],

  excerpt: { type: String, default: "" },
  thumbnail: { type: String, default: "" },

  tags: [{ type: String }],

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  published: { type: Boolean, default: false },

  // Comments
  comments: [CommentSchema],

  // Likes (store userId)
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  // NEW → views counter
  views: { type: Number, default: 0 },

  // NEW → reading time (minutes)
  readingTime: { type: Number, default: 0 },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

/* =======================================================
   AUTO-GENERATE SLUG + READING TIME
======================================================= */
BlogSchema.pre("save", function (next) {
  // slug
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // reading time calculation
  if (this.isModified("content")) {
    const fullText = this.content.map(c => c.value).join(" ");
    const words = fullText.split(/\s+/).length;
    this.readingTime = Math.ceil(words / 200); // 200 WPM standard
  }

  next();
});

module.exports = mongoose.model("Blog", BlogSchema);
