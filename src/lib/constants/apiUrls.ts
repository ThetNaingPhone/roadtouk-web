export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8083/api";
export const TIMEOUT = 5000;

export const API_URLS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    REFRESH: `${API_BASE_URL}/auth/refreshtoken`,
  },
  USERS: {
    LIST: `${API_BASE_URL}/users`,
    DETAIL: (id: string | number) => `${API_BASE_URL}/users/${id}`,
  },
  // add more modules as needed
};