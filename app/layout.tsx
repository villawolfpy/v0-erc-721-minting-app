// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import Providers from "./providers";
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
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.coinbase.com https://*.walletconnect.com https://*.walletconnect.org https://cdn.jsdelivr.net https://unpkg.com; connect-src 'self' https://*.coinbase.com https://*.walletconnect.com https://*.walletconnect.org https://*.infura.io https://eth.merkle.io wss://*.walletconnect.com wss://*.walletconnect.org ws://*.walletconnect.com ws://*.walletconnect.org; frame-src https://*.coinbase.com https://*.walletconnect.com https://*.walletconnect.org;"
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
