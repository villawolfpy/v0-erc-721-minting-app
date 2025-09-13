// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },

  webpack: (config, { isServer }) => {
    // 🔒 Evita que Next intente resolver módulos que no usamos en el browser
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "pino-pretty": false,  // <-- clave para tu error
      pino: false,           // opcional, por si algún paquete lo arrastra
    };

    // No necesitamos polyfills de Node en el cliente
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
