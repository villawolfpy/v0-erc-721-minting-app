// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import Providers from "./providers";
import HydrationBoundary from "@/components/hydration-boundary";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carbono & Experiencia - Web3 DApp",
  description:
    "Compra tokens Carbono y mintea NFTs de Experiencia en la blockchain",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <HydrationBoundary>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </HydrationBoundary>
      </body>
    </html>
  );
}
