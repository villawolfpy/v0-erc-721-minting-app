// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import Providers from "./providers";
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
        <Suspense fallback={null}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
