import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false // keep false since you use JWT in headers
});

/* =========================
   REQUEST INTERCEPTOR
   Attach JWT token
========================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
   Handle auth errors globally
========================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto logout if token is invalid / expired
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      // Optional: redirect to login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
