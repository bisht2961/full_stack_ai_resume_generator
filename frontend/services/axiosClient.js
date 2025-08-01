// services/axiosClient.js
import axios from "axios";
import { toast } from "sonner";

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

let isRefreshing = false;

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = sessionStorage.getItem("refresh_token");

      if (!refreshToken) {
        toast.error("Session expired. Please login again.");
        window.location.href = "/auth/sign-in";
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        
        try {
          const res = await axios.post(`${BASE_URL}/auth/refresh-token`, null, {
            headers: { refresh_token: refreshToken },
          });
          
          const { access_token, refresh_token } = res.data;
          sessionStorage.setItem("access_token", access_token);
          sessionStorage.setItem("refresh_token", refresh_token);

          // Update original request with new token
          originalRequest.headers["Authorization"] = `Bearer ${access_token}`;

          return axiosClient(originalRequest); // Retry original request
        } catch (refreshError) {
          toast.error("Session expired. Please login again.");
          sessionStorage.clear();
          window.location.href = "/auth/sign-in";
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;