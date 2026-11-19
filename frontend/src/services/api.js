import axios from "axios";

const API = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/+$/, ""),
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401
      && localStorage.getItem("token")
      && window.location.pathname !== "/login"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.assign("/login");
    }
    return Promise.reject(error);
  },
);

export const getStoredUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user && typeof user === "object" ? user : {};
  } catch {
    localStorage.removeItem("user");
    return {};
  }
};

export const getApiErrorMessage = (error, fallback) => {
  const detail = error.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg).filter(Boolean).join(", ") || fallback;
  }
  if (error.code === "ERR_NETWORK") {
    return "Could not connect to the server. Check that the backend is running.";
  }
  return fallback;
};

export const loginUser = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};

export default API;