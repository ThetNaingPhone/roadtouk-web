'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

// This component sets up the React Query client and provider.
export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // We use useState to ensure the QueryClient is only created once.
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Default settings for all queries
        staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
        refetchOnWindowFocus: false, // Optional: disable refetching on window focus
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* The Devtools are an amazing debugging tool! */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
