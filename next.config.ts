// /* eslint-disable @typescript-eslint/no-explicit-any */
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   images: {
//     domains: ["res.cloudinary.com"],
//     unoptimized: true, // Required for static export
//   },
//   webpack(config: any) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       issuer: /\.[jt]sx?$/,
//       use: ["@svgr/webpack"],
//     });
//     return config;
//   },
// };

// module.exports = nextConfig;



/* eslint-disable @typescript-eslint/no-explicit-any */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ Remove this line for dynamic routes
  // output: 'export',
  
  reactStrictMode: true,
  
  // Suppress hydration warnings from browser extensions
  onRecoverableError: (error: any) => {
    if (
      error.message?.includes('Hydration failed') ||
      error.message?.includes('There was an error while hydrating') ||
      error.message?.includes('Text content does not match')
    ) {
      return;
    }
    console.error(error);
  },
  
  images: {
    domains: ["res.cloudinary.com"],
    // Remove unoptimized if not using static export
    // unoptimized: true,
  },
  
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