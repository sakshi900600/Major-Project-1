import axiosInstance from "./axiosInstance";

/* ------------ MODULES ------------ */
export const addModule = (courseId, data) =>
  axiosInstance.post(`/content/${courseId}/modules`, data);

export const updateModule = (courseId, moduleId, data) =>
  axiosInstance.patch(`/content/${courseId}/modules/${moduleId}`, data);

export const deleteModule = (courseId, moduleId) =>
  axiosInstance.delete(`/content/${courseId}/modules/${moduleId}`);

/* ------------ TOPICS ------------ */
export const addTopic = (courseId, moduleId, data) =>
  axiosInstance.post(`/content/${courseId}/modules/${moduleId}/topics`, data);

export const updateTopic = (courseId, moduleId, topicId, data) =>
  axiosInstance.patch(`/content/${courseId}/modules/${moduleId}/topics/${topicId}`, data);

export const deleteTopic = (courseId, moduleId, topicId) =>
  axiosInstance.delete(`/content/${courseId}/modules/${moduleId}/topics/${topicId}`);

/* ------------ SUBTOPICS ------------ */
export const addSubtopic = (courseId, moduleId, topicId, data) =>
  axiosInstance.post(`/content/${courseId}/modules/${moduleId}/topics/${topicId}/subtopics`, data);

export const updateSubtopic = (courseId, moduleId, topicId, subtopicId, data) =>
  axiosInstance.patch(`/content/${courseId}/modules/${moduleId}/topics/${topicId}/subtopics/${subtopicId}`, data);

export const deleteSubtopic = (courseId, moduleId, topicId, subtopicId) =>
  axiosInstance.delete(`/content/${courseId}/modules/${moduleId}/topics/${topicId}/subtopics/${subtopicId}`);
