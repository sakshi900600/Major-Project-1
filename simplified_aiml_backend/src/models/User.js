const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  provider: String,
  subject: String
}, { _id: false });

const enrollmentSchema = new mongoose.Schema({
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  status: { type: String, enum: ['enrolled','completed','in_progress'], default: 'in_progress' },
  started_at: Date
}, { _id: false });

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password_hash: { type: String },
  name: { type: String },
  role: { type: String, enum: ['admin', 'author', 'learner'], default: 'learner' },
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
  refreshTokens: [String], // store active refresh tokens (hashed ideally)
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// update updated_at
userSchema.pre('save', function(next){
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
