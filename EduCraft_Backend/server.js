require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const connectDB = require('./src/config/db');

// routes
const authRoutes = require('./src/routes/auth');
const coursesRoutes = require('./src/routes/courses');
const blogsRoutes = require('./src/routes/blogs');
const courseContentRoutes = require('./src/routes/courseContent');
const adminRoutes = require('./src/routes/admin');
const enrollmentRoutes = require('./src/routes/enrollment');
const progressRoutes = require('./src/routes/progress');

// swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();

/* =====================================================
   GLOBAL MIDDLEWARE
===================================================== */
app.use(helmet());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));

/* =====================================================
   RATE LIMITING
===================================================== */
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120
});
app.use(limiter);

/* =====================================================
   DATABASE
===================================================== */
connectDB();

/* =====================================================
   ROUTES (ALL UNDER /api/v1)
===================================================== */
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/courses', coursesRoutes);
app.use('/api/v1/blogs', blogsRoutes);
app.use('/api/v1/course-content', courseContentRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/enrollments', enrollmentRoutes);
app.use('/api/v1/progress', progressRoutes);

/* =====================================================
   HEALTH CHECK
===================================================== */
app.get('/', (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV });
});

/* =====================================================
   SWAGGER
===================================================== */
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* =====================================================
   GLOBAL ERROR HANDLER
===================================================== */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Server error'
  });
});

/* =====================================================
   SERVER START
===================================================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
