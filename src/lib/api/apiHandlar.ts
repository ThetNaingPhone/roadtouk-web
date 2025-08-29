// lib/api/apiHandlers.ts
import apiClient from "./apiClient";
import axios, { AxiosRequestConfig, Method } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// A separate, simple Axios instance for public endpoints
const publicApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
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
    const response = await apiClient<T>({
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
 * Handles API requests that do NOT require authentication.
 * Ideal for login, register, or public data fetching.
 * @param config The request configuration.
 * @returns A promise that resolves to the response data.
 */
export const apiHandlerNoAuth = async <T>(
  config: ApiHandlerConfig
): Promise<T> => {
  try {
    const response = await publicApiClient<T>({
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