"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function TanstackQueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create QueryClient inside component to avoid SSR issues
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Disable automatic refetching on window focus for SSR
            refetchOnWindowFocus: false,
            // Reduce stale time to avoid hydration mismatches
            staleTime: 60 * 1000, // 1 minute
            // Disable retries on server
            retry: typeof window !== "undefined" ? 3 : false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
