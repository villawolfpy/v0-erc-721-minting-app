// app/providers.tsx
"use client";

import "@rainbow-me/rainbowkit/styles.css";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@/components/ui/toast";
import { wagmiConfig } from "@/lib/wagmi";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
    },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Log CSP violations
    const handleCSPViolation = (event: SecurityPolicyViolationEvent) => {
      console.error("CSP Violation:", {
        violatedDirective: event.violatedDirective,
        blockedURI: event.blockedURI,
        sourceFile: event.sourceFile,
        lineNumber: event.lineNumber,
        columnNumber: event.columnNumber,
      });
    };

    // Log network errors
    const handleError = (event: ErrorEvent) => {
      if (event.filename?.includes('coinbase') || event.message?.includes('coinbase')) {
        console.error("Coinbase-related error:", event);
      }
    };

    document.addEventListener('securitypolicyviolation', handleCSPViolation);
    window.addEventListener('error', handleError);

    return () => {
      document.removeEventListener('securitypolicyviolation', handleCSPViolation);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider appInfo={{ appName: "Carbono & Experiencia" }} analytics={false}>
          <ToastProvider>{children}</ToastProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
