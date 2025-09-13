// app/providers.tsx
"use client";

import "@rainbow-me/rainbowkit/styles.css";
import type { ReactNode } from "react";
import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@/components/ui/toast";
import { wagmiConfig } from "@/lib/wagmi";

export default function Providers({ children }: { children: ReactNode }) {
  // React Query client (estable y con cache razonable)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000, // 1 min
            retry: false, // Evitar reintentos que causen parpadeo
          },
        },
      })
  );

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme()}
          showRecentTransactions={false}
        >
          <ToastProvider>{children}</ToastProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
