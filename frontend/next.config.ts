import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: 'http://87.106.207.129/auth/:path*', // Keycloak-Pfad
      },
    ];
  },
};

export default nextConfig;
