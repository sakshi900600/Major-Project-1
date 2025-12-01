require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const connectDB = require('./src/config/db');

const authRoutes = require('./src/routes/auth');
const coursesRoutes = require('./src/routes/courses');
const blogsRoutes = require('./src/routes/blogs');

const courseContentRoutes = require("./src/routes/courseContent");
const adminRoutes = require("./src/routes/admin");


const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();

// middleware
app.use(helmet());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));

// basic rate limit
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120
});
app.use(limiter);

// connect db
connectDB();

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/courses', coursesRoutes);
app.use('/api/v1/blogs', blogsRoutes);
app.use("/api/v1/course-content", courseContentRoutes);
app.use("/api/v1/admin", adminRoutes);


app.get('/', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV }));

// global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});



const swaggerDocument = YAML.load("./docs/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
