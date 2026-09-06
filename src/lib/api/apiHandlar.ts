// lib/api/apiHandlers.ts
import { userClient } from "./apiClient";
import axios, { AxiosRequestConfig, Method } from "axios";

const USER_API_BASE_URL =
  process.env.NEXT_PUBLIC_USER_API_URL || "http://localhost:8083/api";

// A separate, simple Axios instance for public endpoints
const publicApiClient = axios.create({
  baseURL: USER_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface ApiHandlerConfig {
  url: string;
  method: Method;
  data?: unknown;
  config?: AxiosRequestConfig;
}

/**
 * Handles API requests that require authentication.
 * Automatically handles token attachment and refresh.
 * @param config The request configuration.
 * @returns A promise that resolves to the response data.
 */
export const apiHandler = async <T>(
  config: ApiHandlerConfig
): Promise<T> => {
  try {
    const response = await userClient<T>({
      url: config.url,
      method: config.method,
      data: config.data,
      ...config.config,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
/**
 * Handles public UserService requests such as login/register.
 */
export const apiHandlerNoAuth = async <T>(
  config: ApiHandlerConfig
): Promise<T> => {
  const response = await publicApiClient<T>({
    url: config.url,
    method: config.method,
    data: config.data,
    ...config.config,
  });

  return response.data;
};