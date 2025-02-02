import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode:false,
async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: 'http://87.106.207.129/auth/:path*', // Keycloak-Pfad
      },
        {
            source: '/api/:path*',
            destination: 'http://87.106.207.129/api/:path*', // Spring-Boot-Pfad
        },
    ];
  },
};

export default nextConfig;
