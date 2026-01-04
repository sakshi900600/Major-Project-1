const mongoose = require("mongoose");

/* ======================================================
   PROVIDER SCHEMA
====================================================== */
const providerSchema = new mongoose.Schema({
  provider: String,
  subject: String
}, { _id: false });

/* ======================================================
   COMPLETED SUBTOPIC SCHEMA
====================================================== */
const completedSubtopicSchema = new mongoose.Schema({
  moduleId: mongoose.Schema.Types.ObjectId,
  topicId: mongoose.Schema.Types.ObjectId,
  subtopicId: mongoose.Schema.Types.ObjectId
}, { _id: false });

/* ======================================================
   ENROLLMENT SCHEMA
====================================================== */
const enrollmentSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },

  status: {
    type: String,
    enum: ["in_progress", "completed"],
    default: "in_progress"
  },

  progress: {
    type: Number,
    default: 0
  },

  completed_subtopics: [completedSubtopicSchema],

  last_accessed: {
    moduleId: mongoose.Schema.Types.ObjectId,
    topicId: mongoose.Schema.Types.ObjectId,
    subtopicId: mongoose.Schema.Types.ObjectId
  },

  started_at: {
    type: Date,
    default: Date.now
  },

  completed_at: Date
}, { _id: false });

/* ======================================================
   USER SCHEMA
====================================================== */
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,

  role: {
    type: String,
    enum: ["admin", "author", "learner"],
    default: "learner"
  },

  providers: [providerSchema],

  profile: {
    avatar_url: String,
    bio: String
  },

  settings: {
    locale: String,
    theme: String
  },

  enrollments: [enrollmentSchema],

  refreshTokens: [String],

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

/* Auto-update updated_at */
userSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);
