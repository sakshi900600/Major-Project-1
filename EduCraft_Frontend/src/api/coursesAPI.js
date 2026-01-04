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


/**
 * Enroll logged-in user into a course
 * POST /enroll/:courseId
 */
export const enrollInCourse = async (courseId) => {
  const response = await axiosInstance.post(`/enrollments/enroll/${courseId}`);
  return response.data;
};

/**
 * Get logged-in user's enrolled courses
 * GET /my-courses
 */
export const getMyCourses = async () => {
  const response = await axiosInstance.get("/enrollments/my-courses");
  return response.data;
};