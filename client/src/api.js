import axios from "axios";

const api = axios.create({
  baseURL: "/api", // ✅ works in production too
});


// Attach token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
