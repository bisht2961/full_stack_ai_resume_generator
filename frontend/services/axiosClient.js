// services/axiosClient.js
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors here (for auth token, logging, etc.)
axiosClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;