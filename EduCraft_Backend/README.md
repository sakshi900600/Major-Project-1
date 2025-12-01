# 🚀 Simplified AI/ML Learning Platform – Backend

A production-ready backend for an educational platform offering **Courses, Blogs, Authentication, Admin features**, and **nested learning content** (Modules → Topics → Subtopics).

Built with:

- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT Authentication + Refresh Tokens**
- **Role-Based Access (Admin, Instructor, Learner)**
- **Versioned REST API (`/api/v1`)**
- **Secure Middlewares (helmet, rate-limit, CORS, cookies)**

---

## 📁 Project Structure



---

## 🔐 Authentication Module

### Features Implemented
- Register user  
- Login user  
- Access token (short-lived)  
- Refresh token (cookie + DB)  
- Logout  
- Role support: `learner`, `admin`, `instructor`  

### Endpoints
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout


---

## 📘 Courses Module (CRUD)

### Supported Fields
- title  
- description  
- level  
- category  
- tags  
- authors (user IDs)  
- thumbnail  
- published  
- **slug auto-generated from title**  

### Endpoints
GET /api/v1/courses
POST /api/v1/courses
GET /api/v1/courses/:id
PUT /api/v1/courses/:id
DELETE /api/v1/courses/:id


---

## 📚 Nested Course Content  
Modules → Topics → Subtopics are embedded inside the course document.

### Structure
Course
└── modules[]
└── topics[]
└── subtopics[]


### Module Endpoints
POST /api/v1/courses/:courseId/modules
PUT /api/v1/courses/:courseId/modules/:moduleId
DELETE /api/v1/courses/:courseId/modules/:moduleId


### Topic Endpoints
POST /api/v1/courses/:courseId/modules/:moduleId/topics
PUT /api/v1/courses/:courseId/modules/:moduleId/topics/:topicId
DELETE /api/v1/courses/:courseId/modules/:moduleId/topics/:topicId


### Subtopic Endpoints
POST /api/v1/courses/:courseId/modules/:moduleId/topics/:topicId/subtopics
PUT /api/v1/courses/:courseId/modules/:moduleId/topics/:topicId/subtopics/:subtopicId
DELETE /api/v1/courses/:courseId/modules/:moduleId/topics/:topicId/subtopics/:subtopicId



---

## 📝 Blogs Module

### Blog Features
- Create / Read / Update / Delete blogs  
- `content[]` supports:  
  - text  
  - image  
  - video  
- Like / Unlike  
- Comments (add/delete)  
- Publish / Unpublish  

### Endpoints
POST /api/v1/blogs
GET /api/v1/blogs
GET /api/v1/blogs/:id
PUT /api/v1/blogs/:id
DELETE /api/v1/blogs/:id


