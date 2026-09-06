// lib/api/apiClient.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { API_URLS } from "@/lib/constants/apiUrls";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const createApiClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
  });

  // Request interceptor
  client.interceptors.request.use((config) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Silent refresh
  const silentRefresh = async (): Promise<string | null> => {
    const refreshToken =
      typeof window !== "undefined"
        ? localStorage.getItem("refreshToken")
        : null;
    if (!refreshToken) return null;

    try {
      const response = await axios.post<LoginResponse>(
        API_URLS.AUTH.REFRESH,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        return response.data.accessToken;
      }
      return null;
    } catch (err) {
      console.error("Failed to refresh token:", err);
      return null;
    }
  };

  // Response interceptor
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newToken = await silentRefresh();
        if (newToken) {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };
          return client(originalRequest);
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          if (typeof window !== "undefined" && window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
};

// Two different clients for user + university
export const userClient = createApiClient(process.env.NEXT_PUBLIC_USER_API_URL || "http://localhost:8083/api");
export const universityClient = createApiClient(process.env.NEXT_PUBLIC_UNIVERSITY_API_URL || "http://localhost:8084/api");
