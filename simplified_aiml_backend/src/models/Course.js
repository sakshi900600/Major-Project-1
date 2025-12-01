const mongoose = require('mongoose');

/* ------------------ Content Schema ------------------ */
const ContentSchema = new mongoose.Schema({
  type: { type: String, enum: ["text", "video", "image", "link"], default: "text" },
  value: { type: String, required: true }
});

/* ------------------ Subtopic Schema ------------------ */
const SubtopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: ContentSchema
});

/* ------------------ Topic Schema ------------------ */
const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: Number,
  subtopics: [SubtopicSchema]
});

/* ------------------ Module Schema ------------------ */
const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  order: Number,
  topics: [TopicSchema]
});

/* ------------------ Instructor Schema ------------------ */
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

/* ------------------ FAQ Schema ------------------ */
const FaqSchema = new mongoose.Schema({
  question: String,
  answer: String
});

/* ------------------ Course Schema ------------------ */
const CourseSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: String,
  level: String,
  category: String,
  tags: [String],
  thumbnail: String,
  published: { type: Boolean, default: false },

  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  instructors: [InstructorSchema], //  ⭐ NEW

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

module.exports = mongoose.model("Course", CourseSchema);
