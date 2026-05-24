import axios from "axios";

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";

const apiClient = axios.create({
  baseURL: apiBaseUrl,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Limpa credenciais locais para evitar que a UI continue usando uma sessao expirada.
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (window.location.pathname !== "/login") {
        window.location.assign("/login?expired=true");
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
