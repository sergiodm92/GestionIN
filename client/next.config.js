/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    // Configuración específica para el entorno del servidor (Node.js)
    if (isServer) {
      // No realizar ninguna configuración adicional
      return config;
    }

    // Configuración específica para el entorno del cliente (navegador)
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-pdf$': 'react-pdf/dist/esm/entry.webpack.js'
    };

    return config;
  }
};

module.exports = nextConfig;

