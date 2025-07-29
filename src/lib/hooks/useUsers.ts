'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/apiClient';
import type { User } from '@/lib/types/user';

/**
 * A hook to fetch the list of users using React Query.
 */
export function useUsers() {
  return useQuery<User[], Error>({
    // queryKey is the unique key for this query. React Query uses it for caching.
    queryKey: ['users'], 
    
    // queryFn is the function that fetches the data.
    queryFn: () => apiClient<User[]>('users'),
  });
}
