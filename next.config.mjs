// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com https://*.infura.io https://*.etherscan.io https://rpc.sepolia.org; connect-src 'self' https://*.infura.io https://rpc.sepolia.org https://sepolia.infura.io https://*.etherscan.io wss://*.infura.io; frame-src 'self' https://*.metamask.io https://*.walletconnect.org;",
          },
        ],
      },
    ];
  },

  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "pino-pretty": false,
      pino: false,
    };
    if (!isServer) {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;
