import axiosInstance from "./axiosInstance";

const authApi = {
  register: (data) => axiosInstance.post("/auth/register", data),
  login: (data) => axiosInstance.post("/auth/login", data),
  refresh: () => axiosInstance.post("/auth/refresh"),
  logout: () => axiosInstance.post("/auth/logout"),
};

export default authApi;
