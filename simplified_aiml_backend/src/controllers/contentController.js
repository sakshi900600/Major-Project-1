const Course = require("../models/Course");

/* =======================================================
   MODULE CRUD
======================================================= */
exports.addModule = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const data = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.modules.push(data);
    await course.save();

    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

exports.updateModule = async (req, res, next) => {
  try {
    const { courseId, moduleId } = req.params;
    const data = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const module = course.modules.id(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    Object.assign(module, data);
    course.updated_at = new Date();

    await course.save();

    res.json(course);
  } catch (err) {
    next(err);
  }
};

exports.deleteModule = async (req, res, next) => {
  try {
    const { courseId, moduleId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.modules = course.modules.filter(m => m._id.toString() !== moduleId);
    await course.save();

    res.json({ message: "Module deleted" });
  } catch (err) {
    next(err);
  }
};

/* =======================================================
   TOPIC CRUD
======================================================= */
exports.addTopic = async (req, res, next) => {
  try {
    const { courseId, moduleId } = req.params;
    const { title, order } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const module = course.modules.id(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    module.topics.push({
      title,
      order,
      subtopics: []
    });

    await course.save();

    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};


exports.updateTopic = async (req, res, next) => {
  try {
    const { courseId, moduleId, topicId } = req.params;
    const data = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const module = course.modules.id(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    const topic = module.topics.id(topicId);
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    Object.assign(topic, data);
    await course.save();

    res.json(course);
  } catch (err) {
    next(err);
  }
};

exports.deleteTopic = async (req, res, next) => {
  try {
    const { courseId, moduleId, topicId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const module = course.modules.id(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    module.topics = module.topics.filter(t => t._id.toString() !== topicId);
    await course.save();

    res.json({ message: "Topic deleted" });
  } catch (err) {
    next(err);
  }
};

/* =======================================================
   SUBTOPIC CRUD
======================================================= */
exports.addSubtopic = async (req, res, next) => {
  try {
    const { courseId, moduleId, topicId } = req.params;
    const data = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const module = course.modules.id(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    const topic = module.topics.id(topicId);
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    topic.subtopics.push(data);
    await course.save();

    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

exports.updateSubtopic = async (req, res, next) => {
  try {
    const { courseId, moduleId, topicId, subtopicId } = req.params;
    const data = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const module = course.modules.id(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    const topic = module.topics.id(topicId);
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    const subtopic = topic.subtopics.id(subtopicId);
    if (!subtopic) return res.status(404).json({ message: "Subtopic not found" });

    Object.assign(subtopic, data);
    await course.save();

    res.json(course);
  } catch (err) {
    next(err);
  }
};

exports.deleteSubtopic = async (req, res, next) => {
  try {
    const { courseId, moduleId, topicId, subtopicId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const module = course.modules.id(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    const topic = module.topics.id(topicId);
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    topic.subtopics = topic.subtopics.filter(s => s._id.toString() !== subtopicId);
    await course.save();

    res.json({ message: "Subtopic deleted" });
  } catch (err) {
    next(err);
  }
};
