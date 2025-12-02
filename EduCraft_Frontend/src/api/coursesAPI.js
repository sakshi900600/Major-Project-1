import axiosInstance from "./axiosInstance";

// public
export const getAllCourses = () =>
  axiosInstance.get("/courses");

export const getCourseById = (id) =>
  axiosInstance.get(`/courses/${id}`);

export const getCourseBySlug = (slug) =>
  axiosInstance.get(`/courses/slug/${slug}`);

// protected (admin/author)
export const createCourse = (data) =>
  axiosInstance.post("/courses", data);

export const updateCourse = (id, data) =>
  axiosInstance.patch(`/courses/${id}`, data);

export const deleteCourse = (id) =>
  axiosInstance.delete(`/courses/${id}`);
