const mongoose = require("mongoose");

/* ======================================================
   CONTENT BLOCK SCHEMA
====================================================== */
const ContentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "heading",
      "paragraph",
      "list",
      "table",
      "image",
      "video",
      "quote",
      "code",
      "link"
    ],
    required: true
  },

  text: String,
  items: [String],

  table: {
    headers: [String],
    rows: [[String]]
  },

  src: String,
  caption: String,

  language: String,
  code: String,

  url: String
});

/* ======================================================
   SUBTOPIC SCHEMA
====================================================== */
const SubtopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: Number,
  contents: [ContentBlockSchema]
});

/* ======================================================
   TOPIC SCHEMA
====================================================== */
const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: Number,
  subtopics: [SubtopicSchema]
});

/* ======================================================
   MODULE SCHEMA
====================================================== */
const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  order: Number,
  topics: [TopicSchema]
});

/* ======================================================
   INSTRUCTOR SCHEMA
====================================================== */
const InstructorSchema = new mongoose.Schema({
  name: String,
  designation: String,
  image: String,
  bio: String,
  social: {
    linkedin: String,
    twitter: String,
    github: String,
    website: String
  }
});

/* ======================================================
   FAQ SCHEMA
====================================================== */
const FaqSchema = new mongoose.Schema({
  question: String,
  answer: String
});

/* ======================================================
   COURSE SCHEMA
====================================================== */
const CourseSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  short_description: String,
  description: String,

  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"]
  },

  category: String,
  tags: [String],
  thumbnail: String,
  published: { type: Boolean, default: false },

  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  instructors: [InstructorSchema],

  rating: { type: Number, default: 0 },
  duration: { type: String, default: "0h" },

  stats: {
    lessons: { type: Number, default: 0 },
    quizzes: { type: Number, default: 0 },
    challenges: { type: Number, default: 0 },
    mockInterviews: { type: Number, default: 0 }
  },

  features: [String],
  why_join: [String],
  skills: [String],
  faq: [FaqSchema],

  modules: [ModuleSchema],

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

/* Auto-update updated_at */
CourseSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Course", CourseSchema);
