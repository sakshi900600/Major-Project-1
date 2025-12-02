import axiosInstance from "./axiosInstance";

// ADMIN
export const createBlog = (data) =>
  axiosInstance.post("/blogs", data);

export const updateBlog = (id, data) =>
  axiosInstance.put(`/blogs/${id}`, data);

export const deleteBlog = (id) =>
  axiosInstance.delete(`/blogs/${id}`);

// PUBLIC
export const getAllBlogs = () =>
  axiosInstance.get("/blogs");

export const getBlogById = (id) =>
  axiosInstance.get(`/blogs/${id}`);

export const getBlogBySlug = (slug) =>
  axiosInstance.get(`/blogs/slug/${slug}`);

// USER
export const toggleLike = (id) =>
  axiosInstance.post(`/blogs/${id}/like`);

export const addComment = (id, data) =>
  axiosInstance.post(`/blogs/${id}/comments`, data);

// ADMIN delete comment
export const deleteComment = (id, commentId) =>
  axiosInstance.delete(`/blogs/${id}/comments/${commentId}`);
