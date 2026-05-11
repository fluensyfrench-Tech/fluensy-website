


/* eslint-disable @typescript-eslint/no-explicit-any */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Enable standalone output for Docker
  output: 'standalone',
  
  reactStrictMode: true,
  
  // ✅ Next.js 16: Use remotePatterns instead of domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  
  // Transpile framer-motion so SWC downgrades class-field syntax for iOS < 14
  transpilePackages: ["framer-motion"],

  // ✅ Next.js 16: Empty turbopack config to acknowledge Turbopack usage
  turbopack: {},
  
  // ✅ Next.js 16: Migrate webpack config to turbopack
  webpack(config: any) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;