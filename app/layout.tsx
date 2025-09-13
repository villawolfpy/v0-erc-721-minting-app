// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import Providers from "./providers";
import { Toaster } from "sonner";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

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
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
