// src/api/adminAPI.js
import axiosInstance from "./axiosInstance";

/* ------------ DASHBOARD ------------ */
export const getDashboardStats = () =>
  axiosInstance.get("/admin/dashboard");

/* ------------ USER MANAGEMENT ------------ */
export const getAllUsers = () =>
  axiosInstance.get("/admin/users");

export const getUser = (id) =>
  axiosInstance.get(`/admin/users/${id}`);

export const updateUserRole = (id, data) =>
  axiosInstance.put(`/admin/users/${id}/role`, data);

export const deleteUser = (id) =>
  axiosInstance.delete(`/admin/users/${id}`);

/* ------------ COURSE PUBLISHING ------------ */
export const publishCourse = (courseId) =>
  axiosInstance.put(`/admin/courses/${courseId}/publish`);

export const unpublishCourse = (courseId) =>
  axiosInstance.put(`/admin/courses/${courseId}/unpublish`);

/* ------------ BLOG PUBLISHING ------------ */
export const publishBlog = (blogId) =>
  axiosInstance.put(`/admin/blogs/${blogId}/publish`);

export const unpublishBlog = (blogId) =>
  axiosInstance.put(`/admin/blogs/${blogId}/unpublish`);
