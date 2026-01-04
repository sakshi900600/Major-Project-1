import axiosInstance from "./axiosInstance";

export const toggleSubtopicCompletion = (payload) => {
  return axiosInstance.post("/progress/toggle", payload);
};

export const getMyCourseProgress = (courseId) => {
  return axiosInstance.get(`/progress/${courseId}`);
};
