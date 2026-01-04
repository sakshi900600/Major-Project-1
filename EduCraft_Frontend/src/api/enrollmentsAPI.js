// src/api/enrollmentsAPI.js
import axiosInstance from "./axiosInstance";

// Fetch logged-in user's enrolled courses
export const getMyCourses = async () => {
  try {
    const response = await axiosInstance.get("/enrollments/my-courses");
    return response.data;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    throw error;
  }
};

// Enroll in a course
export const enrollInCourse = async (courseId) => {
  try {
    const response = await axiosInstance.post(`/enrollments/enroll/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error enrolling in course:", error);
    throw error;
  }
};
