import { API_BASE_URL } from '@/lib/constants/constants';

// The client is now just a pure fetch function.
export const apiClient = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.statusText}`);
  }

  return response.json();
};
