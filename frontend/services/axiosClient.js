// services/axiosClient.js
import axios from "axios";
let baseURL;

if (process.env.NODE_ENV === 'production') {

  baseURL = process.env.REACT_APP_API_PROD_URL
} else {
  // In development, use the one from .env.local
  baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'; // Fallback
}
const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors here (for auth token, logging, etc.)
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;