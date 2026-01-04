// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// 🔒 Auto-attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔄 Handle token refresh on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const refreshResponse = await axiosInstance.post("/auth/refresh");
        const newToken = refreshResponse.data.accessToken;

        // Store new token
        localStorage.setItem("token", newToken);

        // Update the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        // Refresh failed - redirect to login
        localStorage.removeItem("token");
        window.location.href = "/signin";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
